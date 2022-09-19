'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('./accounts.cjs');
var Listing = require('./Listing.cjs');
var pdas = require('./pdas.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindListingByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findListingByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findListingByAddressOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      address,
      auctionHouse,
      commitment,
      loadJsonMetadata = true
    } = operation.input;
    const receiptAddress = pdas.findListingReceiptPda(address);
    const account = accounts.toListingReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyListing = Listing.toLazyListing(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadListing(lazyListing, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

exports.findListingByAddressOperation = findListingByAddressOperation;
exports.findListingByAddressOperationHandler = findListingByAddressOperationHandler;
//# sourceMappingURL=findListingByAddress.cjs.map
