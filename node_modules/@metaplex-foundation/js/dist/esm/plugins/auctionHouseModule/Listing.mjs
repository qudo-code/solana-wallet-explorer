import assert from '../../utils/assert.mjs';
import { toDateTime, toOptionDateTime } from '../../types/DateTime.mjs';
import { amount, lamports } from '../../types/Amount.mjs';
import { Pda } from '../../types/Pda.mjs';
import { toBigNumber } from '../../types/BigNumber.mjs';

const isListing = value => typeof value === 'object' && value.model === 'listing' && !value.lazy;
function assertListing(value) {
  assert(isListing(value), `Expected Listing type`);
}
const toListing = (account, auctionHouse, asset) => {
  const lazyListing = toLazyListing(account, auctionHouse);
  return { ...lazyListing,
    model: 'listing',
    lazy: false,
    asset,
    tokens: amount(lazyListing.tokens, asset.mint.currency)
  };
};
const isLazyListing = value => typeof value === 'object' && value.model === 'listing' && value.lazy;
function assertLazyListing(value) {
  assert(isLazyListing(value), `Expected LazyListing type`);
}
const toLazyListing = (account, auctionHouse) => {
  return {
    model: 'listing',
    lazy: true,
    auctionHouse: auctionHouse,
    tradeStateAddress: new Pda(account.data.tradeState, account.data.tradeStateBump),
    bookkeeperAddress: account.data.bookkeeper,
    sellerAddress: account.data.seller,
    metadataAddress: account.data.metadata,
    receiptAddress: new Pda(account.publicKey, account.data.bump),
    purchaseReceiptAddress: account.data.purchaseReceipt,
    // Data.
    price: auctionHouse.isNative ? lamports(account.data.price) : amount(account.data.price, auctionHouse.treasuryMint.currency),
    tokens: toBigNumber(account.data.tokenSize),
    createdAt: toDateTime(account.data.createdAt),
    canceledAt: toOptionDateTime(account.data.canceledAt)
  };
};

export { assertLazyListing, assertListing, isLazyListing, isListing, toLazyListing, toListing };
//# sourceMappingURL=Listing.mjs.map
