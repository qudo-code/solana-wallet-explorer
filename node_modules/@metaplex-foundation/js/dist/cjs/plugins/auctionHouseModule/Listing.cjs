'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../utils/assert.cjs');
var DateTime = require('../../types/DateTime.cjs');
var Amount = require('../../types/Amount.cjs');
var Pda = require('../../types/Pda.cjs');
var BigNumber = require('../../types/BigNumber.cjs');

const isListing = value => typeof value === 'object' && value.model === 'listing' && !value.lazy;
function assertListing(value) {
  assert["default"](isListing(value), `Expected Listing type`);
}
const toListing = (account, auctionHouse, asset) => {
  const lazyListing = toLazyListing(account, auctionHouse);
  return { ...lazyListing,
    model: 'listing',
    lazy: false,
    asset,
    tokens: Amount.amount(lazyListing.tokens, asset.mint.currency)
  };
};
const isLazyListing = value => typeof value === 'object' && value.model === 'listing' && value.lazy;
function assertLazyListing(value) {
  assert["default"](isLazyListing(value), `Expected LazyListing type`);
}
const toLazyListing = (account, auctionHouse) => {
  return {
    model: 'listing',
    lazy: true,
    auctionHouse: auctionHouse,
    tradeStateAddress: new Pda.Pda(account.data.tradeState, account.data.tradeStateBump),
    bookkeeperAddress: account.data.bookkeeper,
    sellerAddress: account.data.seller,
    metadataAddress: account.data.metadata,
    receiptAddress: new Pda.Pda(account.publicKey, account.data.bump),
    purchaseReceiptAddress: account.data.purchaseReceipt,
    // Data.
    price: auctionHouse.isNative ? Amount.lamports(account.data.price) : Amount.amount(account.data.price, auctionHouse.treasuryMint.currency),
    tokens: BigNumber.toBigNumber(account.data.tokenSize),
    createdAt: DateTime.toDateTime(account.data.createdAt),
    canceledAt: DateTime.toOptionDateTime(account.data.canceledAt)
  };
};

exports.assertLazyListing = assertLazyListing;
exports.assertListing = assertListing;
exports.isLazyListing = isLazyListing;
exports.isListing = isListing;
exports.toLazyListing = toLazyListing;
exports.toListing = toListing;
//# sourceMappingURL=Listing.cjs.map
