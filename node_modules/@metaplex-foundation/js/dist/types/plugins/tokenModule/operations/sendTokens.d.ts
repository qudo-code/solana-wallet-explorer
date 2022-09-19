import type { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer, SplTokenAmount } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "SendTokensOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const sendTokensOperation: import("../../../types").OperationConstructor<SendTokensOperation, "SendTokensOperation", SendTokensInput, SendTokensOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type SendTokensOperation = Operation<typeof Key, SendTokensInput, SendTokensOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type SendTokensInput = {
    mintAddress: PublicKey;
    amount: SplTokenAmount;
    toOwner?: PublicKey;
    toToken?: PublicKey | Signer;
    fromOwner?: PublicKey | Signer;
    fromToken?: PublicKey;
    fromMultiSigners?: KeypairSigner[];
    delegateAuthority?: Signer;
    payer?: Signer;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type SendTokensOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const sendTokensOperationHandler: OperationHandler<SendTokensOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type SendTokensBuilderParams = Omit<SendTokensInput, 'confirmOptions'> & {
    toTokenExists?: boolean;
    createAssociatedTokenAccountInstructionKey?: string;
    createAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    transferTokensInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const sendTokensBuilder: (metaplex: Metaplex, params: SendTokensBuilderParams) => Promise<TransactionBuilder>;
export {};
