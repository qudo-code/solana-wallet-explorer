import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '../../Metaplex';
import { TransactionBuilder, Option } from '../../utils';
import { Operation, OperationHandler, Pda, Signer, SolAmount, SplTokenAmount } from '../../types';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
import { AuctionHouse } from './AuctionHouse';
import { Bid } from './Bid';
import { Listing } from './Listing';
declare const Key: "ExecuteSaleOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const executeSaleOperation: import("../../types").OperationConstructor<ExecuteSaleOperation, "ExecuteSaleOperation", ExecuteSaleInput, ExecuteSaleOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type ExecuteSaleOperation = Operation<typeof Key, ExecuteSaleInput, ExecuteSaleOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type ExecuteSaleInput = {
    auctionHouse: AuctionHouse;
    auctioneerAuthority?: Signer;
    listing: Listing;
    bid: Bid;
    bookkeeper?: Signer;
    printReceipt?: boolean;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type ExecuteSaleOutput = {
    response: SendAndConfirmTransactionResponse;
    sellerTradeState: PublicKey;
    buyerTradeState: PublicKey;
    buyer: PublicKey;
    seller: PublicKey;
    metadata: PublicKey;
    bookkeeper: Option<PublicKey>;
    receipt: Option<Pda>;
    price: SolAmount | SplTokenAmount;
    tokens: SplTokenAmount;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const executeSaleOperationHandler: OperationHandler<ExecuteSaleOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type ExecuteSaleBuilderParams = Omit<ExecuteSaleInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type ExecuteSaleBuilderContext = Omit<ExecuteSaleOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const executeSaleBuilder: (metaplex: Metaplex, params: ExecuteSaleBuilderParams) => TransactionBuilder<ExecuteSaleBuilderContext>;
export {};
