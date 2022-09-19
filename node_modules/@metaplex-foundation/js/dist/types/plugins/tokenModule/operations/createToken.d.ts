import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { Token } from '../models/Token';
declare const Key: "CreateTokenOperation";
/**
 * Create a new Token account from the provided input
 * and returns the newly created `Token` model.
 *
 * @group Operations
 * @category Constructors
 */
export declare const createTokenOperation: import("../../../types").OperationConstructor<CreateTokenOperation, "CreateTokenOperation", CreateTokenInput, CreateTokenOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateTokenOperation = Operation<typeof Key, CreateTokenInput, CreateTokenOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateTokenInput = {
    mint: PublicKey;
    owner?: PublicKey;
    token?: Signer;
    payer?: Signer;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateTokenOutput = {
    response: SendAndConfirmTransactionResponse;
    token: Token;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createTokenOperationHandler: OperationHandler<CreateTokenOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateTokenBuilderParams = Omit<CreateTokenInput, 'confirmOptions'> & {
    createAssociatedTokenAccountInstructionKey?: string;
    createAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateTokenBuilderContext = {
    tokenAddress: PublicKey;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createTokenBuilder: (metaplex: Metaplex, params: CreateTokenBuilderParams) => Promise<TransactionBuilder<CreateTokenBuilderContext>>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateTokenIfMissingBuilderParams = Omit<CreateTokenBuilderParams, 'token'> & {
    token?: PublicKey | Signer;
    tokenExists?: boolean;
    tokenVariable?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createTokenIfMissingBuilder: (metaplex: Metaplex, params: CreateTokenIfMissingBuilderParams) => Promise<TransactionBuilder<CreateTokenBuilderContext>>;
export {};
