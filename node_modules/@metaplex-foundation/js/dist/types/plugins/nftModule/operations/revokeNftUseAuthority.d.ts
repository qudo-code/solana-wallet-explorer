import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "RevokeNftUseAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const revokeNftUseAuthorityOperation: import("../../../types").OperationConstructor<RevokeNftUseAuthorityOperation, "RevokeNftUseAuthorityOperation", RevokeNftUseAuthorityInput, RevokeNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type RevokeNftUseAuthorityOperation = Operation<typeof Key, RevokeNftUseAuthorityInput, RevokeNftUseAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type RevokeNftUseAuthorityInput = {
    mintAddress: PublicKey;
    user: PublicKey;
    owner?: Signer;
    ownerTokenAddress?: PublicKey;
    tokenProgram?: PublicKey;
    systemProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type RevokeNftUseAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const revokeNftUseAuthorityOperationHandler: OperationHandler<RevokeNftUseAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type RevokeNftUseAuthorityBuilderParams = Omit<RevokeNftUseAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const revokeNftUseAuthorityBuilder: (metaplex: Metaplex, params: RevokeNftUseAuthorityBuilderParams) => TransactionBuilder;
export {};
