'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('./accounts.cjs');
var Purchase = require('./Purchase.cjs');
var pdas = require('./pdas.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindPurchaseByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findPurchaseByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findPurchaseByAddressOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      sellerTradeState,
      buyerTradeState,
      auctionHouse,
      commitment,
      loadJsonMetadata = true
    } = operation.input;
    const receiptAddress = pdas.findPurchaseReceiptPda(sellerTradeState, buyerTradeState);
    const account = accounts.toPurchaseReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyPurchase = Purchase.toLazyPurchase(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadPurchase(lazyPurchase, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

exports.findPurchaseByAddressOperation = findPurchaseByAddressOperation;
exports.findPurchaseByAddressOperationHandler = findPurchaseByAddressOperationHandler;
//# sourceMappingURL=findPurchaseByAddress.cjs.map
