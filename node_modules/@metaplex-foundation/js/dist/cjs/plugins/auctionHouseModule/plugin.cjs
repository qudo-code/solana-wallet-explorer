'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var AuctionsClient = require('./AuctionsClient.cjs');
var program = require('./program.cjs');
var cancelBid = require('./cancelBid.cjs');
var cancelListing = require('./cancelListing.cjs');
var createAuctionHouse = require('./createAuctionHouse.cjs');
var createBid = require('./createBid.cjs');
var createListing = require('./createListing.cjs');
var executeSale = require('./executeSale.cjs');
var findAuctionHouseByAddress = require('./findAuctionHouseByAddress.cjs');
var findBidByReceipt = require('./findBidByReceipt.cjs');
var findBidByTradeState = require('./findBidByTradeState.cjs');
var findListingByAddress = require('./findListingByAddress.cjs');
var findPurchaseByAddress = require('./findPurchaseByAddress.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');
var loadBid = require('./loadBid.cjs');
var loadListing = require('./loadListing.cjs');
var loadPurchase = require('./loadPurchase.cjs');

/** @group Plugins */

const auctionHouseModule = () => ({
  install(metaplex) {
    // Auction House Program.
    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: program.AuctionHouseProgram.publicKey,
      errorResolver: error => mplAuctionHouse.cusper.errorFromProgramLogs(error.logs, false)
    });
    const op = metaplex.operations();
    op.register(cancelBid.cancelBidOperation, cancelBid.cancelBidOperationHandler);
    op.register(cancelListing.cancelListingOperation, cancelListing.cancelListingOperationHandler);
    op.register(createAuctionHouse.createAuctionHouseOperation, createAuctionHouse.createAuctionHouseOperationHandler);
    op.register(createBid.createBidOperation, createBid.createBidOperationHandler);
    op.register(createListing.createListingOperation, createListing.createListingOperationHandler);
    op.register(executeSale.executeSaleOperation, executeSale.executeSaleOperationHandler);
    op.register(findAuctionHouseByAddress.findAuctionHouseByAddressOperation, findAuctionHouseByAddress.findAuctionHouseByAddressOperationHandler);
    op.register(findBidByReceipt.findBidByReceiptOperation, findBidByReceipt.findBidByReceiptOperationHandler);
    op.register(findBidByTradeState.findBidByTradeStateOperation, findBidByTradeState.findBidByTradeStateOperationHandler);
    op.register(findListingByAddress.findListingByAddressOperation, findListingByAddress.findListingByAddressOperationHandler);
    op.register(findPurchaseByAddress.findPurchaseByAddressOperation, findPurchaseByAddress.findPurchaseByAddressOperationHandler);
    op.register(loadBid.loadBidOperation, loadBid.loadBidOperationHandler);
    op.register(loadListing.loadListingOperation, loadListing.loadListingOperationHandler);
    op.register(loadPurchase.loadPurchaseOperation, loadPurchase.loadPurchaseOperationHandler);
    op.register(updateAuctionHouse.updateAuctionHouseOperation, updateAuctionHouse.updateAuctionHouseOperationHandler);

    metaplex.auctions = function () {
      return new AuctionsClient.AuctionsClient(this);
    };
  }

});

exports.auctionHouseModule = auctionHouseModule;
//# sourceMappingURL=plugin.cjs.map
