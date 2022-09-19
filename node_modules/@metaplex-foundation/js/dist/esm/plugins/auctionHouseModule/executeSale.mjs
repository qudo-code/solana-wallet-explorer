import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createExecuteSaleInstruction, createAuctioneerExecuteSaleInstruction, createPrintPurchaseReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseBuyerEscrowPda, findAuctionHouseTradeStatePda, findAuctionHouseProgramAsSignerPda, findAuctioneerPda, findPurchaseReceiptPda } from './pdas.mjs';
import { BidAndListingHaveDifferentAuctionHousesError, BidAndListingHaveDifferentMintsError, CanceledBidIsNotAllowedError, CanceledListingIsNotAllowedError, AuctioneerAuthorityRequiredError } from './errors.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { lamports, amount } from '../../types/Amount.mjs';
import { findAssociatedTokenAccountPda } from '../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../types/Signer.mjs';

// Operation
// -----------------

const Key = 'ExecuteSaleOperation';
/**
 * @group Operations
 * @category Constructors
 */

const executeSaleOperation = useOperation(Key);
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
    throw new BidAndListingHaveDifferentAuctionHousesError();
  }

  if (!listing.asset.address.equals(bid.asset.address)) {
    throw new BidAndListingHaveDifferentMintsError();
  }

  if (bid.canceledAt) {
    throw new CanceledBidIsNotAllowedError();
  }

  if (listing.canceledAt) {
    throw new CanceledListingIsNotAllowedError();
  }

  if (auctionHouse.hasAuctioneer && !auctioneerAuthority) {
    throw new AuctioneerAuthorityRequiredError();
  } // Data.


  const price = auctionHouse.isNative ? lamports(bid.price.basisPoints) : amount(bid.price.basisPoints, auctionHouse.treasuryMint.currency); // Accounts.

  const sellerPaymentReceiptAccount = auctionHouse.isNative ? sellerAddress : findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, sellerAddress);
  const buyerReceiptTokenAccount = findAssociatedTokenAccountPda(asset.address, buyerAddress);
  const escrowPayment = findAuctionHouseBuyerEscrowPda(auctionHouse.address, buyerAddress);
  const freeTradeState = findAuctionHouseTradeStatePda(auctionHouse.address, sellerAddress, auctionHouse.treasuryMint.address, asset.address, lamports(0).basisPoints, tokens.basisPoints, asset.token.address);
  const programAsSigner = findAuctionHouseProgramAsSignerPda();
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

  let executeSaleInstruction = createExecuteSaleInstruction(accounts, args);

  if (auctioneerAuthority) {
    executeSaleInstruction = createAuctioneerExecuteSaleInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
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
        pubkey: findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, address),
        isWritable: true,
        isSigner: false
      });
    }
  }); // Signers.

  const executeSaleSigners = [auctioneerAuthority].filter(isSigner); // Receipt.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && Boolean(listing.receiptAddress && bid.receiptAddress);
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const purchaseReceipt = findPurchaseReceiptPda(listing.tradeStateAddress, bid.tradeStateAddress);
  return TransactionBuilder.make().setContext({
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
    instruction: createPrintPurchaseReceiptInstruction({
      purchaseReceipt: purchaseReceipt,
      listingReceipt: listing.receiptAddress,
      bidReceipt: bid.receiptAddress,
      bookkeeper: bookkeeper.publicKey,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      purchaseReceiptBump: purchaseReceipt.bump
    }),
    signers: [bookkeeper],
    key: 'printPurchaseReceipt'
  }));
};

export { executeSaleBuilder, executeSaleOperation, executeSaleOperationHandler };
//# sourceMappingURL=executeSale.mjs.map
