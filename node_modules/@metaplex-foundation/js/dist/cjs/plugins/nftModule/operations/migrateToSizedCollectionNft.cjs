'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'MigrateToSizedCollectionNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const migrateToSizedCollectionNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const migrateToSizedCollectionNftOperationHandler = {
  handle: async (operation, metaplex) => {
    return migrateToSizedCollectionNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const migrateToSizedCollectionNftBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority = metaplex.identity(),
    size,
    isDelegated = false
  } = params;
  return TransactionBuilder.TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: mplTokenMetadata.createSetCollectionSizeInstruction({
      collectionMetadata: pdas.findMetadataPda(mintAddress),
      collectionAuthority: collectionAuthority.publicKey,
      collectionMint: mintAddress,
      collectionAuthorityRecord: isDelegated ? pdas.findCollectionAuthorityRecordPda(mintAddress, collectionAuthority.publicKey) : undefined
    }, {
      setCollectionSizeArgs: {
        size
      }
    }),
    signers: [collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'setCollectionSize'
  });
};

exports.migrateToSizedCollectionNftBuilder = migrateToSizedCollectionNftBuilder;
exports.migrateToSizedCollectionNftOperation = migrateToSizedCollectionNftOperation;
exports.migrateToSizedCollectionNftOperationHandler = migrateToSizedCollectionNftOperationHandler;
//# sourceMappingURL=migrateToSizedCollectionNft.cjs.map
