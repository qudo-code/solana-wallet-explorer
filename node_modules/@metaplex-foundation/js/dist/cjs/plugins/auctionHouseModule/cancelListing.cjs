'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var errors = require('./errors.cjs');
var pdas = require('./pdas.cjs');
var constants = require('./constants.cjs');
var Operation = require('../../types/Operation.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');
var Signer = require('../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'CancelListingOperation';
/**
 * @group Operations
 * @category Constructors
 */

const cancelListingOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const cancelListingOperationHandler = {
  handle: async (operation, metaplex) => cancelListingBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * @group Transaction Builders
 * @category Constructors
 */
const cancelListingBuilder = params => {
  var _params$instructionKe;

  const {
    auctionHouse,
    auctioneerAuthority,
    listing
  } = params;

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Data.


  const {
    asset,
    tradeStateAddress,
    price,
    tokens
  } = listing;
  const buyerPrice = auctionHouse.hasAuctioneer ? constants.AUCTIONEER_PRICE : price.basisPoints;
  const accounts = {
    wallet: listing.sellerAddress,
    tokenAccount: asset.token.address,
    tokenMint: asset.address,
    authority: auctionHouse.authorityAddress,
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress,
    tradeState: tradeStateAddress
  }; // Args.

  const args = {
    buyerPrice,
    tokenSize: tokens.basisPoints
  }; // Cancel Listing Instruction.

  let cancelListingInstruction = mplAuctionHouse.createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelListingInstruction = mplAuctionHouse.createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(Signer.isSigner);
  return TransactionBuilder.TransactionBuilder.make() // Cancel Listing.
  .add({
    instruction: cancelListingInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelListing'
  }) // Cancel Listing Receipt.
  .when(Boolean(listing.receiptAddress), builder => builder.add({
    instruction: mplAuctionHouse.createCancelListingReceiptInstruction({
      receipt: listing.receiptAddress,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelListingReceipt'
  }));
};

exports.cancelListingBuilder = cancelListingBuilder;
exports.cancelListingOperation = cancelListingOperation;
exports.cancelListingOperationHandler = cancelListingOperationHandler;
//# sourceMappingURL=cancelListing.cjs.map
