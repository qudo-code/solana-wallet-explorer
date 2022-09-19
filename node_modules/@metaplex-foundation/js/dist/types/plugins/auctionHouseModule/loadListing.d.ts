import type { Commitment } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { LazyListing, Listing } from './Listing';
declare const Key: "LoadListingOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const loadListingOperation: import("../../types").OperationConstructor<LoadListingOperation, "LoadListingOperation", LoadListingInput, Readonly<{
    model: "listing";
    lazy: false;
    auctionHouse: import("./AuctionHouse").AuctionHouse;
    asset: import("../nftModule").SftWithToken | import("../nftModule").NftWithToken;
    /**
     * @group Operations
     * @category Types
     */
    tradeStateAddress: import("../../types").Pda;
    sellerAddress: import("@solana/web3.js").PublicKey;
    bookkeeperAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    receiptAddress: import("../../utils").Option<import("../../types").Pda>;
    /**
     * @group Operations
     * @category Inputs
     */
    purchaseReceiptAddress: import("../../utils").Option<import("@solana/web3.js").PublicKey>;
    price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
    tokens: import("../../types").SplTokenAmount;
    createdAt: import("../../types").DateTime;
    canceledAt: import("../../utils").Option<import("../../types").DateTime>;
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type LoadListingOperation = Operation<typeof Key, LoadListingInput, Listing>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type LoadListingInput = {
    lazyListing: LazyListing;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const loadListingOperationHandler: OperationHandler<LoadListingOperation>;
export {};
