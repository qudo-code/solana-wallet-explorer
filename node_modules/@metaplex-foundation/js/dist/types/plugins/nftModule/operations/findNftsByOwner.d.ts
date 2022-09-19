import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft, Sft } from '../models';
declare const Key: "FindNftsByOwnerOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftsByOwnerOperation: import("../../../types").OperationConstructor<FindNftsByOwnerOperation, "FindNftsByOwnerOperation", FindNftsByOwnerInput, FindNftsByOwnerOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftsByOwnerOperation = Operation<typeof Key, FindNftsByOwnerInput, FindNftsByOwnerOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftsByOwnerInput = {
    owner: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftsByOwnerOutput = (Metadata | Nft | Sft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftsByOwnerOperationHandler: OperationHandler<FindNftsByOwnerOperation>;
export {};
