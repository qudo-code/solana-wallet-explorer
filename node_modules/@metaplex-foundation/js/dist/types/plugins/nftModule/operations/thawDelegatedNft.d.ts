import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ThawDelegatedNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const thawDelegatedNftOperation: import("../../../types").OperationConstructor<ThawDelegatedNftOperation, "ThawDelegatedNftOperation", ThawDelegatedNftInput, ThawDelegatedNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ThawDelegatedNftOperation = Operation<typeof Key, ThawDelegatedNftInput, ThawDelegatedNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ThawDelegatedNftInput = {
    mintAddress: PublicKey;
    delegateAuthority: Signer;
    tokenOwner?: PublicKey;
    tokenAddress?: PublicKey;
    tokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ThawDelegatedNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const thawDelegatedNftOperationHandler: OperationHandler<ThawDelegatedNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ThawDelegatedNftBuilderParams = Omit<ThawDelegatedNftInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const thawDelegatedNftBuilder: (metaplex: Metaplex, params: ThawDelegatedNftBuilderParams) => TransactionBuilder;
export {};
