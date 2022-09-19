import type { Commitment } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { Bid, LazyBid } from './Bid';
declare const Key: "LoadBidOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const loadBidOperation: import("../../types").OperationConstructor<LoadBidOperation, "LoadBidOperation", LoadBidInput, Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: import("./AuctionHouse").AuctionHouse;
    tradeStateAddress: import("../../types").Pda;
    buyerAddress: import("@solana/web3.js").PublicKey;
    bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    receiptAddress: import("../../utils").Option<import("../../types").Pda>;
    purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
    canceledAt: import("../../utils").Option<import("../../types").DateTime>;
} & {
    isPublic: false;
    asset: import("../nftModule").SftWithToken | import("../nftModule").NftWithToken;
}> | Readonly<{
    model: "bid";
    lazy: false;
    auctionHouse: import("./AuctionHouse").AuctionHouse;
    tradeStateAddress: import("../../types").Pda;
    buyerAddress: import("@solana/web3.js").PublicKey;
    bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    receiptAddress: import("../../utils").Option<import("../../types").Pda>;
    purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
    canceledAt: import("../../utils").Option<import("../../types").DateTime>;
} & {
    isPublic: true;
    asset: import("../nftModule").Sft | import("../nftModule").Nft;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type LoadBidOperation = Operation<typeof Key, LoadBidInput, Bid>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type LoadBidInput = {
    lazyBid: LazyBid;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const loadBidOperationHandler: OperationHandler<LoadBidOperation>;
export {};
