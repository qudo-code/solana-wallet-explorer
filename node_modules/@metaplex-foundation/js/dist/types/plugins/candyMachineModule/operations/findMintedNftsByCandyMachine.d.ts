import { Operation, OperationHandler } from '../../../types';
import { Commitment, PublicKey } from '@solana/web3.js';
import { Metadata, Nft } from '../../nftModule';
declare const Key: "FindMintedNftsByCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findMintedNftsByCandyMachineOperation: import("../../../types").OperationConstructor<FindMintedNftsByCandyMachineOperation, "FindMintedNftsByCandyMachineOperation", FindMintedNftsByCandyMachineInput, FindMintedNftsByCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindMintedNftsByCandyMachineOperation = Operation<typeof Key, FindMintedNftsByCandyMachineInput, FindMintedNftsByCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindMintedNftsByCandyMachineInput = {
    candyMachine: PublicKey;
    version?: 1 | 2;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FindMintedNftsByCandyMachineOutput = (Metadata | Nft)[];
/**
 * @group Operations
 * @category Handlers
 */
export declare const findMintedNftsByCandyMachineOperationHandler: OperationHandler<FindMintedNftsByCandyMachineOperation>;
export {};
