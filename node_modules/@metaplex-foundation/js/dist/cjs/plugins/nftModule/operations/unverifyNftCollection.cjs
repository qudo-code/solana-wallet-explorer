'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'UnverifyNftCollectionOperation';
/**
 * @group Operations
 * @category Constructors
 */

const unverifyNftCollectionOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const unverifyNftCollectionOperationHandler = {
  handle: async (operation, metaplex) => {
    return unverifyNftCollectionBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const unverifyNftCollectionBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    collectionMintAddress,
    isSizedCollection = true,
    isDelegated = false,
    collectionAuthority = metaplex.identity(),
    payer = metaplex.identity()
  } = params;
  const accounts = {
    metadata: pdas.findMetadataPda(mintAddress),
    collectionAuthority: collectionAuthority.publicKey,
    payer: payer.publicKey,
    collectionMint: collectionMintAddress,
    collection: pdas.findMetadataPda(collectionMintAddress),
    collectionMasterEditionAccount: pdas.findMasterEditionV2Pda(collectionMintAddress),
    collectionAuthorityRecord: isDelegated ? pdas.findCollectionAuthorityRecordPda(collectionMintAddress, collectionAuthority.publicKey) : undefined
  };
  const instruction = isSizedCollection ? mplTokenMetadata.createUnverifySizedCollectionItemInstruction(accounts) : mplTokenMetadata.createUnverifyCollectionInstruction(accounts);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Unverify the collection.
  .add({
    instruction: instruction,
    signers: [payer, collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'unverifyCollection'
  });
};

exports.unverifyNftCollectionBuilder = unverifyNftCollectionBuilder;
exports.unverifyNftCollectionOperation = unverifyNftCollectionOperation;
exports.unverifyNftCollectionOperationHandler = unverifyNftCollectionOperationHandler;
//# sourceMappingURL=unverifyNftCollection.cjs.map
