import { Metaplex } from '../../Metaplex';
import { Signer } from '../../types';
import { Task } from '../../utils';
import { PublicKey } from '@solana/web3.js';
import { AuctionHouse } from './AuctionHouse';
import { CreateListingInput, CreateListingOutput } from './createListing';
import { FindListingByAddressInput } from './findListingByAddress';
import { LazyListing, Listing } from './Listing';
import { LoadListingInput } from './loadListing';
import { CreateBidInput, CreateBidOutput } from './createBid';
import { FindBidByReceiptInput } from './findBidByReceipt';
import { FindBidByTradeStateInput } from './findBidByTradeState';
import { Bid, LazyBid } from './Bid';
import { LoadBidInput } from './loadBid';
import { ExecuteSaleInput, ExecuteSaleOutput } from './executeSale';
import { FindPurchaseByAddressInput } from './findPurchaseByAddress';
import { LazyPurchase, Purchase } from './Purchase';
import { LoadPurchaseInput } from './loadPurchase';
import { CancelBidInput, CancelBidOutput } from './cancelBid';
import { CancelListingInput, CancelListingOutput } from './cancelListing';
declare type WithoutAH<T> = Omit<T, 'auctionHouse' | 'auctioneerAuthority'>;
/**
 * @group Modules
 */
export declare class AuctionHouseClient {
    protected readonly metaplex: Metaplex;
    protected readonly auctionHouse: AuctionHouse;
    protected readonly auctioneerAuthority?: Signer | undefined;
    constructor(metaplex: Metaplex, auctionHouse: AuctionHouse, auctioneerAuthority?: Signer | undefined);
    cancelBid(input: WithoutAH<CancelBidInput>): Task<CancelBidOutput>;
    cancelListing(input: WithoutAH<CancelListingInput>): Task<CancelListingOutput>;
    executeSale(input: WithoutAH<ExecuteSaleInput>): Task<ExecuteSaleOutput & {
        purchase: Purchase;
    }>;
    findPurchaseByAddress(sellerTradeState: PublicKey, buyerTradeState: PublicKey, options?: Omit<FindPurchaseByAddressInput, 'sellerTradeState' | 'buyerTradeState' | 'auctionHouse'>): Task<Readonly<{
        model: "purchase";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        buyerAddress: PublicKey;
        sellerAddress: PublicKey;
        bookkeeperAddress: import("../../utils").Option<PublicKey>;
        receiptAddress: import("../../utils").Option<PublicKey>;
        price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
        tokens: import("../../types").SplTokenAmount;
        createdAt: import("../../types").DateTime;
    }>, []>;
    loadPurchase(lazyPurchase: LazyPurchase, options?: Omit<LoadPurchaseInput, 'lazyPurchase'>): Task<Purchase>;
    list(input: WithoutAH<CreateListingInput>): Task<CreateListingOutput & {
        listing: Listing;
    }>;
    findListingByAddress(address: PublicKey, options?: Omit<FindListingByAddressInput, 'address' | 'auctionHouse'>): Task<Readonly<{
        model: "listing";
        lazy: false;
        auctionHouse: AuctionHouse;
        asset: import("..").SftWithToken | import("..").NftWithToken;
        tradeStateAddress: import("../../types").Pda;
        sellerAddress: PublicKey;
        bookkeeperAddress: import("../../utils").Option<PublicKey>;
        receiptAddress: import("../../utils").Option<import("../../types").Pda>;
        purchaseReceiptAddress: import("../../utils").Option<PublicKey>;
        price: import("../../types").SplTokenAmount | import("../../types").SolAmount;
        tokens: import("../../types").SplTokenAmount;
        createdAt: import("../../types").DateTime;
        canceledAt: import("../../utils").Option<import("../../types").DateTime>;
    }>, []>;
    loadListing(lazyListing: LazyListing, options?: Omit<LoadListingInput, 'lazyListing'>): Task<Listing>;
    bid(input: WithoutAH<CreateBidInput>): Task<CreateBidOutput & {
        bid: Bid;
    }>;
    findBidByReceipt(receiptAddress: PublicKey, options?: Omit<FindBidByReceiptInput, 'receiptAddress' | 'auctionHouse'>): Task<Readonly<{
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
    }>, []>;
    findBidByTradeState(tradeStateAddress: PublicKey, options?: Omit<FindBidByTradeStateInput, 'tradeStateAddress' | 'auctionHouse'>): Task<Readonly<{
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
    }>, []>;
    loadBid(lazyBid: LazyBid, options?: Omit<LoadBidInput, 'lazyBid'>): Task<Bid>;
    protected addAH<T>(input: WithoutAH<T>): T;
}
export {};
