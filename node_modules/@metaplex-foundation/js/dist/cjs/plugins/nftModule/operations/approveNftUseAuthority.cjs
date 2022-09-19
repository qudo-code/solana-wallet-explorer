'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var web3_js = require('@solana/web3.js');
var pdas = require('../pdas.cjs');
var program = require('../../tokenModule/program.cjs');
var Operation = require('../../../types/Operation.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'ApproveNftUseAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveNftUseAuthorityOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const approveNftUseAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return approveNftUseAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const approveNftUseAuthorityBuilder = (metaplex, params) => {
  var _params$ownerTokenAdd, _params$tokenProgram, _params$systemProgram, _params$numberOfUses, _params$instructionKe;

  const {
    mintAddress,
    user,
    owner = metaplex.identity(),
    payer = metaplex.identity()
  } = params;
  const metadata = pdas.findMetadataPda(mintAddress);
  const useAuthorityRecord = pdas.findUseAuthorityRecordPda(mintAddress, user);
  const programAsBurner = pdas.findProgramAsBurnerPda();
  const ownerTokenAddress = (_params$ownerTokenAdd = params.ownerTokenAddress) !== null && _params$ownerTokenAdd !== void 0 ? _params$ownerTokenAdd : pdas$1.findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Approve the use authority.
  .add({
    instruction: mplTokenMetadata.createApproveUseAuthorityInstruction({
      useAuthorityRecord,
      owner: owner.publicKey,
      payer: payer.publicKey,
      user,
      ownerTokenAccount: ownerTokenAddress,
      metadata,
      mint: mintAddress,
      burner: programAsBurner,
      tokenProgram: (_params$tokenProgram = params.tokenProgram) !== null && _params$tokenProgram !== void 0 ? _params$tokenProgram : program.TokenProgram.publicKey,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : web3_js.SystemProgram.programId
    }, {
      approveUseAuthorityArgs: {
        numberOfUses: (_params$numberOfUses = params.numberOfUses) !== null && _params$numberOfUses !== void 0 ? _params$numberOfUses : 1
      }
    }),
    signers: [owner, payer],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveUseAuthority'
  });
};

exports.approveNftUseAuthorityBuilder = approveNftUseAuthorityBuilder;
exports.approveNftUseAuthorityOperation = approveNftUseAuthorityOperation;
exports.approveNftUseAuthorityOperationHandler = approveNftUseAuthorityOperationHandler;
//# sourceMappingURL=approveNftUseAuthority.cjs.map
