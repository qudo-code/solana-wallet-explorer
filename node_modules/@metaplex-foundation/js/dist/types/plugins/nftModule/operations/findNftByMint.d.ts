import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Nft, NftWithToken, Sft, SftWithToken } from '../models';
declare const Key: "FindNftByMintOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findNftByMintOperation: import("../../../types").OperationConstructor<FindNftByMintOperation, "FindNftByMintOperation", FindNftByMintInput, Sft | SftWithToken | Nft | NftWithToken>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindNftByMintOperation = Operation<typeof Key, FindNftByMintInput, FindNftByMintOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindNftByMintInput = {
    mintAddress: PublicKey;
    tokenAddress?: PublicKey;
    tokenOwner?: PublicKey;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindNftByMintOutput = Nft | Sft | NftWithToken | SftWithToken;
/**
 * @group Operations
 * @category Handlers
 */
export declare const findNftByMintOperationHandler: OperationHandler<FindNftByMintOperation>;
export {};
