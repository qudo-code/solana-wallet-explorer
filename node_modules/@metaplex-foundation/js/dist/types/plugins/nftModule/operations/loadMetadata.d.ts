import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft, NftWithToken, Sft, SftWithToken } from '../models';
declare const Key: "LoadMetadataOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const loadMetadataOperation: import("../../../types").OperationConstructor<LoadMetadataOperation, "LoadMetadataOperation", LoadMetadataInput, Sft | SftWithToken | Nft | NftWithToken>;
/**
 * @group Operations
 * @category Types
 */
export declare type LoadMetadataOperation = Operation<typeof Key, LoadMetadataInput, LoadMetadataOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type LoadMetadataInput = {
    metadata: Metadata;
    tokenAddress?: PublicKey;
    tokenOwner?: PublicKey;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type LoadMetadataOutput = Nft | Sft | NftWithToken | SftWithToken;
/**
 * @group Operations
 * @category Handlers
 */
export declare const loadMetadataOperationHandler: OperationHandler<LoadMetadataOperation>;
export {};
