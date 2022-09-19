import { cusper } from '@metaplex-foundation/mpl-auction-house';
import { AuctionsClient } from './AuctionsClient.mjs';
import { AuctionHouseProgram } from './program.mjs';
import { cancelBidOperation, cancelBidOperationHandler } from './cancelBid.mjs';
import { cancelListingOperation, cancelListingOperationHandler } from './cancelListing.mjs';
import { createAuctionHouseOperation, createAuctionHouseOperationHandler } from './createAuctionHouse.mjs';
import { createBidOperation, createBidOperationHandler } from './createBid.mjs';
import { createListingOperation, createListingOperationHandler } from './createListing.mjs';
import { executeSaleOperation, executeSaleOperationHandler } from './executeSale.mjs';
import { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler } from './findAuctionHouseByAddress.mjs';
import { findBidByReceiptOperation, findBidByReceiptOperationHandler } from './findBidByReceipt.mjs';
import { findBidByTradeStateOperation, findBidByTradeStateOperationHandler } from './findBidByTradeState.mjs';
import { findListingByAddressOperation, findListingByAddressOperationHandler } from './findListingByAddress.mjs';
import { findPurchaseByAddressOperation, findPurchaseByAddressOperationHandler } from './findPurchaseByAddress.mjs';
import { updateAuctionHouseOperation, updateAuctionHouseOperationHandler } from './updateAuctionHouse.mjs';
import { loadBidOperation, loadBidOperationHandler } from './loadBid.mjs';
import { loadListingOperation, loadListingOperationHandler } from './loadListing.mjs';
import { loadPurchaseOperation, loadPurchaseOperationHandler } from './loadPurchase.mjs';

/** @group Plugins */

const auctionHouseModule = () => ({
  install(metaplex) {
    // Auction House Program.
    metaplex.programs().register({
      name: 'AuctionHouseProgram',
      address: AuctionHouseProgram.publicKey,
      errorResolver: error => cusper.errorFromProgramLogs(error.logs, false)
    });
    const op = metaplex.operations();
    op.register(cancelBidOperation, cancelBidOperationHandler);
    op.register(cancelListingOperation, cancelListingOperationHandler);
    op.register(createAuctionHouseOperation, createAuctionHouseOperationHandler);
    op.register(createBidOperation, createBidOperationHandler);
    op.register(createListingOperation, createListingOperationHandler);
    op.register(executeSaleOperation, executeSaleOperationHandler);
    op.register(findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler);
    op.register(findBidByReceiptOperation, findBidByReceiptOperationHandler);
    op.register(findBidByTradeStateOperation, findBidByTradeStateOperationHandler);
    op.register(findListingByAddressOperation, findListingByAddressOperationHandler);
    op.register(findPurchaseByAddressOperation, findPurchaseByAddressOperationHandler);
    op.register(loadBidOperation, loadBidOperationHandler);
    op.register(loadListingOperation, loadListingOperationHandler);
    op.register(loadPurchaseOperation, loadPurchaseOperationHandler);
    op.register(updateAuctionHouseOperation, updateAuctionHouseOperationHandler);

    metaplex.auctions = function () {
      return new AuctionsClient(this);
    };
  }

});

export { auctionHouseModule };
//# sourceMappingURL=plugin.mjs.map
