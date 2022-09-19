'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Bid = require('./Bid.cjs');
var accounts = require('./accounts.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindBidByReceiptOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findBidByReceiptOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findBidByReceiptOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      receiptAddress,
      auctionHouse,
      commitment,
      loadJsonMetadata = true
    } = operation.input;
    const account = accounts.toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = Bid.toLazyBid(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadBid(lazyBid, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

exports.findBidByReceiptOperation = findBidByReceiptOperation;
exports.findBidByReceiptOperationHandler = findBidByReceiptOperationHandler;
//# sourceMappingURL=findBidByReceipt.cjs.map
