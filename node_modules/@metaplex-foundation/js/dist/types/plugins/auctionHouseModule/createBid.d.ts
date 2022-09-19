import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import type { Metaplex } from '../../Metaplex';
import { TransactionBuilder, Option } from '../../utils';
import { Operation, OperationHandler, Signer, SolAmount, SplTokenAmount, Pda } from '../../types';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
import { AuctionHouse } from './AuctionHouse';
declare const Key: "CreateBidOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createBidOperation: import("../../types").OperationConstructor<CreateBidOperation, "CreateBidOperation", CreateBidInput, CreateBidOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateBidOperation = Operation<typeof Key, CreateBidInput, CreateBidOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateBidInput = {
    auctionHouse: AuctionHouse;
    buyer?: PublicKey | Signer;
    authority?: PublicKey | Signer;
    auctioneerAuthority?: Signer;
    mintAccount: PublicKey;
    seller?: Option<PublicKey>;
    tokenAccount?: Option<PublicKey>;
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
export declare type CreateBidOutput = {
    response: SendAndConfirmTransactionResponse;
    buyerTradeState: Pda;
    tokenAccount: Option<PublicKey>;
    metadata: Pda;
    buyer: PublicKey;
    receipt: Option<Pda>;
    bookkeeper: Option<PublicKey>;
    price: SolAmount | SplTokenAmount;
    tokens: SplTokenAmount;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createBidOperationHandler: OperationHandler<CreateBidOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateBidBuilderParams = Omit<CreateBidInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateBidBuilderContext = Omit<CreateBidOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createBidBuilder: (metaplex: Metaplex, params: CreateBidBuilderParams) => Promise<TransactionBuilder<CreateBidBuilderContext>>;
export {};
