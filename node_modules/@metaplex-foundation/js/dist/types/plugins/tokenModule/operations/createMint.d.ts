import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { Mint } from '../models/Mint';
declare const Key: "CreateMintOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createMintOperation: import("../../../types").OperationConstructor<CreateMintOperation, "CreateMintOperation", CreateMintInput, CreateMintOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateMintOperation = Operation<typeof Key, CreateMintInput, CreateMintOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateMintInput = {
    decimals?: number;
    mint?: Signer;
    payer?: Signer;
    mintAuthority?: PublicKey;
    freezeAuthority?: Option<PublicKey>;
    tokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * Create a new Mint account from the provided input
 * and returns the newly created `Mint` model.
 *
 * @group Operations
 * @category Outputs
 */
export declare type CreateMintOutput = {
    response: SendAndConfirmTransactionResponse;
    mintSigner: Signer;
    mint: Mint;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createMintOperationHandler: OperationHandler<CreateMintOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateMintBuilderParams = Omit<CreateMintInput, 'confirmOptions'> & {
    createAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateMintBuilderContext = Omit<CreateMintOutput, 'response' | 'mint'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createMintBuilder: (metaplex: Metaplex, params: CreateMintBuilderParams) => Promise<TransactionBuilder<CreateMintBuilderContext>>;
export {};
