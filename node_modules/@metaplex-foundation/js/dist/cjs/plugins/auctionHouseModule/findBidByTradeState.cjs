'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('./pdas.cjs');
var Bid = require('./Bid.cjs');
var accounts = require('./accounts.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindBidByTradeStateOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findBidByTradeStateOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidByTradeStateOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      tradeStateAddress,
      auctionHouse,
      commitment,
      loadJsonMetadata = true
    } = operation.input;
    const receiptAddress = pdas.findBidReceiptPda(tradeStateAddress);
    const account = accounts.toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = Bid.toLazyBid(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadBid(lazyBid, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

exports.findBidByTradeStateOperation = findBidByTradeStateOperation;
exports.findBidByTradeStateOperationHandler = findBidByTradeStateOperationHandler;
//# sourceMappingURL=findBidByTradeState.cjs.map
