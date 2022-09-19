import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import type { ConfirmOptions } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineConfigs } from '../models/CandyMachine';
declare const Key: "DeleteCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const deleteCandyMachineOperation: import("../../../types").OperationConstructor<DeleteCandyMachineOperation, "DeleteCandyMachineOperation", DeleteCandyMachineInput, DeleteCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type DeleteCandyMachineOperation = Operation<typeof Key, DeleteCandyMachineInput, DeleteCandyMachineOutput>;
export declare type DeleteCandyMachineInputWithoutConfigs = {
    candyMachine: Pick<CandyMachine, 'address' | 'collectionMintAddress'>;
    authority?: Signer;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Inputs
 */
export declare type DeleteCandyMachineInput = DeleteCandyMachineInputWithoutConfigs & Partial<CandyMachineConfigs>;
/**
 * @group Operations
 * @category Outputs
 */
export declare type DeleteCandyMachineOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const deleteCandyMachineOperationHandler: OperationHandler<DeleteCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type DeleteCandyMachineBuilderParams = Omit<DeleteCandyMachineInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const deleteCandyMachineBuilder: (metaplex: Metaplex, params: DeleteCandyMachineBuilderParams) => TransactionBuilder;
export {};
