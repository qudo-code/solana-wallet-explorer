import { Metaplex } from '../../../Metaplex';
import { BigNumber, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "MigrateToSizedCollectionNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const migrateToSizedCollectionNftOperation: import("../../../types").OperationConstructor<MigrateToSizedCollectionNftOperation, "MigrateToSizedCollectionNftOperation", MigrateToSizedCollectionNftInput, MigrateToSizedCollectionNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type MigrateToSizedCollectionNftOperation = Operation<typeof Key, MigrateToSizedCollectionNftInput, MigrateToSizedCollectionNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type MigrateToSizedCollectionNftInput = {
    mintAddress: PublicKey;
    collectionAuthority?: Signer;
    size: BigNumber;
    isDelegated?: boolean;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type MigrateToSizedCollectionNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const migrateToSizedCollectionNftOperationHandler: OperationHandler<MigrateToSizedCollectionNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type MigrateToSizedCollectionNftBuilderParams = Omit<MigrateToSizedCollectionNftInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const migrateToSizedCollectionNftBuilder: (metaplex: Metaplex, params: MigrateToSizedCollectionNftBuilderParams) => TransactionBuilder;
export {};
