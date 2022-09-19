import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft, Sft } from '../models';
declare const Key: "FindNftsByUpdateAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftsByUpdateAuthorityOperation: import("../../../types").OperationConstructor<FindNftsByUpdateAuthorityOperation, "FindNftsByUpdateAuthorityOperation", FindNftsByUpdateAuthorityInput, FindNftsByUpdateAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftsByUpdateAuthorityOperation = Operation<typeof Key, FindNftsByUpdateAuthorityInput, FindNftsByUpdateAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftsByUpdateAuthorityInput = {
    updateAuthority: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftsByUpdateAuthorityOutput = (Metadata | Nft | Sft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftsByUpdateAuthorityOperationHandler: OperationHandler<FindNftsByUpdateAuthorityOperation>;
export {};
