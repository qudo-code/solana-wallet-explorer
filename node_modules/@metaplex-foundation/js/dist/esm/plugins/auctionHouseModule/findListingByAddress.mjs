import { toListingReceiptAccount } from './accounts.mjs';
import { toLazyListing } from './Listing.mjs';
import { findListingReceiptPda } from './pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindListingByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findListingByAddressOperation = useOperation(Key);
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
    const receiptAddress = findListingReceiptPda(address);
    const account = toListingReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyListing = toLazyListing(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadListing(lazyListing, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

export { findListingByAddressOperation, findListingByAddressOperationHandler };
//# sourceMappingURL=findListingByAddress.mjs.map
