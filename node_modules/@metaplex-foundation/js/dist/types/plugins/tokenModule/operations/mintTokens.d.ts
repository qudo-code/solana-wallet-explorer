import type { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer, SplTokenAmount } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "MintTokensOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const mintTokensOperation: import("../../../types").OperationConstructor<MintTokensOperation, "MintTokensOperation", MintTokensInput, MintTokensOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type MintTokensOperation = Operation<typeof Key, MintTokensInput, MintTokensOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type MintTokensInput = {
    mintAddress: PublicKey;
    amount: SplTokenAmount;
    toOwner?: PublicKey;
    toToken?: PublicKey | Signer;
    mintAuthority?: PublicKey | Signer;
    multiSigners?: KeypairSigner[];
    payer?: Signer;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type MintTokensOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const mintTokensOperationHandler: OperationHandler<MintTokensOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type MintTokensBuilderParams = Omit<MintTokensInput, 'confirmOptions'> & {
    /**
     * Whether or not the provided token account already exists.
     * If `false`, we'll add another instruction to create it.
     * @defaultValue `true`
     */
    toTokenExists?: boolean;
    createAssociatedTokenAccountInstructionKey?: string;
    createAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const mintTokensBuilder: (metaplex: Metaplex, params: MintTokensBuilderParams) => Promise<TransactionBuilder>;
export {};
