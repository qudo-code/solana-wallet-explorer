import { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "RevokeTokenDelegateAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const revokeTokenDelegateAuthorityOperation: import("../../../types").OperationConstructor<RevokeTokenDelegateAuthorityOperation, "RevokeTokenDelegateAuthorityOperation", RevokeTokenDelegateAuthorityInput, RevokeTokenDelegateAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type RevokeTokenDelegateAuthorityOperation = Operation<typeof Key, RevokeTokenDelegateAuthorityInput, RevokeTokenDelegateAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type RevokeTokenDelegateAuthorityInput = {
    mintAddress: PublicKey;
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
export declare type RevokeTokenDelegateAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const revokeTokenDelegateAuthorityOperationHandler: OperationHandler<RevokeTokenDelegateAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type RevokeTokenDelegateAuthorityBuilderParams = Omit<RevokeTokenDelegateAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const revokeTokenDelegateAuthorityBuilder: (metaplex: Metaplex, params: RevokeTokenDelegateAuthorityBuilderParams) => TransactionBuilder;
export {};
