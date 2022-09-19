import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Nft, NftWithToken, Sft, SftWithToken } from '../models';
declare const Key: "FindNftByMetadataOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftByMetadataOperation: import("../../../types").OperationConstructor<FindNftByMetadataOperation, "FindNftByMetadataOperation", FindNftByMetadataInput, Sft | SftWithToken | Nft | NftWithToken>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftByMetadataOperation = Operation<typeof Key, FindNftByMetadataInput, FindNftByMetadataOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftByMetadataInput = {
    metadata: PublicKey;
    tokenAddress?: PublicKey;
    tokenOwner?: PublicKey;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftByMetadataOutput = Nft | Sft | NftWithToken | SftWithToken;
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftByMetadataOperationHandler: OperationHandler<FindNftByMetadataOperation>;
export {};
