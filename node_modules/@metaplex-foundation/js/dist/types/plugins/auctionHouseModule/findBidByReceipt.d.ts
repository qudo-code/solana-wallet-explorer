import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { AuctionHouse } from './AuctionHouse';
import { Bid } from './Bid';
declare const Key: "FindBidByReceiptOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findBidByReceiptOperation: import("../../types").OperationConstructor<FindBidByReceiptOperation, "FindBidByReceiptOperation", FindBidByReceiptInput, Readonly<{
    model: "bid";
    /**
     * @group Operations
     * @category Constructors
     */
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
    /**
     * @group Operations
     * @category Constructors
     */
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
export declare type FindBidByReceiptOperation = Operation<typeof Key, FindBidByReceiptInput, Bid>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindBidByReceiptInput = {
    receiptAddress: PublicKey;
    auctionHouse: AuctionHouse;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findBidByReceiptOperationHandler: OperationHandler<FindBidByReceiptOperation>;
export {};
