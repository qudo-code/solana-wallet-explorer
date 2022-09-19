import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer, SolAmount } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "TransferSolOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const transferSolOperation: import("../../../types").OperationConstructor<TransferSolOperation, "TransferSolOperation", TransferSolInput, TransferSolOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type TransferSolOperation = Operation<typeof Key, TransferSolInput, TransferSolOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type TransferSolInput = {
    from?: Signer;
    to: PublicKey;
    amount: SolAmount;
    basePubkey?: PublicKey;
    seed?: string;
    program?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type TransferSolOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const transferSolOperationHandler: OperationHandler<TransferSolOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type TransferSolBuilderParams = Omit<TransferSolInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const transferSolBuilder: (metaplex: Metaplex, params: TransferSolBuilderParams) => TransactionBuilder;
export {};
