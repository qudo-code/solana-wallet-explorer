import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "RevokeNftCollectionAuthorityOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const revokeNftCollectionAuthorityOperation: import("../../../types").OperationConstructor<RevokeNftCollectionAuthorityOperation, "RevokeNftCollectionAuthorityOperation", RevokeNftCollectionAuthorityInput, RevokeNftCollectionAuthorityOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type RevokeNftCollectionAuthorityOperation = Operation<typeof Key, RevokeNftCollectionAuthorityInput, RevokeNftCollectionAuthorityOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type RevokeNftCollectionAuthorityInput = {
    mintAddress: PublicKey;
    collectionAuthority: PublicKey;
    revokeAuthority?: Signer;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type RevokeNftCollectionAuthorityOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const revokeNftCollectionAuthorityOperationHandler: OperationHandler<RevokeNftCollectionAuthorityOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type RevokeNftCollectionAuthorityBuilderParams = Omit<RevokeNftCollectionAuthorityInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const revokeNftCollectionAuthorityBuilder: (metaplex: Metaplex, params: RevokeNftCollectionAuthorityBuilderParams) => TransactionBuilder;
export {};
