import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { Option, RequiredKeys, TransactionBuilder } from '../../../utils';
import { Creator } from '@metaplex-foundation/mpl-candy-machine';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { CandyMachine, CandyMachineConfigs } from '../models/CandyMachine';
declare const Key: "CreateCandyMachineOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createCandyMachineOperation: import("../../../types").OperationConstructor<CreateCandyMachineOperation, "CreateCandyMachineOperation", CreateCandyMachineInput, CreateCandyMachineOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateCandyMachineOperation = Operation<typeof Key, CreateCandyMachineInput, CreateCandyMachineOutput>;
export declare type CreateCandyMachineInputWithoutConfigs = {
    candyMachine?: Signer;
    payer?: Signer;
    authority?: Signer | PublicKey;
    collection?: Option<PublicKey>;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateCandyMachineInput = CreateCandyMachineInputWithoutConfigs & RequiredKeys<Partial<CandyMachineConfigs>, 'price' | 'sellerFeeBasisPoints' | 'itemsAvailable'>;
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateCandyMachineOutput = {
    response: SendAndConfirmTransactionResponse;
    candyMachine: CandyMachine;
    candyMachineSigner: Signer;
    payer: Signer;
    wallet: PublicKey;
    authority: PublicKey;
    creators: Creator[];
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createCandyMachineOperationHandler: OperationHandler<CreateCandyMachineOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateCandyMachineBuilderParams = Omit<CreateCandyMachineInput, 'confirmOptions'> & {
    createAccountInstructionKey?: string;
    initializeCandyMachineInstructionKey?: string;
    setCollectionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateCandyMachineBuilderContext = Omit<CreateCandyMachineOutput, 'response' | 'candyMachine'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createCandyMachineBuilder: (metaplex: Metaplex, params: CreateCandyMachineBuilderParams) => Promise<TransactionBuilder<CreateCandyMachineBuilderContext>>;
export {};
