import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "VerifyNftCreatorOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const verifyNftCreatorOperation: import("../../../types").OperationConstructor<VerifyNftCreatorOperation, "VerifyNftCreatorOperation", VerifyNftCreatorInput, VerifyNftCreatorOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type VerifyNftCreatorOperation = Operation<typeof Key, VerifyNftCreatorInput, VerifyNftCreatorOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type VerifyNftCreatorInput = {
    mintAddress: PublicKey;
    creator?: Signer;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type VerifyNftCreatorOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const verifyNftCreatorOperationHandler: OperationHandler<VerifyNftCreatorOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type VerifyNftCreatorBuilderParams = Omit<VerifyNftCreatorInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const verifyNftCreatorBuilder: (metaplex: Metaplex, params: VerifyNftCreatorBuilderParams) => TransactionBuilder;
export {};
