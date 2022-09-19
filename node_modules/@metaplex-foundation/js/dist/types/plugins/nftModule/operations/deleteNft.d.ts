import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "DeleteNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const deleteNftOperation: import("../../../types").OperationConstructor<DeleteNftOperation, "DeleteNftOperation", DeleteNftInput, DeleteNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type DeleteNftOperation = Operation<typeof Key, DeleteNftInput, DeleteNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type DeleteNftInput = {
    mintAddress: PublicKey;
    owner?: Signer;
    ownerTokenAccount?: PublicKey;
    collection?: PublicKey;
    tokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type DeleteNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const deleteNftOperationHandler: OperationHandler<DeleteNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type DeleteNftBuilderParams = Omit<DeleteNftInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const deleteNftBuilder: (metaplex: Metaplex, params: DeleteNftBuilderParams) => TransactionBuilder;
export {};
