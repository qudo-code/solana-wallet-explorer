'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createListing = require('./createListing.cjs');
var findListingByAddress = require('./findListingByAddress.cjs');
var loadListing = require('./loadListing.cjs');
var createBid = require('./createBid.cjs');
var findBidByReceipt = require('./findBidByReceipt.cjs');
var findBidByTradeState = require('./findBidByTradeState.cjs');
var loadBid = require('./loadBid.cjs');
var executeSale = require('./executeSale.cjs');
var findPurchaseByAddress = require('./findPurchaseByAddress.cjs');
var loadPurchase = require('./loadPurchase.cjs');
var cancelBid = require('./cancelBid.cjs');
var cancelListing = require('./cancelListing.cjs');
var Task = require('../../utils/Task.cjs');
var DateTime = require('../../types/DateTime.cjs');

/**
 * @group Modules
 */
class AuctionHouseClient {
  constructor(metaplex, auctionHouse, auctioneerAuthority) {
    this.metaplex = metaplex;
    this.auctionHouse = auctionHouse;
    this.auctioneerAuthority = auctioneerAuthority;
  }

  cancelBid(input) {
    return this.metaplex.operations().getTask(cancelBid.cancelBidOperation(this.addAH(input)));
  }

  cancelListing(input) {
    return this.metaplex.operations().getTask(cancelListing.cancelListingOperation(this.addAH(input)));
  }

  executeSale(input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().execute(executeSale.executeSaleOperation(this.addAH(input)));
      scope.throwIfCanceled();

      try {
        const purchase = await this.findPurchaseByAddress(output.sellerTradeState, output.buyerTradeState).run(scope);
        return {
          purchase,
          ...output
        };
      } catch (error) {// Fallback to manually creating a purchase from inputs and outputs.
      }

      const lazyPurchase = {
        model: 'purchase',
        lazy: true,
        auctionHouse: this.auctionHouse,
        buyerAddress: output.buyer,
        sellerAddress: output.seller,
        metadataAddress: output.metadata,
        bookkeeperAddress: output.bookkeeper,
        receiptAddress: output.receipt,
        price: output.price,
        tokens: output.tokens.basisPoints,
        createdAt: DateTime.now()
      };
      return {
        purchase: await this.loadPurchase(lazyPurchase).run(scope),
        ...output
      };
    });
  }

  findPurchaseByAddress(sellerTradeState, buyerTradeState, options = {}) {
    return this.metaplex.operations().getTask(findPurchaseByAddress.findPurchaseByAddressOperation({
      sellerTradeState,
      buyerTradeState,
      auctionHouse: this.auctionHouse,
      ...options
    }));
  }

  loadPurchase(lazyPurchase, options = {}) {
    return this.metaplex.operations().getTask(loadPurchase.loadPurchaseOperation({
      lazyPurchase,
      ...options
    }));
  }

  list(input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().execute(createListing.createListingOperation(this.addAH(input)), scope);
      scope.throwIfCanceled();

      try {
        const listing = await this.findListingByAddress(output.sellerTradeState).run(scope);
        return {
          listing,
          ...output
        };
      } catch (error) {// Fallback to manually creating a listing from inputs and outputs.
      }

      scope.throwIfCanceled();
      const lazyListing = {
        model: 'listing',
        lazy: true,
        auctionHouse: this.auctionHouse,
        tradeStateAddress: output.sellerTradeState,
        bookkeeperAddress: output.bookkeeper,
        sellerAddress: output.seller,
        metadataAddress: output.metadata,
        receiptAddress: output.receipt,
        purchaseReceiptAddress: null,
        price: output.price,
        tokens: output.tokens.basisPoints,
        createdAt: DateTime.now(),
        canceledAt: null
      };
      return {
        listing: await this.loadListing(lazyListing).run(scope),
        ...output
      };
    });
  }

  findListingByAddress(address, options = {}) {
    return this.metaplex.operations().getTask(findListingByAddress.findListingByAddressOperation({
      address,
      auctionHouse: this.auctionHouse,
      ...options
    }));
  }

  loadListing(lazyListing, options = {}) {
    return this.metaplex.operations().getTask(loadListing.loadListingOperation({
      lazyListing,
      ...options
    }));
  }

  bid(input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().execute(createBid.createBidOperation(this.addAH(input)), scope);
      scope.throwIfCanceled();

      if (output.receipt) {
        const bid = await this.findBidByReceipt(output.receipt).run(scope);
        return {
          bid,
          ...output
        };
      }

      scope.throwIfCanceled();
      const lazyBid = {
        model: 'bid',
        lazy: true,
        auctionHouse: this.auctionHouse,
        tradeStateAddress: output.buyerTradeState,
        bookkeeperAddress: output.bookkeeper,
        tokenAddress: output.tokenAccount,
        buyerAddress: output.buyer,
        metadataAddress: output.metadata,
        receiptAddress: output.receipt,
        purchaseReceiptAddress: null,
        isPublic: Boolean(output.tokenAccount),
        price: output.price,
        tokens: output.tokens.basisPoints,
        createdAt: DateTime.now(),
        canceledAt: null
      };
      return {
        bid: await this.loadBid(lazyBid).run(scope),
        ...output
      };
    });
  }

  findBidByReceipt(receiptAddress, options = {}) {
    return this.metaplex.operations().getTask(findBidByReceipt.findBidByReceiptOperation({
      receiptAddress,
      auctionHouse: this.auctionHouse,
      ...options
    }));
  }

  findBidByTradeState(tradeStateAddress, options = {}) {
    return this.metaplex.operations().getTask(findBidByTradeState.findBidByTradeStateOperation({
      tradeStateAddress,
      auctionHouse: this.auctionHouse,
      ...options
    }));
  }

  loadBid(lazyBid, options = {}) {
    return this.metaplex.operations().getTask(loadBid.loadBidOperation({
      lazyBid,
      ...options
    }));
  }

  addAH(input) {
    return {
      auctionHouse: this.auctionHouse,
      auctioneerAuthority: this.auctioneerAuthority,
      ...input
    };
  }

}

exports.AuctionHouseClient = AuctionHouseClient;
//# sourceMappingURL=AuctionHouseClient.cjs.map
