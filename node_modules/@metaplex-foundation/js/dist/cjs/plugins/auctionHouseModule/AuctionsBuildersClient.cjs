'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createAuctionHouse = require('./createAuctionHouse.cjs');
var createBid = require('./createBid.cjs');
var createListing = require('./createListing.cjs');
var executeSale = require('./executeSale.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');

/**
 * @group Module Builders
 */

class AuctionsBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  bid(input) {
    return createBid.createBidBuilder(this.metaplex, input);
  }

  createAuctionHouse(input) {
    return createAuctionHouse.createAuctionHouseBuilder(this.metaplex, input);
  }

  list(input) {
    return createListing.createListingBuilder(this.metaplex, input);
  }

  executeSale(input) {
    return executeSale.executeSaleBuilder(this.metaplex, input);
  }

  updateAuctionHouse(input) {
    return updateAuctionHouse.updateAuctionHouseBuilder(this.metaplex, input);
  }

}

exports.AuctionsBuildersClient = AuctionsBuildersClient;
//# sourceMappingURL=AuctionsBuildersClient.cjs.map
