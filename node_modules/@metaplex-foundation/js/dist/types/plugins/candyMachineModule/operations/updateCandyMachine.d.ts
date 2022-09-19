import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { CandyMachineData } from '@metaplex-foundation/mpl-candy-machine';
import type { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineConfigs } from '../models/CandyMachine';
declare const Key: "UpdateCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const updateCandyMachineOperation: import("../../../types").OperationConstructor<UpdateCandyMachineOperation, "UpdateCandyMachineOperation", UpdateCandyMachineInput, UpdateCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UpdateCandyMachineOperation = Operation<typeof Key, UpdateCandyMachineInput, UpdateCandyMachineOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UpdateCandyMachineInput = Partial<CandyMachineConfigs> & {
    /**
     * The candy machine to update.
     */
    candyMachine: CandyMachine;
    authority?: Signer;
    payer?: Signer;
    newAuthority?: PublicKey;
    newCollection?: Option<PublicKey>;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UpdateCandyMachineOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const updateCandyMachineOperationHandler: OperationHandler<UpdateCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UpdateCandyMachineBuilderParams = {
    /**
     * The Candy Machine to update.
     */
    candyMachine: Pick<CandyMachine, 'address' | 'walletAddress' | 'collectionMintAddress'>;
    /**
     * The Signer that is authorized to update the candy machine.
     * @defaultValue `metaplex.identity()`
     */
    authority?: Signer;
    /**
     * The Signer that should pay for any required account storage.
     * E.g. for the collection PDA that keeps track of the Candy Machine's collection.
     * @defaultValue `metaplex.identity()`
     */
    payer?: Signer;
    /**
     * The new Candy Machine data.
     * This includes the wallet and token mint addresses
     * which can both be updated.
     * @defaultValue Defaults to not being updated.
     */
    newData?: CandyMachineData & {
        wallet: PublicKey;
        tokenMint: Option<PublicKey>;
    };
    /**
     * The new Candy Machine authority.
     * @defaultValue Defaults to not being updated.
     */
    newAuthority?: PublicKey;
    /**
     * The mint address of the new Candy Machine collection.
     * When `null` is provided, the collection is removed.
     * @defaultValue Defaults to not being updated.
     */
    newCollection?: Option<PublicKey>;
    updateInstructionKey?: string;
    updateAuthorityInstructionKey?: string;
    setCollectionInstructionKey?: string;
    removeCollectionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const updateCandyMachineBuilder: (metaplex: Metaplex, params: UpdateCandyMachineBuilderParams) => TransactionBuilder;
export {};
