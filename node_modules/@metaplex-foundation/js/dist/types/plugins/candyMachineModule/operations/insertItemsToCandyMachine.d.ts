import { BigNumber, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import type { ConfirmOptions } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineItem } from '../models/CandyMachine';
declare const Key: "InsertItemsToCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const insertItemsToCandyMachineOperation: import("../../../types").OperationConstructor<InsertItemsToCandyMachineOperation, "InsertItemsToCandyMachineOperation", InsertItemsToCandyMachineInput, InsertItemsToCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type InsertItemsToCandyMachineOperation = Operation<typeof Key, InsertItemsToCandyMachineInput, InsertItemsToCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type InsertItemsToCandyMachineInput = {
    candyMachine: Pick<CandyMachine, 'itemsAvailable' | 'itemsLoaded' | 'address'>;
    authority: Signer;
    items: CandyMachineItem[];
    index?: BigNumber;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type InsertItemsToCandyMachineOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const InsertItemsToCandyMachineOperationHandler: OperationHandler<InsertItemsToCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type InsertItemsToCandyMachineBuilderParams = Omit<InsertItemsToCandyMachineInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const insertItemsToCandyMachineBuilder: (params: InsertItemsToCandyMachineBuilderParams) => TransactionBuilder;
export {};
