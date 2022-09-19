import { SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { createCancelInstruction, createAuctioneerCancelInstruction, createCancelBidReceiptInstruction } from '@metaplex-foundation/mpl-auction-house';
import { AuctioneerAuthorityRequiredError } from './errors.mjs';
import { findAuctioneerPda } from './pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { findAssociatedTokenAccountPda } from '../tokenModule/pdas.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../types/Signer.mjs';

// Operation
// -----------------

const Key = 'CancelBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const cancelBidOperation = useOperation(Key);
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
    throw new AuctioneerAuthorityRequiredError();
  } // Data.


  const {
    asset,
    tradeStateAddress,
    price,
    tokens,
    isPublic
  } = bid; // Accounts.

  const tokenAccount = isPublic ? findAssociatedTokenAccountPda(asset.mint.address, toPublicKey(bid.buyerAddress)) : bid.asset.token.address;
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

  let cancelBidInstruction = createCancelInstruction(accounts, args);

  if (auctioneerAuthority) {
    cancelBidInstruction = createAuctioneerCancelInstruction({ ...accounts,
      auctioneerAuthority: auctioneerAuthority.publicKey,
      ahAuctioneerPda: findAuctioneerPda(auctionHouse.address, auctioneerAuthority.publicKey)
    }, args);
  } // Signers.


  const cancelSigners = [auctioneerAuthority].filter(isSigner);
  return TransactionBuilder.make() // Cancel Bid.
  .add({
    instruction: cancelBidInstruction,
    signers: cancelSigners,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'cancelBid'
  }) // Cancel Bid Receipt.
  .when(Boolean(bid.receiptAddress), builder => builder.add({
    instruction: createCancelBidReceiptInstruction({
      receipt: bid.receiptAddress,
      instruction: SYSVAR_INSTRUCTIONS_PUBKEY
    }),
    signers: [],
    key: 'cancelBidReceipt'
  }));
};

export { cancelBidBuilder, cancelBidOperation, cancelBidOperationHandler };
//# sourceMappingURL=cancelBid.mjs.map
