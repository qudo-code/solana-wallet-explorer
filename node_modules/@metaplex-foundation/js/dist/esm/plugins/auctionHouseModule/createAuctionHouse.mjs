import { createCreateAuctionHouseInstruction, createDelegateAuctioneerInstruction } from '@metaplex-foundation/mpl-auction-house';
import { findAuctionHousePda, findAuctionHouseFeePda, findAuctionHouseTreasuryPda, findAuctioneerPda } from './pdas.mjs';
import { AUCTIONEER_ALL_SCOPES } from './constants.mjs';
import { WRAPPED_SOL_MINT } from '../tokenModule/constants.mjs';
import { findAssociatedTokenAccountPda } from '../tokenModule/pdas.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { isSigner } from '../../types/Signer.mjs';
import { ExpectedSignerError } from '../../errors/SdkError.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'CreateAuctionHouseOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createAuctionHouseOperation = useOperation(Key);
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
  const treasuryMint = (_params$treasuryMint = params.treasuryMint) !== null && _params$treasuryMint !== void 0 ? _params$treasuryMint : WRAPPED_SOL_MINT;
  const treasuryWithdrawalDestinationOwner = (_params$treasuryWithd = params.treasuryWithdrawalDestinationOwner) !== null && _params$treasuryWithd !== void 0 ? _params$treasuryWithd : metaplex.identity().publicKey;
  const feeWithdrawalDestination = (_params$feeWithdrawal = params.feeWithdrawalDestination) !== null && _params$feeWithdrawal !== void 0 ? _params$feeWithdrawal : metaplex.identity().publicKey; // Auctioneer delegate instruction needs to be signed by authority

  if (params.auctioneerAuthority && !isSigner(authority)) {
    throw new ExpectedSignerError('authority', 'PublicKey', {
      problemSuffix: 'You are trying to delegate to an Auctioneer authority which ' + 'requires the Auction House authority to sign a transaction. ' + 'But you provided the Auction House authority as a Public Key.'
    });
  } // PDAs.


  const auctionHouse = findAuctionHousePda(toPublicKey(authority), treasuryMint);
  const auctionHouseFeeAccount = findAuctionHouseFeePda(auctionHouse);
  const auctionHouseTreasury = findAuctionHouseTreasuryPda(auctionHouse);
  const treasuryWithdrawalDestination = treasuryMint.equals(WRAPPED_SOL_MINT) ? treasuryWithdrawalDestinationOwner : findAssociatedTokenAccountPda(treasuryMint, treasuryWithdrawalDestinationOwner);
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    auctionHouseAddress: auctionHouse,
    auctionHouseFeeAccountAddress: auctionHouseFeeAccount,
    auctionHouseTreasuryAddress: auctionHouseTreasury,
    treasuryWithdrawalDestinationAddress: treasuryWithdrawalDestination
  }) // Create and initialize the Auction House account.
  .add({
    instruction: createCreateAuctionHouseInstruction({
      treasuryMint,
      payer: payer.publicKey,
      authority: toPublicKey(authority),
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
      instruction: createDelegateAuctioneerInstruction({
        auctionHouse,
        authority: toPublicKey(authority),
        auctioneerAuthority,
        ahAuctioneerPda: findAuctioneerPda(auctionHouse, auctioneerAuthority)
      }, {
        scopes: (_params$auctioneerSco = params.auctioneerScopes) !== null && _params$auctioneerSco !== void 0 ? _params$auctioneerSco : AUCTIONEER_ALL_SCOPES
      }),
      signers: [authority],
      key: (_params$delegateAucti = params.delegateAuctioneerInstructionKey) !== null && _params$delegateAucti !== void 0 ? _params$delegateAucti : 'delegateAuctioneer'
    });
  });
};

export { createAuctionHouseBuilder, createAuctionHouseOperation, createAuctionHouseOperationHandler };
//# sourceMappingURL=createAuctionHouse.mjs.map
