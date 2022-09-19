import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "UnverifyNftCollectionOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const unverifyNftCollectionOperation: import("../../../types").OperationConstructor<UnverifyNftCollectionOperation, "UnverifyNftCollectionOperation", UnverifyNftCollectionInput, UnverifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UnverifyNftCollectionOperation = Operation<typeof Key, UnverifyNftCollectionInput, UnverifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UnverifyNftCollectionInput = {
    mintAddress: PublicKey;
    collectionMintAddress: PublicKey;
    collectionAuthority?: Signer;
    payer?: Signer;
    isSizedCollection?: boolean;
    isDelegated?: boolean;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UnverifyNftCollectionOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const unverifyNftCollectionOperationHandler: OperationHandler<UnverifyNftCollectionOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UnverifyNftCollectionBuilderParams = Omit<UnverifyNftCollectionInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const unverifyNftCollectionBuilder: (metaplex: Metaplex, params: UnverifyNftCollectionBuilderParams) => TransactionBuilder;
export {};
