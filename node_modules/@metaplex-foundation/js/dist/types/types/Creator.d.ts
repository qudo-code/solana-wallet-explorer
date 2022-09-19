import { PublicKey } from '@solana/web3.js';
import { Signer } from './Signer';
export declare type Creator = {
    readonly address: PublicKey;
    readonly verified: boolean;
    readonly share: number;
};
export declare type CreatorInput = {
    readonly address: PublicKey;
    readonly share: number;
    readonly authority?: Signer;
};
