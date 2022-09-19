import { toPurchaseReceiptAccount } from './accounts.mjs';
import { toLazyPurchase } from './Purchase.mjs';
import { findPurchaseReceiptPda } from './pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindPurchaseByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findPurchaseByAddressOperation = useOperation(Key);
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
    const receiptAddress = findPurchaseReceiptPda(sellerTradeState, buyerTradeState);
    const account = toPurchaseReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyPurchase = toLazyPurchase(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadPurchase(lazyPurchase, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

export { findPurchaseByAddressOperation, findPurchaseByAddressOperationHandler };
//# sourceMappingURL=findPurchaseByAddress.mjs.map
