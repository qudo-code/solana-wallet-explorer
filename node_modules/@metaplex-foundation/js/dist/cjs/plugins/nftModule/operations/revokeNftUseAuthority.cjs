'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var web3_js = require('@solana/web3.js');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var program = require('../../tokenModule/program.cjs');

// Operation
// -----------------

const Key = 'RevokeNftUseAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const revokeNftUseAuthorityOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const revokeNftUseAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return revokeNftUseAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const revokeNftUseAuthorityBuilder = (metaplex, params) => {
  var _params$ownerTokenAdd, _params$tokenProgram, _params$systemProgram, _params$instructionKe;

  const {
    mintAddress,
    user,
    owner = metaplex.identity()
  } = params;
  const metadata = pdas.findMetadataPda(mintAddress);
  const useAuthorityRecord = pdas.findUseAuthorityRecordPda(mintAddress, user);
  const ownerTokenAddress = (_params$ownerTokenAdd = params.ownerTokenAddress) !== null && _params$ownerTokenAdd !== void 0 ? _params$ownerTokenAdd : pdas$1.findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.TransactionBuilder.make() // Revoke the use authority.
  .add({
    instruction: mplTokenMetadata.createRevokeUseAuthorityInstruction({
      useAuthorityRecord,
      owner: owner.publicKey,
      user,
      ownerTokenAccount: ownerTokenAddress,
      mint: mintAddress,
      metadata,
      tokenProgram: (_params$tokenProgram = params.tokenProgram) !== null && _params$tokenProgram !== void 0 ? _params$tokenProgram : program.TokenProgram.publicKey,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : web3_js.SystemProgram.programId
    }),
    signers: [owner],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'revokeUseAuthority'
  });
};

exports.revokeNftUseAuthorityBuilder = revokeNftUseAuthorityBuilder;
exports.revokeNftUseAuthorityOperation = revokeNftUseAuthorityOperation;
exports.revokeNftUseAuthorityOperationHandler = revokeNftUseAuthorityOperationHandler;
//# sourceMappingURL=revokeNftUseAuthority.cjs.map
