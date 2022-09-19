import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "UnverifyNftCreatorOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const unverifyNftCreatorOperation: import("../../../types").OperationConstructor<UnverifyNftCreatorOperation, "UnverifyNftCreatorOperation", UnverifyNftCreatorInput, UnverifyNftCreatorOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UnverifyNftCreatorOperation = Operation<typeof Key, UnverifyNftCreatorInput, UnverifyNftCreatorOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UnverifyNftCreatorInput = {
    mintAddress: PublicKey;
    creator?: Signer;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UnverifyNftCreatorOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const unverifyNftCreatorOperationHandler: OperationHandler<UnverifyNftCreatorOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UnverifyNftCreatorBuilderParams = Omit<UnverifyNftCreatorInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const unverifyNftCreatorBuilder: (metaplex: Metaplex, params: UnverifyNftCreatorBuilderParams) => TransactionBuilder;
export {};
