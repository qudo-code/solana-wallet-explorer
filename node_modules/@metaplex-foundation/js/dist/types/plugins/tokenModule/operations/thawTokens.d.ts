import type { Metaplex } from '../../../Metaplex';
import { KeypairSigner, Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "ThawTokensOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const thawTokensOperation: import("../../../types").OperationConstructor<ThawTokensOperation, "ThawTokensOperation", ThawTokensInput, ThawTokensOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ThawTokensOperation = Operation<typeof Key, ThawTokensInput, ThawTokensOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ThawTokensInput = {
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
export declare type ThawTokensOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const thawTokensOperationHandler: OperationHandler<ThawTokensOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ThawTokensBuilderParams = Omit<ThawTokensInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const thawTokensBuilder: (metaplex: Metaplex, params: ThawTokensBuilderParams) => TransactionBuilder;
export {};
