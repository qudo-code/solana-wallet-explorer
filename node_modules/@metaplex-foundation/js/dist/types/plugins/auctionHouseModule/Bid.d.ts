import { PublicKey } from '@solana/web3.js';
import { BigNumber, DateTime, Pda, SolAmount, SplTokenAmount } from '../../types';
import { BidReceiptAccount } from './accounts';
import { Option } from '../../utils';
import { AuctionHouse } from './AuctionHouse';
import { Nft, NftWithToken, Sft, SftWithToken } from '../nftModule';
export declare type Bid = Readonly<{
    model: 'bid';
    lazy: false;
    auctionHouse: AuctionHouse;
    tradeStateAddress: Pda;
    buyerAddress: PublicKey;
    bookkeeperAddress: Option<PublicKey>;
    receiptAddress: Option<Pda>;
    purchaseReceiptAddress: Option<PublicKey>;
    price: SolAmount | SplTokenAmount;
    tokens: SplTokenAmount;
    createdAt: DateTime;
    canceledAt: Option<DateTime>;
} & ({
    isPublic: false;
    asset: SftWithToken | NftWithToken;
} | {
    isPublic: true;
    asset: Sft | Nft;
})>;
export declare const isBid: (value: any) => value is Bid;
export declare function assertBid(value: any): asserts value is Bid;
export declare const toBid: (account: BidReceiptAccount, auctionHouse: AuctionHouse, asset: Nft | Sft | NftWithToken | SftWithToken) => Bid;
export declare type LazyBid = Omit<Bid, 'lazy' | 'asset' | 'tokens'> & Readonly<{
    lazy: true;
    metadataAddress: PublicKey;
    tokenAddress: Option<PublicKey>;
    tokens: BigNumber;
}>;
export declare const isLazyBid: (value: any) => value is LazyBid;
export declare function assertLazyBid(value: any): asserts value is LazyBid;
export declare const toLazyBid: (account: BidReceiptAccount, auctionHouse: AuctionHouse) => LazyBid;
