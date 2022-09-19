import { Operation, OperationHandler } from '../../../types';
import type { Commitment, PublicKey } from '@solana/web3.js';
import { TokenWithMint } from '../models/Token';
declare const Key: "FindTokenWithMintByMintOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findTokenWithMintByMintOperation: import("../../../types").OperationConstructor<FindTokenWithMintByMintOperation, "FindTokenWithMintByMintOperation", FindTokenWithMintByMintInput, TokenWithMint>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindTokenWithMintByMintOperation = Operation<typeof Key, FindTokenWithMintByMintInput, TokenWithMint>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindTokenWithMintByMintInput = {
    mint: PublicKey;
    address: PublicKey;
    addressType: 'owner' | 'token';
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findTokenWithMintByMintOperationHandler: OperationHandler<FindTokenWithMintByMintOperation>;
export {};
