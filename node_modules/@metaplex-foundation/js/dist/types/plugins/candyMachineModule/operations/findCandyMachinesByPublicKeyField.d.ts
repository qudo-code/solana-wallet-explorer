import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { CandyMachine } from '../models/CandyMachine';
declare const Key: "FindCandyMachinesByPublicKeyOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findCandyMachinesByPublicKeyFieldOperation: import("../../../types").OperationConstructor<FindCandyMachinesByPublicKeyFieldOperation, "FindCandyMachinesByPublicKeyOperation", FindCandyMachinesByPublicKeyFieldInput, CandyMachine[]>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindCandyMachinesByPublicKeyFieldOperation = Operation<typeof Key, FindCandyMachinesByPublicKeyFieldInput, CandyMachine[]>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindCandyMachinesByPublicKeyFieldInput = {
    type: 'authority' | 'wallet';
    publicKey: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findCandyMachinesByPublicKeyFieldOperationHandler: OperationHandler<FindCandyMachinesByPublicKeyFieldOperation>;
export {};
