'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var program = require('../../tokenModule/program.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'DeleteNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const deleteNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const deleteNftOperationHandler = {
  handle: async (operation, metaplex) => {
    return deleteNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const deleteNftBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    owner = metaplex.identity(),
    ownerTokenAccount,
    collection,
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const metadata = pdas.findMetadataPda(mintAddress);
  const edition = pdas.findMasterEditionV2Pda(mintAddress);
  const tokenAddress = ownerTokenAccount !== null && ownerTokenAccount !== void 0 ? ownerTokenAccount : pdas$1.findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: mplTokenMetadata.createBurnNftInstruction({
      metadata,
      owner: owner.publicKey,
      mint: mintAddress,
      tokenAccount: tokenAddress,
      masterEditionAccount: edition,
      splTokenProgram: tokenProgram,
      collectionMetadata: collection ? pdas.findMetadataPda(collection) : undefined
    }),
    signers: [owner],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'deleteNft'
  });
};

exports.deleteNftBuilder = deleteNftBuilder;
exports.deleteNftOperation = deleteNftOperation;
exports.deleteNftOperationHandler = deleteNftOperationHandler;
//# sourceMappingURL=deleteNft.cjs.map
