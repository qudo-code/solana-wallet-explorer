import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createAuctioneerBuyInstruction, createAuctioneerPublicBuyInstruction, createBuyInstruction, createPublicBuyInstruction, createPrintBidReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHouseBuyerEscrowPda, findAuctionHouseTradeStatePda, findAuctioneerPda, findBidReceiptPda } from './pdas.mjs';
import { AuctioneerAuthorityRequiredError } from './errors.mjs';
import { token, lamports, amount } from '../../types/Amount.mjs';
import { findMetadataPda } from '../nftModule/pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';
import { findAssociatedTokenAccountPda } from '../tokenModule/pdas.mjs';
import { isSigner } from '../../types/Signer.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'CreateBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createBidOperation = useOperation(Key);
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
  const tokens = (_params$tokens = params.tokens) !== null && _params$tokens !== void 0 ? _params$tokens : token(1);
  const priceBasisPoint = (_params$price$basisPo = (_params$price = params.price) === null || _params$price === void 0 ? void 0 : _params$price.basisPoints) !== null && _params$price$basisPo !== void 0 ? _params$price$basisPo : 0;
  const price = auctionHouse.isNative ? lamports(priceBasisPoint) : amount(priceBasisPoint, auctionHouse.treasuryMint.currency);

  if (auctionHouse.hasAuctioneer && !params.auctioneerAuthority) {
    throw new AuctioneerAuthorityRequiredError();
  } // Accounts.


  const buyer = (_params$buyer = params.buyer) !== null && _params$buyer !== void 0 ? _params$buyer : metaplex.identity();
  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : auctionHouse.authorityAddress;
  const metadata = findMetadataPda(params.mintAccount);
  const paymentAccount = auctionHouse.isNative ? toPublicKey(buyer) : findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, toPublicKey(buyer));
  const escrowPayment = findAuctionHouseBuyerEscrowPda(auctionHouse.address, toPublicKey(buyer));
  const tokenAccount = (_params$tokenAccount = params.tokenAccount) !== null && _params$tokenAccount !== void 0 ? _params$tokenAccount : params.seller ? findAssociatedTokenAccountPda(params.mintAccount, params.seller) : null;
  const buyerTokenAccount = findAssociatedTokenAccountPda(params.mintAccount, toPublicKey(buyer));
  const buyerTradeState = findAuctionHouseTradeStatePda(auctionHouse.address, toPublicKey(buyer), auctionHouse.treasuryMint.address, params.mintAccount, price.basisPoints, tokens.basisPoints, tokenAccount);
  const accounts = {
    wallet: toPublicKey(buyer),
    paymentAccount,
    transferAuthority: toPublicKey(buyer),
    treasuryMint: auctionHouse.treasuryMint.address,
    metadata,
    escrowPaymentAccount: escrowPayment,
    authority: toPublicKey(authority),
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
    const ahAuctioneerPda = findAuctioneerPda(auctionHouse.address, params.auctioneerAuthority.publicKey);
    const accountsWithAuctioneer = { ...accounts,
      auctioneerAuthority: params.auctioneerAuthority.publicKey,
      ahAuctioneerPda
    };
    buyInstruction = tokenAccount ? createAuctioneerBuyInstruction({ ...accountsWithAuctioneer,
      tokenAccount
    }, args) : createAuctioneerPublicBuyInstruction({ ...accountsWithAuctioneer,
      tokenAccount: buyerTokenAccount
    }, args);
  } else {
    buyInstruction = tokenAccount ? createBuyInstruction({ ...accounts,
      tokenAccount
    }, args) : createPublicBuyInstruction({ ...accounts,
      tokenAccount: buyerTokenAccount
    }, args);
  } // Signers.


  const buySigners = [buyer, authority, params.auctioneerAuthority].filter(input => !!input && isSigner(input)); // Receipt.
  // Since createPrintBidReceiptInstruction can't deserialize createAuctioneerBuyInstruction due to a bug
  // Don't print Auctioneer Bid receipt for the time being.

  const shouldPrintReceipt = ((_params$printReceipt = params.printReceipt) !== null && _params$printReceipt !== void 0 ? _params$printReceipt : true) && !params.auctioneerAuthority;
  const bookkeeper = (_params$bookkeeper = params.bookkeeper) !== null && _params$bookkeeper !== void 0 ? _params$bookkeeper : metaplex.identity();
  const receipt = findBidReceiptPda(buyerTradeState);
  const builder = TransactionBuilder.make().setContext({
    buyerTradeState,
    tokenAccount,
    metadata,
    buyer: toPublicKey(buyer),
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
        owner: toPublicKey(buyer)
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
    instruction: createPrintBidReceiptInstruction({
      receipt,
      bookkeeper: bookkeeper.publicKey,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }, {
      receiptBump: receipt.bump
    }),
    signers: [bookkeeper],
    key: 'printBidReceipt'
  }));
};

export { createBidBuilder, createBidOperation, createBidOperationHandler };
//# sourceMappingURL=createBid.mjs.map
