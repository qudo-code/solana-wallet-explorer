import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer, SplTokenAmount } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { TokenWithMint } from '../models/Token';
declare const Key: "CreateTokenWithMintOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createTokenWithMintOperation: import("../../../types").OperationConstructor<CreateTokenWithMintOperation, "CreateTokenWithMintOperation", CreateTokenWithMintInput, CreateTokenWithMintOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateTokenWithMintOperation = Operation<typeof Key, CreateTokenWithMintInput, CreateTokenWithMintOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateTokenWithMintInput = {
    decimals?: number;
    initialSupply?: SplTokenAmount;
    mint?: Signer;
    mintAuthority?: Signer | PublicKey;
    freezeAuthority?: Option<PublicKey>;
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
export declare type CreateTokenWithMintOutput = {
    response: SendAndConfirmTransactionResponse;
    mintSigner: Signer;
    token: TokenWithMint;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createTokenWithMintOperationHandler: OperationHandler<CreateTokenWithMintOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateTokenWithMintBuilderParams = Omit<CreateTokenWithMintInput, 'confirmOptions'> & {
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateTokenWithMintBuilderContext = {
    mintSigner: Signer;
    tokenAddress: PublicKey;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createTokenWithMintBuilder: (metaplex: Metaplex, params: CreateTokenWithMintBuilderParams) => Promise<TransactionBuilder<CreateTokenWithMintBuilderContext>>;
export {};
