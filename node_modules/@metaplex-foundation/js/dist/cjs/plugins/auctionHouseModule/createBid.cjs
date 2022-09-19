'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas$2 = require('./pdas.cjs');
var errors = require('./errors.cjs');
var Amount = require('../../types/Amount.cjs');
var pdas = require('../nftModule/pdas.cjs');
var Operation = require('../../types/Operation.cjs');
var PublicKey = require('../../types/PublicKey.cjs');
var pdas$1 = require('../tokenModule/pdas.cjs');
var Signer = require('../../types/Signer.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createBidOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createBidOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const builder = await createBidBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
  }
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
const createBidBuilder = async (metaplex, params) => {
  var _params$tokens, _params$price$basisPo, _params$price, _params$buyer, _params$authority, _params$tokenAccount, _params$printReceipt, _params$bookkeeper;

  // Data.
  const auctionHouse = params.auctionHouse;
  const tokens = (_params$tokens = params.tokens) !== null && _params$tokens !== void 0 ? _params$tokens : Amount.token(1);
  const priceBasisPoint = (_params$price$basisPo = (_params$price = params.price) === null || _params$price === void 0 ? void 0 : _params$price.basisPoints) !== null && _params$price$basisPo !== void 0 ? _params$price$basisPo : 0;
  const price = auctionHouse.isNative ? Amount.lamports(priceBasisPoint) : Amount.amount(priceBasisPoint, auctionHouse.treasuryMint.currency);

  if (auctionHouse.hasAuctioneer && !params.auctioneerAuthority) {
    throw new errors.AuctioneerAuthorityRequiredError();
  } // Accounts.


  const buyer = (_params$buyer = params.buyer) !== null && _params$buyer !== void 0 ? _params$buyer : metaplex.identity();
  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : auctionHouse.authorityAddress;
  const metadata = pdas.findMetadataPda(params.mintAccount);
  const paymentAccount = auctionHouse.isNative ? PublicKey.toPublicKey(buyer) : pdas$1.findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, PublicKey.toPublicKey(buyer));
  const escrowPayment = pdas$2.findAuctionHouseBuyerEscrowPda(auctionHouse.address, PublicKey.toPublicKey(buyer));
  const tokenAccount = (_params$tokenAccount = params.tokenAccount) !== null && _params$tokenAccount !== void 0 ? _params$tokenAccount : params.seller ? pdas$1.findAssociatedTokenAccountPda(params.mintAccount, params.seller) : null;
  const buyerTokenAccount = pdas$1.findAssociatedTokenAccountPda(params.mintAccount, PublicKey.toPublicKey(buyer));
  const buyerTradeState = pdas$2.findAuctionHouseTradeStatePda(auctionHouse.address, PublicKey.toPublicKey(buyer), auctionHouse.treasuryMint.address, params.mintAccount, price.basisPoints, tokens.basisPoints, tokenAccount);
  const accounts = {
    wallet: PublicKey.toPublicKey(buyer),
    paymentAccount,
    transferAuthority: PublicKey.toPublicKey(buyer),
    treasuryMint: auctionHouse.treasuryMint.address,
    metadata,
    escrowPaymentAccount: escrowPayment,
    authority: PublicKey.toPublicKey(authority),
    auctionHouse: auctionHouse.address,
    auctionHouseFeeAccount: auctionHouse.feeAccountAddress,
    buyerTradeState
  }; // Args.

  const args = {
    tradeStateBump: buyerTradeState.bump,
    escrowPaymentBump: escrowPayment.bump,
    buyerPrice: price.basisPoints,
    tokenSize: tokens.basisPoints
  }; // Sell Instruction.

  let buyInstruction;

  if (params.auctioneerAuthority) {
    const ahAuctioneerPda = pdas$2.findAuctioneerPda(auctionHouse.address, params.auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: params.auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    buyInstruction = tokenAccount ? mplAuctionHouse.createAuctioneerBuyInstruction({ ...accountsWithAuctioneer,
      tokenAccount
    }, args) : mplAuctionHouse.createAuctioneerPublicBuyInstruction({ ...accountsWithAuctioneer,
      tokenAccount: buyerTokenAccount
    }, args);
  } else {
    buyInstruction = tokenAccount ? mplAuctionHouse.createBuyInstruction({ ...accounts,
      tokenAccount
    }, args) : mplAuctionHouse.createPublicBuyInstruction({ ...accounts,
      tokenAccount: buyerTokenAccount
    }, args);
  } // Signers.


  const buySigners = [buyer, authority, params.auctioneerAuthority].filter(input => !!input && Signer.isSigner(input)); // Receipt.
  // Since createPrintBidReceiptInstruction can't deserialize createAuctioneerBuyInstruction due to a bug
  // Don't print Auctioneer Bid receipt for the time being.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && !params.auctioneerAuthority;
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const receipt = pdas$2.findBidReceiptPda(buyerTradeState);
  const builder = TransactionBuilder.TransactionBuilder.make().setContext({
    buyerTradeState,
    tokenAccount,
    metadata,
    buyer: PublicKey.toPublicKey(buyer),
    receipt: shouldPrintReceipt ? receipt : null,
    bookkeeper: shouldPrintReceipt ? bookkeeper.publicKey : null,
    price,
    tokens
  }); // Create a TA for public bid if it doesn't exist

  if (!tokenAccount) {
    const account = await metaplex.rpc().getAccount(buyerTokenAccount);

    if (!account.exists) {
      builder.add(await metaplex.tokens().builders().createToken({
        mint: params.mintAccount,
        owner: PublicKey.toPublicKey(buyer)
      }));
    }
  }

  return builder // Create bid.
  .add({
    instruction: buyInstruction,
    signers: buySigners,
    key: 'buy'
  }) // Print the Bid Receipt.
  .when(shouldPrintReceipt, builder => builder.add({
    instruction: mplAuctionHouse.createPrintBidReceiptInstruction({
      receipt,
      bookkeeper: bookkeeper.publicKey,
      instruction: web3_js.SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      receiptBump: receipt.bump
    }),
    signers: [bookkeeper],
    key: 'printBidReceipt'
  }));
};

exports.createBidBuilder = createBidBuilder;
exports.createBidOperation = createBidOperation;
exports.createBidOperationHandler = createBidOperationHandler;
//# sourceMappingURL=createBid.cjs.map
