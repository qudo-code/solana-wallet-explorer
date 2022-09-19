import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { AuctionHouse } from './AuctionHouse';
import { Purchase } from './Purchase';
declare const Key: "FindPurchaseByAddressOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findPurchaseByAddressOperation: import("../../types").OperationConstructor<FindPurchaseByAddressOperation, "FindPurchaseByAddressOperation", FindPurchaseByAddressInput, Readonly<{
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
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindPurchaseByAddressOperation = Operation<typeof Key, FindPurchaseByAddressInput, Purchase>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindPurchaseByAddressInput = {
    sellerTradeState: PublicKey;
    buyerTradeState: PublicKey;
    auctionHouse: AuctionHouse;
    loadJsonMetadata?: boolean;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findPurchaseByAddressOperationHandler: OperationHandler<FindPurchaseByAddressOperation>;
export {};
