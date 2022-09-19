import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ApproveNftCollectionAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const approveNftCollectionAuthorityOperation: import("../../../types").OperationConstructor<ApproveNftCollectionAuthorityOperation, "ApproveNftCollectionAuthorityOperation", ApproveNftCollectionAuthorityInput, ApproveNftCollectionAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ApproveNftCollectionAuthorityOperation = Operation<typeof Key, ApproveNftCollectionAuthorityInput, ApproveNftCollectionAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ApproveNftCollectionAuthorityInput = {
    mintAddress: PublicKey;
    collectionAuthority: PublicKey;
    updateAuthority?: Signer;
    payer?: Signer;
    systemProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ApproveNftCollectionAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const approveNftCollectionAuthorityOperationHandler: OperationHandler<ApproveNftCollectionAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ApproveNftCollectionAuthorityBuilderParams = Omit<ApproveNftCollectionAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const approveNftCollectionAuthorityBuilder: (metaplex: Metaplex, params: ApproveNftCollectionAuthorityBuilderParams) => TransactionBuilder;
export {};
