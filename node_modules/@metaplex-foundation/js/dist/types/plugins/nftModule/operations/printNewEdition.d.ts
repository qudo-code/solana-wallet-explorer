import { Metaplex } from '../../../Metaplex';
import { BigNumber, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { NftWithToken } from '../models';
declare const Key: "PrintNewEditionOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const printNewEditionOperation: import("../../../types").OperationConstructor<PrintNewEditionOperation, "PrintNewEditionOperation", PrintNewEditionInput, PrintNewEditionOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type PrintNewEditionOperation = Operation<typeof Key, PrintNewEditionInput, PrintNewEditionOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type PrintNewEditionInput = {
    originalMint: PublicKey;
    originalTokenAccountOwner?: Signer;
    originalTokenAccount?: PublicKey;
    newMint?: Signer;
    newUpdateAuthority?: PublicKey;
    newOwner?: PublicKey;
    newTokenAccount?: Signer;
    payer?: Signer;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type PrintNewEditionOutput = {
    response: SendAndConfirmTransactionResponse;
    nft: NftWithToken;
    mintSigner: Signer;
    metadataAddress: PublicKey;
    editionAddress: PublicKey;
    tokenAddress: PublicKey;
    updatedSupply: BigNumber;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const printNewEditionOperationHandler: OperationHandler<PrintNewEditionOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type PrintNewEditionBuilderParams = Omit<PrintNewEditionInput, 'confirmOptions'> & {
    originalSupply: BigNumber;
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
    printNewEditionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type PrintNewEditionBuilderContext = Omit<PrintNewEditionOutput, 'response' | 'nft'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const printNewEditionBuilder: (metaplex: Metaplex, params: PrintNewEditionBuilderParams) => Promise<TransactionBuilder<PrintNewEditionBuilderContext>>;
export {};
