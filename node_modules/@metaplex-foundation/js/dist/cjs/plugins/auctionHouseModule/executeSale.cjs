'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas$1 = require('./pdas.cjs');
var errors = require('./errors.cjs');
var Operation = require('../../types/Operation.cjs');
var Amount = require('../../types/Amount.cjs');
var pdas = require('../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');
var Signer = require('../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'ExecuteSaleOperation';
/**
 * @group Operations
 * @category Constructors
 */

const executeSaleOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const executeSaleOperationHandler = {
  handle: async (operation, metaplex) => executeSaleBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions)
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
const executeSaleBuilder = (metaplex, params) => {
  var _params$printReceipt, _params$bookkeeper, _params$instructionKe;

  const {
    auctionHouse,
    listing,
    bid,
    auctioneerAuthority
  } = params;
  const {
    sellerAddress,
    asset
  } = listing;
  const {
    buyerAddress,
    tokens
  } = bid;

  if (!listing.auctionHouse.address.equals(bid.auctionHouse.address)) {
    throw new errors.BidAndListingHaveDifferentAuctionHousesError();
  }

  if (!listing.asset.address.equals(bid.asset.address)) {
    throw new errors.BidAndListingHaveDifferentMintsError();
  }

  if (bid.canceledAt) {
    throw new errors.CanceledBidIsNotAllowedError();
  }

  if (listing.canceledAt) {
    throw new errors.CanceledListingIsNotAllowedError();
  }

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Data.


  const price = auctionHouse.isNative ? Amount.lamports(bid.price.basisPoints) : Amount.amount(bid.price.basisPoints, auctionHouse.treasuryMint.currency); // Accounts.

  const sellerPaymentReceiptAccount = auctionHouse.isNative ? sellerAddress : pdas.findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, sellerAddress);
  const buyerReceiptTokenAccount = pdas.findAssociatedTokenAccountPda(asset.address, buyerAddress);
  const escrowPayment = pdas$1.findAuctionHouseBuyerEscrowPda(auctionHouse.address, buyerAddress);
  const freeTradeState = pdas$1.findAuctionHouseTradeStatePda(auctionHouse.address, sellerAddress, auctionHouse.treasuryMint.address, asset.address, Amount.lamports(0).basisPoints, tokens.basisPoints, asset.token.address);
  const programAsSigner = pdas$1.findAuctionHouseProgramAsSignerPda();
  const accounts = {
    buyer: buyerAddress,
    seller: sellerAddress,
    tokenAccount: asset.token.address,
    tokenMint: asset.address,
    metadata: asset.metadataAddress,
    treasuryMint: auctionHouse.treasuryMint.address,
    escrowPaymentAccount: escrowPayment,
    sellerPaymentReceiptAccount,
    buyerReceiptTokenAccount,
    authority: auctionHouse.authorityAddress,
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress,
    auctionHouseTreasury: auctionHouse.treasuryAccountAddress,
    buyerTradeState: bid.tradeStateAddress,
    sellerTradeState: listing.tradeStateAddress,
    freeTradeState,
    programAsSigner
  }; // Args.

  const args = {
    freeTradeStateBump: freeTradeState.bump,
    escrowPaymentBump: escrowPayment.bump,
    programAsSignerBump: programAsSigner.bump,
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Execute Sale Instruction

  let executeSaleInstruction = mplAuctionHouse.createExecuteSaleInstruction(accounts, args);

  if (auctioneerAuthority) {
    executeSaleInstruction = mplAuctionHouse.createAuctioneerExecuteSaleInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Provide additional keys to pay royalties.


  asset.creators.forEach(({
    address
  }) => {
    executeSaleInstruction.keys.push({
      pubkey: address,
      isWritable: true,
      isSigner: false
    }); // Provide ATA to receive SPL token royalty if is not native SOL sale.

    if (!auctionHouse.isNative) {
      executeSaleInstruction.keys.push({
        pubkey: pdas.findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, address),
        isWritable: true,
        isSigner: false
      });
    }
  }); // Signers.

  const executeSaleSigners = [auctioneerAuthority].filter(Signer.isSigner); // Receipt.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && Boolean(listing.receiptAddress && bid.receiptAddress);
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const purchaseReceipt = pdas$1.findPurchaseReceiptPda(listing.tradeStateAddress, bid.tradeStateAddress);
  return TransactionBuilder.TransactionBuilder.make().setContext({
    sellerTradeState: listing.tradeStateAddress,
    buyerTradeState: bid.tradeStateAddress,
    buyer: buyerAddress,
    seller: sellerAddress,
    metadata: asset.metadataAddress,
    bookkeeper: shouldPrintReceipt ? bookkeeper.publicKey : null,
    receipt: shouldPrintReceipt ? purchaseReceipt : null,
    price,
    tokens
  }) // Execute Sale.
  .add({
    instruction: executeSaleInstruction,
    signers: executeSaleSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'executeSale'
  }) // Print the Purchase Receipt.
  .when(shouldPrintReceipt, builder => builder.add({
    instruction: mplAuctionHouse.createPrintPurchaseReceiptInstruction({
      purchaseReceipt: purchaseReceipt,
      listingReceipt: listing.receiptAddress,
      bidReceipt: bid.receiptAddress,
      bookkeeper: bookkeeper.publicKey,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      purchaseReceiptBump: purchaseReceipt.bump
    }),
    signers: [bookkeeper],
    key: 'printPurchaseReceipt'
  }));
};

exports.executeSaleBuilder = executeSaleBuilder;
exports.executeSaleOperation = executeSaleOperation;
exports.executeSaleOperationHandler = executeSaleOperationHandler;
//# sourceMappingURL=executeSale.cjs.map
