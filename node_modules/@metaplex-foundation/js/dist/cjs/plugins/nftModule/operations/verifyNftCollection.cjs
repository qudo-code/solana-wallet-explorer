'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'VerifyNftCollectionOperation';
/**
 * @group Operations
 * @category Constructors
 */

const verifyNftCollectionOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const verifyNftCollectionOperationHandler = {
  handle: async (operation, metaplex) => {
    return verifyNftCollectionBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const verifyNftCollectionBuilder = (metaplex, params) => {
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
    collectionMasterEditionAccount: pdas.findMasterEditionV2Pda(collectionMintAddress)
  };
  const instruction = isSizedCollection ? mplTokenMetadata.createVerifySizedCollectionItemInstruction(accounts) : mplTokenMetadata.createVerifyCollectionInstruction(accounts);

  if (isDelegated) {
    instruction.keys.push({
      pubkey: pdas.findCollectionAuthorityRecordPda(collectionMintAddress, collectionAuthority.publicKey),
      isWritable: false,
      isSigner: false
    });
  }

  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Verify the collection.
  .add({
    instruction: instruction,
    signers: [payer, collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'verifyCollection'
  });
};

exports.verifyNftCollectionBuilder = verifyNftCollectionBuilder;
exports.verifyNftCollectionOperation = verifyNftCollectionOperation;
exports.verifyNftCollectionOperationHandler = verifyNftCollectionOperationHandler;
//# sourceMappingURL=verifyNftCollection.cjs.map
