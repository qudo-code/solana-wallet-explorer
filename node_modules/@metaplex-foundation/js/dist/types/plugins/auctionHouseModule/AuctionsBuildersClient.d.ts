import type { Metaplex } from '../../Metaplex';
import { CreateAuctionHouseBuilderParams } from './createAuctionHouse';
import { CreateBidBuilderParams } from './createBid';
import { CreateListingBuilderParams } from './createListing';
import { ExecuteSaleBuilderParams } from './executeSale';
import { UpdateAuctionHouseBuilderParams } from './updateAuctionHouse';
/**
 * @group Module Builders
 */
export declare class AuctionsBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    bid(input: CreateBidBuilderParams): Promise<import("../..").TransactionBuilder<import("./createBid").CreateBidBuilderContext>>;
    createAuctionHouse(input: CreateAuctionHouseBuilderParams): import("../..").TransactionBuilder<import("./createAuctionHouse").CreateAuctionHouseBuilderContext>;
    list(input: CreateListingBuilderParams): import("../..").TransactionBuilder<import("./createListing").CreateListingBuilderContext>;
    executeSale(input: ExecuteSaleBuilderParams): import("../..").TransactionBuilder<import("./executeSale").ExecuteSaleBuilderContext>;
    updateAuctionHouse(input: UpdateAuctionHouseBuilderParams): import("../..").TransactionBuilder<object>;
}
