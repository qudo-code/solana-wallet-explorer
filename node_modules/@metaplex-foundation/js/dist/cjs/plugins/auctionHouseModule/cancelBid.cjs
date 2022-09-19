'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var errors = require('./errors.cjs');
var pdas$1 = require('./pdas.cjs');
var Operation = require('../../types/Operation.cjs');
var pdas = require('../tokenModule/pdas.cjs');
var PublicKey = require('../../types/PublicKey.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');
var Signer = require('../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'CancelBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const cancelBidOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const cancelBidOperationHandler = {
  handle: async (operation, metaplex) => cancelBidBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
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
const cancelBidBuilder = params => {
  var _params$instructionKe;

  const {
    auctionHouse,
    auctioneerAuthority,
    bid
  } = params;

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Data.


  const {
    asset,
    tradeStateAddress,
    price,
    tokens,
    isPublic
  } = bid; // Accounts.

  const tokenAccount = isPublic ? pdas.findAssociatedTokenAccountPda(asset.mint.address, PublicKey.toPublicKey(bid.buyerAddress)) : bid.asset.token.address;
  const accounts = {
    wallet: bid.buyerAddress,
    tokenAccount,
    tokenMint: asset.address,
    authority: auctionHouse.authorityAddress,
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress,
    tradeState: tradeStateAddress
  }; // Args.

  const args = {
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Cancel Bid Instruction.

  let cancelBidInstruction = mplAuctionHouse.createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelBidInstruction = mplAuctionHouse.createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(Signer.isSigner);
  return TransactionBuilder.TransactionBuilder.make() // Cancel Bid.
  .add({
    instruction: cancelBidInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelBid'
  }) // Cancel Bid Receipt.
  .when(Boolean(bid.receiptAddress), builder => builder.add({
    instruction: mplAuctionHouse.createCancelBidReceiptInstruction({
      receipt: bid.receiptAddress,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelBidReceipt'
  }));
};

exports.cancelBidBuilder = cancelBidBuilder;
exports.cancelBidOperation = cancelBidOperation;
exports.cancelBidOperationHandler = cancelBidOperationHandler;
//# sourceMappingURL=cancelBid.cjs.map
