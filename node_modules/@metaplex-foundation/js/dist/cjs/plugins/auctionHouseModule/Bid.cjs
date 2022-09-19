'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../utils/assert.cjs');
var Amount = require('../../types/Amount.cjs');
var Pda = require('../../types/Pda.cjs');
var BigNumber = require('../../types/BigNumber.cjs');
var DateTime = require('../../types/DateTime.cjs');

const isBid = value => typeof value === 'object' && value.model === 'bid' && !value.lazy;
function assertBid(value) {
  assert["default"](isBid(value), `Expected Bid type`);
}
const toBid = (account, auctionHouse, asset) => {
  const lazyBid = toLazyBid(account, auctionHouse);
  return { ...lazyBid,
    model: 'bid',
    lazy: false,
    ...('token' in asset ? {
      asset,
      tokens: Amount.amount(lazyBid.tokens, asset.mint.currency),
      isPublic: false
    } : {
      asset,
      tokens: Amount.amount(lazyBid.tokens, asset.mint.currency),
      isPublic: true
    })
  };
};
const isLazyBid = value => typeof value === 'object' && value.model === 'bid' && value.lazy;
function assertLazyBid(value) {
  assert["default"](isLazyBid(value), `Expected LazyBid type`);
}
const toLazyBid = (account, auctionHouse) => {
  return {
    model: 'bid',
    lazy: true,
    auctionHouse,
    tradeStateAddress: new Pda.Pda(account.data.tradeState, account.data.tradeStateBump),
    bookkeeperAddress: account.data.bookkeeper,
    buyerAddress: account.data.buyer,
    metadataAddress: account.data.metadata,
    tokenAddress: account.data.tokenAccount,
    receiptAddress: new Pda.Pda(account.publicKey, account.data.bump),
    purchaseReceiptAddress: account.data.purchaseReceipt,
    isPublic: Boolean(account.data.tokenAccount),
    // Data.
    price: auctionHouse.isNative ? Amount.lamports(account.data.price) : Amount.amount(account.data.price, auctionHouse.treasuryMint.currency),
    tokens: BigNumber.toBigNumber(account.data.tokenSize),
    createdAt: DateTime.toDateTime(account.data.createdAt),
    canceledAt: DateTime.toOptionDateTime(account.data.canceledAt)
  };
};

exports.assertBid = assertBid;
exports.assertLazyBid = assertLazyBid;
exports.isBid = isBid;
exports.isLazyBid = isLazyBid;
exports.toBid = toBid;
exports.toLazyBid = toLazyBid;
//# sourceMappingURL=Bid.cjs.map
