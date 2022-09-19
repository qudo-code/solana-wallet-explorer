import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { NftWithToken } from '../../nftModule';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine } from '../models/CandyMachine';
declare const Key: "MintCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const mintCandyMachineOperation: import("../../../types").OperationConstructor<MintCandyMachineOperation, "MintCandyMachineOperation", MintCandyMachineInput, MintCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type MintCandyMachineOperation = Operation<typeof Key, MintCandyMachineInput, MintCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type MintCandyMachineInput = {
    candyMachine: Pick<CandyMachine, 'address' | 'walletAddress' | 'authorityAddress' | 'tokenMintAddress' | 'itemsRemaining' | 'itemsAvailable' | 'itemsMinted' | 'whitelistMintSettings' | 'goLiveDate' | 'endSettings'>;
    payer?: Signer;
    newMint?: Signer;
    newOwner?: PublicKey;
    newToken?: Signer;
    payerToken?: PublicKey;
    whitelistToken?: PublicKey;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    tokenMetadataProgram?: PublicKey;
    candyMachineProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type MintCandyMachineOutput = {
    response: SendAndConfirmTransactionResponse;
    nft: NftWithToken;
    mintSigner: Signer;
    tokenAddress: PublicKey;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const mintCandyMachineOperationHandler: OperationHandler<MintCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type MintCandyMachineBuilderParams = Omit<MintCandyMachineInput, 'confirmOptions'> & {
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
    mintNftInstructionKey?: string;
    setCollectionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type MintCandyMachineBuilderContext = Omit<MintCandyMachineOutput, 'response' | 'nft'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const mintCandyMachineBuilder: (metaplex: Metaplex, params: MintCandyMachineBuilderParams) => Promise<TransactionBuilder<MintCandyMachineBuilderContext>>;
export {};
