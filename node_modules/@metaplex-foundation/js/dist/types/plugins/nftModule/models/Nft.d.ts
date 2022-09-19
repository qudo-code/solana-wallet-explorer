import type { Pda } from '../../../types';
import type { PublicKey } from '@solana/web3.js';
import type { Mint, Token } from '../../tokenModule';
import type { Metadata } from './Metadata';
import type { NftEdition } from './NftEdition';
import { SftWithToken } from './Sft';
/** @group Models */
export declare type Nft = Omit<Metadata, 'model' | 'address' | 'mintAddress'> & {
    readonly model: 'nft';
    readonly address: PublicKey;
    readonly metadataAddress: Pda;
    readonly mint: Mint;
    readonly edition: NftEdition;
};
/** @group Model Helpers */
export declare const isNft: (value: any) => value is Nft;
/** @group Model Helpers */
export declare function assertNft(value: any): asserts value is Nft;
/** @group Model Helpers */
export declare const toNft: (metadata: Metadata, mint: Mint, edition: NftEdition) => Nft;
/** @group Models */
export declare type NftWithToken = Nft & {
    token: Token;
};
/** @group Model Helpers */
export declare const isNftWithToken: (value: any) => value is NftWithToken;
/** @group Model Helpers */
export declare function assertNftWithToken(value: any): asserts value is NftWithToken;
/** @group Model Helpers */
export declare function assertNftOrSftWithToken(value: any): asserts value is NftWithToken | SftWithToken;
/** @group Model Helpers */
export declare const toNftWithToken: (metadata: Metadata, mint: Mint, edition: NftEdition, token: Token) => NftWithToken;
