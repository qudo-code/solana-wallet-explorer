'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplAuctionHouse = require('@metaplex-foundation/mpl-auction-house');
var isEqual = require('lodash.isequal');
var AuctionHouse = require('./AuctionHouse.cjs');
var errors = require('./errors.cjs');
var pdas$1 = require('./pdas.cjs');
var constants = require('./constants.cjs');
var Operation = require('../../types/Operation.cjs');
var SdkError = require('../../errors/SdkError.cjs');
var pdas = require('../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../utils/TransactionBuilder.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

// Operation
// -----------------

const Key = 'UpdateAuctionHouseOperation';
/**
 * @group Operations
 * @category Constructors
 */

const updateAuctionHouseOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const updateAuctionHouseOperationHandler = {
  handle: (operation, metaplex) => {
    const builder = updateAuctionHouseBuilder(metaplex, operation.input);

    if (builder.isEmpty()) {
      throw new SdkError.NoInstructionsToSendError(Key);
    }

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
const updateAuctionHouseBuilder = (metaplex, params) => {
  var _params$authority, _params$payer, _params$newAuthority, _params$feeWithdrawal, _params$sellerFeeBasi, _params$requiresSignO, _params$canChangeSale;

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity();
  const payer = (_params$payer = params.payer) !== null && _params$payer !== void 0 ? _params$payer : metaplex.identity();
  const auctionHouse = params.auctionHouse;
  let treasuryWithdrawalDestinationOwner;
  let treasuryWithdrawalDestination;

  if (auctionHouse.isNative) {
    var _params$treasuryWithd;

    treasuryWithdrawalDestinationOwner = (_params$treasuryWithd = params.treasuryWithdrawalDestinationOwner) !== null && _params$treasuryWithd !== void 0 ? _params$treasuryWithd : auctionHouse.treasuryWithdrawalDestinationAddress;
    treasuryWithdrawalDestination = treasuryWithdrawalDestinationOwner;
  } else if (params.treasuryWithdrawalDestinationOwner) {
    treasuryWithdrawalDestinationOwner = params.treasuryWithdrawalDestinationOwner;
    treasuryWithdrawalDestination = pdas.findAssociatedTokenAccountPda(auctionHouse.treasuryMint.address, treasuryWithdrawalDestinationOwner);
  } else {
    throw new errors.TreasuryDestinationOwnerRequiredError();
  }

  const originalData = {
    authority: auctionHouse.authorityAddress,
    feeWithdrawalDestination: auctionHouse.feeWithdrawalDestinationAddress,
    treasuryWithdrawalDestination: auctionHouse.treasuryWithdrawalDestinationAddress,
    sellerFeeBasisPoints: auctionHouse.sellerFeeBasisPoints,
    requiresSignOff: auctionHouse.requiresSignOff,
    canChangeSalePrice: auctionHouse.canChangeSalePrice
  };
  const updatedData = {
    authority: (_params$newAuthority = params.newAuthority) !== null && _params$newAuthority !== void 0 ? _params$newAuthority : originalData.authority,
    feeWithdrawalDestination: (_params$feeWithdrawal = params.feeWithdrawalDestination) !== null && _params$feeWithdrawal !== void 0 ? _params$feeWithdrawal : originalData.feeWithdrawalDestination,
    treasuryWithdrawalDestination,
    sellerFeeBasisPoints: (_params$sellerFeeBasi = params.sellerFeeBasisPoints) !== null && _params$sellerFeeBasi !== void 0 ? _params$sellerFeeBasi : originalData.sellerFeeBasisPoints,
    requiresSignOff: (_params$requiresSignO = params.requiresSignOff) !== null && _params$requiresSignO !== void 0 ? _params$requiresSignO : originalData.requiresSignOff,
    canChangeSalePrice: (_params$canChangeSale = params.canChangeSalePrice) !== null && _params$canChangeSale !== void 0 ? _params$canChangeSale : originalData.canChangeSalePrice
  };
  const shouldSendUpdateInstruction = !isEqual__default["default"](originalData, updatedData);
  const shouldAddAuctioneerAuthority = !auctionHouse.hasAuctioneer && !!params.auctioneerAuthority;
  const shouldUpdateAuctioneerAuthority = auctionHouse.hasAuctioneer && !!params.auctioneerAuthority && !params.auctioneerAuthority.equals(auctionHouse.auctioneer.authority);
  const shouldUpdateAuctioneerScopes = auctionHouse.hasAuctioneer && !!params.auctioneerScopes && !isEqual__default["default"](params.auctioneerScopes.sort(), auctionHouse.auctioneer.scopes.sort());
  const shouldDelegateAuctioneer = shouldAddAuctioneerAuthority || shouldUpdateAuctioneerAuthority;
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Update the Auction House data.
  .when(shouldSendUpdateInstruction, builder => {
    var _params$sellerFeeBasi2, _params$requiresSignO2, _params$canChangeSale2, _params$instructionKe;

    return builder.add({
      instruction: mplAuctionHouse.createUpdateAuctionHouseInstruction({
        treasuryMint: auctionHouse.treasuryMint.address,
        payer: payer.publicKey,
        authority: authority.publicKey,
        newAuthority: updatedData.authority,
        feeWithdrawalDestination: updatedData.feeWithdrawalDestination,
        treasuryWithdrawalDestination,
        treasuryWithdrawalDestinationOwner,
        auctionHouse: auctionHouse.address
      }, {
        sellerFeeBasisPoints: (_params$sellerFeeBasi2 = params.sellerFeeBasisPoints) !== null && _params$sellerFeeBasi2 !== void 0 ? _params$sellerFeeBasi2 : null,
        requiresSignOff: (_params$requiresSignO2 = params.requiresSignOff) !== null && _params$requiresSignO2 !== void 0 ? _params$requiresSignO2 : null,
        canChangeSalePrice: (_params$canChangeSale2 = params.canChangeSalePrice) !== null && _params$canChangeSale2 !== void 0 ? _params$canChangeSale2 : null
      }),
      signers: [payer, authority],
      key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'updateAuctionHouse'
    });
  }) // Attach or update a new Auctioneer instance to the Auction House.
  .when(shouldDelegateAuctioneer, builder => {
    var _params$auctioneerSco, _params$delegateAucti;

    const auctioneerAuthority = params.auctioneerAuthority;
    const defaultScopes = auctionHouse.hasAuctioneer ? auctionHouse.auctioneer.scopes : constants.AUCTIONEER_ALL_SCOPES;
    return builder.add({
      instruction: mplAuctionHouse.createDelegateAuctioneerInstruction({
        auctionHouse: auctionHouse.address,
        authority: authority.publicKey,
        auctioneerAuthority,
        ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouse.address, auctioneerAuthority)
      }, {
        scopes: (_params$auctioneerSco = params.auctioneerScopes) !== null && _params$auctioneerSco !== void 0 ? _params$auctioneerSco : defaultScopes
      }),
      signers: [authority],
      key: (_params$delegateAucti = params.delegateAuctioneerInstructionKey) !== null && _params$delegateAucti !== void 0 ? _params$delegateAucti : 'delegateAuctioneer'
    });
  }) // Update the Auctioneer scopes of the Auction House.
  .when(shouldUpdateAuctioneerScopes, builder => {
    var _params$auctioneerAut, _params$auctioneerSco2, _params$updateAuction;

    AuctionHouse.assertAuctioneerAuctionHouse(auctionHouse);
    const auctioneerAuthority = (_params$auctioneerAut = params.auctioneerAuthority) !== null && _params$auctioneerAut !== void 0 ? _params$auctioneerAut : auctionHouse.auctioneer.authority;
    return builder.add({
      instruction: mplAuctionHouse.createUpdateAuctioneerInstruction({
        auctionHouse: auctionHouse.address,
        authority: authority.publicKey,
        auctioneerAuthority,
        ahAuctioneerPda: pdas$1.findAuctioneerPda(auctionHouse.address, auctioneerAuthority)
      }, {
        scopes: (_params$auctioneerSco2 = params.auctioneerScopes) !== null && _params$auctioneerSco2 !== void 0 ? _params$auctioneerSco2 : auctionHouse.auctioneer.scopes
      }),
      signers: [authority],
      key: (_params$updateAuction = params.updateAuctioneerInstructionKey) !== null && _params$updateAuction !== void 0 ? _params$updateAuction : 'updateAuctioneer'
    });
  });
};

exports.updateAuctionHouseBuilder = updateAuctionHouseBuilder;
exports.updateAuctionHouseOperation = updateAuctionHouseOperation;
exports.updateAuctionHouseOperationHandler = updateAuctionHouseOperationHandler;
//# sourceMappingURL=updateAuctionHouse.cjs.map
