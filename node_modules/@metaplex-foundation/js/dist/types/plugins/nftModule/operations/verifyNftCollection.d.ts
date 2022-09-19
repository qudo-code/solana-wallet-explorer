import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "VerifyNftCollectionOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const verifyNftCollectionOperation: import("../../../types").OperationConstructor<VerifyNftCollectionOperation, "VerifyNftCollectionOperation", VerifyNftCollectionInput, VerifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type VerifyNftCollectionOperation = Operation<typeof Key, VerifyNftCollectionInput, VerifyNftCollectionOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type VerifyNftCollectionInput = {
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
export declare type VerifyNftCollectionOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const verifyNftCollectionOperationHandler: OperationHandler<VerifyNftCollectionOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type VerifyNftCollectionBuilderParams = Omit<VerifyNftCollectionInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const verifyNftCollectionBuilder: (metaplex: Metaplex, params: VerifyNftCollectionBuilderParams) => TransactionBuilder;
export {};
