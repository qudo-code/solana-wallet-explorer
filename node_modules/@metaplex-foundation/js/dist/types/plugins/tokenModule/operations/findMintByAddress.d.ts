import { Operation, OperationHandler } from '../../../types';
import type { Commitment, PublicKey } from '@solana/web3.js';
import { Mint } from '../models/Mint';
declare const Key: "FindMintByAddressOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findMintByAddressOperation: import("../../../types").OperationConstructor<FindMintByAddressOperation, "FindMintByAddressOperation", FindMintByAddressInput, Mint>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindMintByAddressOperation = Operation<typeof Key, FindMintByAddressInput, Mint>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindMintByAddressInput = {
    address: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findMintByAddressOperationHandler: OperationHandler<FindMintByAddressOperation>;
export {};
