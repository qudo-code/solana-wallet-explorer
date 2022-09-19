import type { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "FreezeTokensOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const freezeTokensOperation: import("../../../types").OperationConstructor<FreezeTokensOperation, "FreezeTokensOperation", FreezeTokensInput, FreezeTokensOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type FreezeTokensOperation = Operation<typeof Key, FreezeTokensInput, FreezeTokensOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FreezeTokensInput = {
    mintAddress: PublicKey;
    freezeAuthority: PublicKey | Signer;
    tokenOwner?: PublicKey;
    tokenAddress?: PublicKey;
    multiSigners?: KeypairSigner[];
    tokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type FreezeTokensOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const freezeTokensOperationHandler: OperationHandler<FreezeTokensOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type FreezeTokensBuilderParams = Omit<FreezeTokensInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const freezeTokensBuilder: (metaplex: Metaplex, params: FreezeTokensBuilderParams) => TransactionBuilder;
export {};
