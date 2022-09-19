import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '../../Metaplex';
import type { SendAndConfirmTransactionResponse } from '../rpcModule';
import { Operation, OperationHandler, Signer, Pda, SolAmount, SplTokenAmount } from '../../types';
import { TransactionBuilder, Option } from '../../utils';
import { AuctionHouse } from './AuctionHouse';
declare const Key: "CreateListingOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createListingOperation: import("../../types").OperationConstructor<CreateListingOperation, "CreateListingOperation", CreateListingInput, CreateListingOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateListingOperation = Operation<typeof Key, CreateListingInput, CreateListingOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateListingInput = {
    auctionHouse: AuctionHouse;
    seller?: PublicKey | Signer;
    authority?: PublicKey | Signer;
    auctioneerAuthority?: Signer;
    mintAccount: PublicKey;
    tokenAccount?: PublicKey;
    price?: SolAmount | SplTokenAmount;
    tokens?: SplTokenAmount;
    bookkeeper?: Signer;
    printReceipt?: boolean;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateListingOutput = {
    response: SendAndConfirmTransactionResponse;
    sellerTradeState: Pda;
    freeSellerTradeState: Pda;
    tokenAccount: PublicKey;
    metadata: Pda;
    seller: PublicKey;
    receipt: Option<Pda>;
    bookkeeper: Option<PublicKey>;
    price: SolAmount | SplTokenAmount;
    tokens: SplTokenAmount;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createListingOperationHandler: OperationHandler<CreateListingOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateListingBuilderParams = Omit<CreateListingInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateListingBuilderContext = Omit<CreateListingOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createListingBuilder: (metaplex: Metaplex, params: CreateListingBuilderParams) => TransactionBuilder<CreateListingBuilderContext>;
export {};
