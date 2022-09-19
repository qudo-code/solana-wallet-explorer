import { toLazyBid } from './Bid.mjs';
import { toBidReceiptAccount } from './accounts.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindBidByReceiptOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findBidByReceiptOperation = useOperation(Key);
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
    const account = toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = toLazyBid(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadBid(lazyBid, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

export { findBidByReceiptOperation, findBidByReceiptOperationHandler };
//# sourceMappingURL=findBidByReceipt.mjs.map
