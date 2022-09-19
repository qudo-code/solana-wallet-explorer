import { Metaplex } from '../../../Metaplex';
import { Operation, OperationHandler, Signer } from '../../../types';
import { TransactionBuilder } from '../../../utils';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
declare const Key: "UseNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const useNftOperation: import("../../../types").OperationConstructor<UseNftOperation, "UseNftOperation", UseNftInput, UseNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UseNftOperation = Operation<typeof Key, UseNftInput, UseNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UseNftInput = {
    mintAddress: PublicKey;
    numberOfUses?: number;
    owner?: PublicKey | Signer;
    ownerTokenAccount?: PublicKey;
    useAuthority?: Signer;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UseNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const useNftOperationHandler: OperationHandler<UseNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UseNftBuilderParams = Omit<UseNftInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const useNftBuilder: (metaplex: Metaplex, params: UseNftBuilderParams) => TransactionBuilder;
export {};
