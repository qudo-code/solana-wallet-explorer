import type { Commitment } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { Purchase, LazyPurchase } from './Purchase';
declare const Key: "LoadPurchaseOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const loadPurchaseOperation: import("../../types").OperationConstructor<LoadPurchaseOperation, "LoadPurchaseOperation", LoadPurchaseInput, Readonly<{
    model: "purchase";
    lazy: false;
    auctionHouse: import("./AuctionHouse").AuctionHouse;
    asset: import("../nftModule").SftWithToken | import("../nftModule").NftWithToken;
    buyerAddress: import("@solana/web3.js").PublicKey;
    sellerAddress: import("@solana/web3.js").PublicKey;
    bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    receiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type LoadPurchaseOperation = Operation<typeof Key, LoadPurchaseInput, Purchase>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type LoadPurchaseInput = {
    lazyPurchase: LazyPurchase;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const loadPurchaseOperationHandler: OperationHandler<LoadPurchaseOperation>;
export {};
