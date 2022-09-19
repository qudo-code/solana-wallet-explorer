import { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer, SplTokenAmount } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ApproveTokenDelegateAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const approveTokenDelegateAuthorityOperation: import("../../../types").OperationConstructor<ApproveTokenDelegateAuthorityOperation, "ApproveTokenDelegateAuthorityOperation", ApproveTokenDelegateAuthorityInput, ApproveTokenDelegateAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ApproveTokenDelegateAuthorityOperation = Operation<typeof Key, ApproveTokenDelegateAuthorityInput, ApproveTokenDelegateAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 * */
export declare type ApproveTokenDelegateAuthorityInput = {
    mintAddress: PublicKey;
    delegateAuthority: PublicKey;
    amount?: SplTokenAmount;
    owner?: Signer;
    tokenAddress?: PublicKey;
    multiSigners?: KeypairSigner[];
    tokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ApproveTokenDelegateAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const approveTokenDelegateAuthorityOperationHandler: OperationHandler<ApproveTokenDelegateAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ApproveTokenDelegateAuthorityBuilderParams = Omit<ApproveTokenDelegateAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const approveTokenDelegateAuthorityBuilder: (metaplex: Metaplex, params: ApproveTokenDelegateAuthorityBuilderParams) => TransactionBuilder;
export {};
