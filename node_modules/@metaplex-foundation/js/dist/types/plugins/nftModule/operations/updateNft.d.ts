import { Metaplex } from '../../../Metaplex';
import { CreatorInput, Operation, OperationHandler, Signer } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { Sft } from '../models';
declare const Key: "UpdateNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const updateNftOperation: import("../../../types").OperationConstructor<UpdateNftOperation, "UpdateNftOperation", UpdateNftInput, UpdateNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UpdateNftOperation = Operation<typeof Key, UpdateNftInput, UpdateNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UpdateNftInput = {
    nftOrSft: Pick<Sft, 'address' | 'collection' | 'creators' | 'name' | 'symbol' | 'uri' | 'sellerFeeBasisPoints' | 'uses'>;
    updateAuthority?: Signer;
    newUpdateAuthority?: PublicKey;
    name?: string;
    symbol?: string;
    uri?: string;
    sellerFeeBasisPoints?: number;
    creators?: CreatorInput[];
    primarySaleHappened?: boolean;
    isMutable?: boolean;
    uses?: Option<Uses>;
    collection?: Option<PublicKey>;
    collectionAuthority?: Option<Signer>;
    collectionAuthorityIsDelegated?: boolean;
    collectionIsSized?: boolean;
    oldCollectionIsSized?: boolean;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UpdateNftOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const updateNftOperationHandler: OperationHandler<UpdateNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UpdateNftBuilderParams = Omit<UpdateNftInput, 'confirmOptions'> & {
    updateMetadataInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const updateNftBuilder: (metaplex: Metaplex, params: UpdateNftBuilderParams) => TransactionBuilder;
export {};
