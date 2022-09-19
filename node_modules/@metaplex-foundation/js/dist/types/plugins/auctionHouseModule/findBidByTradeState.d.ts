import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { AuctionHouse } from './AuctionHouse';
import { Bid } from './Bid';
declare const Key: "FindBidByTradeStateOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findBidByTradeStateOperation: import("../../types").OperationConstructor<FindBidByTradeStateOperation, "FindBidByTradeStateOperation", FindBidByTradeStateInput, Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: AuctionHouse;
    tradeStateAddress: import("../../types").Pda;
    buyerAddress: PublicKey;
    bookkeeperAddress: import("../../utils").Option<PublicKey>;
    receiptAddress: import("../../utils").Option<import("../../types").Pda>;
    purchaseReceiptAddress: import("../../utils").Option<PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
    canceledAt: import("../../utils").Option<import("../../types").DateTime>;
} & {
    isPublic: false;
    asset: import("..").SftWithToken | import("..").NftWithToken;
}> | Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: AuctionHouse;
    tradeStateAddress: import("../../types").Pda;
    buyerAddress: PublicKey;
    bookkeeperAddress: import("../../utils").Option<PublicKey>;
    receiptAddress: import("../../utils").Option<import("../../types").Pda>;
    purchaseReceiptAddress: import("../../utils").Option<PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
    canceledAt: import("../../utils").Option<import("../../types").DateTime>;
} & {
    isPublic: true;
    asset: import("..").Sft | import("..").Nft;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindBidByTradeStateOperation = Operation<typeof Key, FindBidByTradeStateInput, Bid>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindBidByTradeStateInput = {
    tradeStateAddress: PublicKey;
    auctionHouse: AuctionHouse;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findBidByTradeStateOperationHandler: OperationHandler<FindBidByTradeStateOperation>;
export {};
