import { findBidReceiptPda } from './pdas.mjs';
import { toLazyBid } from './Bid.mjs';
import { toBidReceiptAccount } from './accounts.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindBidByTradeStateOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findBidByTradeStateOperation = useOperation(Key);
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
    const receiptAddress = findBidReceiptPda(tradeStateAddress);
    const account = toBidReceiptAccount(await metaplex.rpc().getAccount(receiptAddress, commitment));
    scope.throwIfCanceled();
    const lazyBid = toLazyBid(account, auctionHouse);
    return metaplex.auctions().for(auctionHouse).loadBid(lazyBid, {
      loadJsonMetadata,
      commitment
    }).run(scope);
  }
};

export { findBidByTradeStateOperation, findBidByTradeStateOperationHandler };
//# sourceMappingURL=findBidByTradeState.mjs.map
