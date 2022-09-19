import type { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "FreezeDelegatedNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const freezeDelegatedNftOperation: import("../../../types").OperationConstructor<FreezeDelegatedNftOperation, "FreezeDelegatedNftOperation", FreezeDelegatedNftInput, FreezeDelegatedNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FreezeDelegatedNftOperation = Operation<typeof Key, FreezeDelegatedNftInput, FreezeDelegatedNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FreezeDelegatedNftInput = {
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
export declare type FreezeDelegatedNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const freezeDelegatedNftOperationHandler: OperationHandler<FreezeDelegatedNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type FreezeDelegatedNftBuilderParams = Omit<FreezeDelegatedNftInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const freezeDelegatedNftBuilder: (metaplex: Metaplex, params: FreezeDelegatedNftBuilderParams) => TransactionBuilder;
export {};
