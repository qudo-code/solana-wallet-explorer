import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { NftWithToken, SftWithToken } from '../models';
declare const Key: "FindNftByTokenOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftByTokenOperation: import("../../../types").OperationConstructor<FindNftByTokenOperation, "FindNftByTokenOperation", FindNftByTokenInput, SftWithToken | NftWithToken>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftByTokenOperation = Operation<typeof Key, FindNftByTokenInput, FindNftByTokenOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftByTokenInput = {
    token: PublicKey;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftByTokenOutput = NftWithToken | SftWithToken;
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftByTokenOperationHandler: OperationHandler<FindNftByTokenOperation>;
export {};
