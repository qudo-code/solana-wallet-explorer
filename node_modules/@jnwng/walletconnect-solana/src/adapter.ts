import WalletConnectClient from '@walletconnect/sign-client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { PublicKey } from '@solana/web3.js';

import { ClientNotInitializedError, QRCodeModalError } from './errors';

import type { EngineTypes, SessionTypes, SignClientTypes } from '@walletconnect/types';
import type { Transaction } from '@solana/web3.js';
import { getSdkError, parseAccountId } from '@walletconnect/utils';
import base58 from 'bs58';

export interface WalletConnectWalletAdapterConfig {
    network: WalletConnectChainID;
    options: SignClientTypes.Options;
}

export enum WalletConnectChainID {
    Mainnet = 'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
    Devnet = 'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
}

export enum WalletConnectRPCMethods {
    signTransaction = 'solana_signTransaction',
    signMessage = 'solana_signMessage',
}

interface WalletConnectWalletInit {
    publicKey: PublicKey;
}

const getConnectParams = (chainId: WalletConnectChainID, pairingTopic?: string): EngineTypes.ConnectParams => ({
    requiredNamespaces: {
        solana: {
            chains: [chainId],
            methods: [WalletConnectRPCMethods.signTransaction, WalletConnectRPCMethods.signMessage],
            events: [],
        },
    },
    pairingTopic,
});

export class WalletConnectWallet {
    private _client: WalletConnectClient | undefined;
    private _session: SessionTypes.Struct | undefined;
    private readonly _network: WalletConnectChainID;
    private readonly _options: SignClientTypes.Options;

    constructor(config: WalletConnectWalletAdapterConfig) {
        this._options = config.options;
        this._network = config.network;
    }

    async connect(): Promise<WalletConnectWalletInit> {
        const client = this._client ?? (await WalletConnectClient.init(this._options));
        const sessions = client.find(getConnectParams(this._network)).filter((s) => s.acknowledged);
        if (sessions.length) {
            // select last matching session
            this._session = sessions[sessions.length - 1];
            // We assign this variable only after we're sure we've received approval
            this._client = client;
        } else {
            const { uri, approval } = await client.connect(getConnectParams(this._network));
            if (uri) {
                QRCodeModal.open(uri, () => {
                    throw new QRCodeModalError();
                });
            }

            this._session = await approval();
            // We assign this variable only after we're sure we've received approval
            this._client = client;

            QRCodeModal.close();
        }

        return {
            publicKey: this.publicKey,
        };
    }

    async disconnect() {
        if (this._client && this._session) {
            await this._client.disconnect({
                topic: this._session.topic,
                reason: getSdkError('USER_DISCONNECTED'),
            });
            this._session = undefined;
        } else {
            throw new ClientNotInitializedError();
        }
    }

    get client(): WalletConnectClient {
        if (this._client) {
            // TODO: using client.off throws an error
            return Object.assign({}, this._client, { off: this._client.removeListener });
            // return this._client;
        } else {
            throw new ClientNotInitializedError();
        }
    }

    get publicKey(): PublicKey {
        if (this._client && this._session) {
            const { address } = parseAccountId(this._session.namespaces.solana.accounts[0]);
            return new PublicKey(address);
        } else {
            throw new ClientNotInitializedError();
        }
    }

    async signTransaction(transaction: Transaction): Promise<Transaction> {
        if (this._client && this._session) {
            const { signature } = await this._client.request<{ signature: string }>({
                chainId: this._network,
                topic: this._session.topic,
                request: { method: WalletConnectRPCMethods.signTransaction, params: { ...transaction } },
            });
            transaction.addSignature(this.publicKey, Buffer.from(base58.decode(signature)));

            return transaction;
        } else {
            throw new ClientNotInitializedError();
        }
    }

    async signMessage(message: Uint8Array): Promise<Uint8Array> {
        if (this._client && this._session) {
            const { signature } = await this._client.request({
                // The network does not change the output of message signing, but this is a required parameter for SignClient
                chainId: this._network,
                topic: this._session.topic,
                request: {
                    method: WalletConnectRPCMethods.signMessage,
                    params: { pubkey: this.publicKey.toString(), message: base58.encode(message) },
                },
            });

            return base58.decode(signature);
        } else {
            throw new ClientNotInitializedError();
        }
    }
}
