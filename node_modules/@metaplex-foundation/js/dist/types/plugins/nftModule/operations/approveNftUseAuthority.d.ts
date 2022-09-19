import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ApproveNftUseAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const approveNftUseAuthorityOperation: import("../../../types").OperationConstructor<ApproveNftUseAuthorityOperation, "ApproveNftUseAuthorityOperation", ApproveNftUseAuthorityInput, ApproveNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ApproveNftUseAuthorityOperation = Operation<typeof Key, ApproveNftUseAuthorityInput, ApproveNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ApproveNftUseAuthorityInput = {
    mintAddress: PublicKey;
    user: PublicKey;
    owner?: Signer;
    ownerTokenAddress?: PublicKey;
    payer?: Signer;
    numberOfUses?: number;
    tokenProgram?: PublicKey;
    systemProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ApproveNftUseAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const approveNftUseAuthorityOperationHandler: OperationHandler<ApproveNftUseAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ApproveNftUseAuthorityBuilderParams = Omit<ApproveNftUseAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const approveNftUseAuthorityBuilder: (metaplex: Metaplex, params: ApproveNftUseAuthorityBuilderParams) => TransactionBuilder;
export {};
