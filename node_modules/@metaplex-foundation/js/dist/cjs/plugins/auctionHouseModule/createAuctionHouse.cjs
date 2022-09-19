'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var pdas = require('./pdas.cjs');
var constants$1 = require('./constants.cjs');
var constants = require('../tokenModule/constants.cjs');
var pdas$1 = require('../tokenModule/pdas.cjs');
var Operation = require('../../types/Operation.cjs');
var Signer = require('../../types/Signer.cjs');
var SdkError = require('../../errors/SdkError.cjs');
var PublicKey = require('../../types/PublicKey.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateAuctionHouseOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createAuctionHouseOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createAuctionHouseOperationHandler = {
  handle: async (operation, metaplex) => {
    return createAuctionHouseBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const createAuctionHouseBuilder = (metaplex, params) => {
  var _params$canChangeSale, _params$requiresSignO, _params$authority, _params$payer, _params$treasuryMint, _params$treasuryWithd, _params$feeWithdrawal, _params$instructionKe;

  // Data.
  const canChangeSalePrice = (_params$canChangeSale = params.canChangeSalePrice) !== null && _params$canChangeSale !== void 0 ? _params$canChangeSale : false;
  const requiresSignOff = (_params$requiresSignO = params.requiresSignOff) !== null && _params$requiresSignO !== void 0 ? _params$requiresSignO : canChangeSalePrice; // Accounts.

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity();
  const payer = (_params$payer = params.payer) !== null && _params$payer !== void 0 ? _params$payer : metaplex.identity();
  const treasuryMint = (_params$treasuryMint = params.treasuryMint) !== null && _params$treasuryMint !== void 0 ? _params$treasuryMint : constants.WRAPPED_SOL_MINT;
  const treasuryWithdrawalDestinationOwner = (_params$treasuryWithd = params.treasuryWithdrawalDestinationOwner) !== null && _params$treasuryWithd !== void 0 ? _params$treasuryWithd : metaplex.identity().publicKey;
  const feeWithdrawalDestination = (_params$feeWithdrawal = params.feeWithdrawalDestination) !== null && _params$feeWithdrawal !== void 0 ? _params$feeWithdrawal : metaplex.identity().publicKey; // Auctioneer delegate instruction needs to be signed by authority

  if (params.auctioneerAuthority && !Signer.isSigner(authority)) {
    throw new SdkError.ExpectedSignerError('authority', 'PublicKey', {
      problemSuffix: 'You are trying to delegate to an Auctioneer authority which ' + 'requires the Auction House authority to sign a transaction. ' + 'But you provided the Auction House authority as a Public Key.'
    });
  } // PDAs.


  const auctionHouse = pdas.findAuctionHousePda(PublicKey.toPublicKey(authority), treasuryMint);
  const auctionHouseFeeAccount = pdas.findAuctionHouseFeePda(auctionHouse);
  const auctionHouseTreasury = pdas.findAuctionHouseTreasuryPda(auctionHouse);
  const treasuryWithdrawalDestination = treasuryMint.equals(constants.WRAPPED_SOL_MINT) ? treasuryWithdrawalDestinationOwner : pdas$1.findAssociatedTokenAccountPda(treasuryMint, treasuryWithdrawalDestinationOwner);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    auctionHouseAddress: auctionHouse,
    auctionHouseFeeAccountAddress: auctionHouseFeeAccount,
    auctionHouseTreasuryAddress: auctionHouseTreasury,
    treasuryWithdrawalDestinationAddress: treasuryWithdrawalDestination
  }) // Create and initialize the Auction House account.
  .add({
    instruction: mplAuctionHouse.createCreateAuctionHouseInstruction({
      treasuryMint,
      payer: payer.publicKey,
      authority: PublicKey.toPublicKey(authority),
      feeWithdrawalDestination,
      treasuryWithdrawalDestination,
      treasuryWithdrawalDestinationOwner,
      auctionHouse,
      auctionHouseFeeAccount,
      auctionHouseTreasury
    }, {
      bump: auctionHouse.bump,
      feePayerBump: auctionHouseFeeAccount.bump,
      treasuryBump: auctionHouseTreasury.bump,
      sellerFeeBasisPoints: params.sellerFeeBasisPoints,
      requiresSignOff,
      canChangeSalePrice
    }),
    signers: [payer],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'createAuctionHouse'
  }) // Delegate to the Auctioneer authority when provided.
  .when(Boolean(params.auctioneerAuthority), builder => {
    var _params$auctioneerSco, _params$delegateAucti;

    const auctioneerAuthority = params.auctioneerAuthority;
    return builder.add({
      instruction: mplAuctionHouse.createDelegateAuctioneerInstruction({
        auctionHouse,
        authority: PublicKey.toPublicKey(authority),
        auctioneerAuthority,
        ahAuctioneerPda: pdas.findAuctioneerPda(auctionHouse, auctioneerAuthority)
      }, {
        scopes: (_params$auctioneerSco = params.auctioneerScopes) !== null && _params$auctioneerSco !== void 0 ? _params$auctioneerSco : constants$1.AUCTIONEER_ALL_SCOPES
      }),
      signers: [authority],
      key: (_params$delegateAucti = params.delegateAuctioneerInstructionKey) !== null && _params$delegateAucti !== void 0 ? _params$delegateAucti : 'delegateAuctioneer'
    });
  });
};

exports.createAuctionHouseBuilder = createAuctionHouseBuilder;
exports.createAuctionHouseOperation = createAuctionHouseOperation;
exports.createAuctionHouseOperationHandler = createAuctionHouseOperationHandler;
//# sourceMappingURL=createAuctionHouse.cjs.map
