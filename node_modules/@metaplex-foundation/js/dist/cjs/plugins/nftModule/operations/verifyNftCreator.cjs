'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'VerifyNftCreatorOperation';
/**
 * @group Operations
 * @category Constructors
 */

const verifyNftCreatorOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const verifyNftCreatorOperationHandler = {
  handle: async (operation, metaplex) => {
    return verifyNftCreatorBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const verifyNftCreatorBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    creator = metaplex.identity()
  } = params;
  return TransactionBuilder.TransactionBuilder.make() // Verify the creator.
  .add({
    instruction: mplTokenMetadata.createSignMetadataInstruction({
      metadata: pdas.findMetadataPda(mintAddress),
      creator: creator.publicKey
    }),
    signers: [creator],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'verifyCreator'
  });
};

exports.verifyNftCreatorBuilder = verifyNftCreatorBuilder;
exports.verifyNftCreatorOperation = verifyNftCreatorOperation;
exports.verifyNftCreatorOperationHandler = verifyNftCreatorOperationHandler;
//# sourceMappingURL=verifyNftCreator.cjs.map
