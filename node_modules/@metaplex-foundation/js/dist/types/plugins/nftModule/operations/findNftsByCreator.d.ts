import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft, Sft } from '../models';
declare const Key: "FindNftsByCreatorOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftsByCreatorOperation: import("../../../types").OperationConstructor<FindNftsByCreatorOperation, "FindNftsByCreatorOperation", FindNftsByCreatorInput, FindNftsByCreatorOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftsByCreatorOperation = Operation<typeof Key, FindNftsByCreatorInput, FindNftsByCreatorOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftsByCreatorInput = {
    creator: PublicKey;
    position?: number;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftsByCreatorOutput = (Metadata | Nft | Sft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftsByCreatorOperationHandler: OperationHandler<FindNftsByCreatorOperation>;
export {};
