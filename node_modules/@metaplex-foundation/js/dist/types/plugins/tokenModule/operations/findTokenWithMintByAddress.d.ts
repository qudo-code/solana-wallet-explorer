import { Operation, OperationHandler } from '../../../types';
import type { Commitment, PublicKey } from '@solana/web3.js';
import { TokenWithMint } from '../models/Token';
declare const Key: "FindTokenWithMintByAddressOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findTokenWithMintByAddressOperation: import("../../../types").OperationConstructor<FindTokenWithMintByAddressOperation, "FindTokenWithMintByAddressOperation", FindTokenWithMintByAddressInput, TokenWithMint>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindTokenWithMintByAddressOperation = Operation<typeof Key, FindTokenWithMintByAddressInput, TokenWithMint>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindTokenWithMintByAddressInput = {
    address: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findTokenWithMintByAddressOperationHandler: OperationHandler<FindTokenWithMintByAddressOperation>;
export {};
