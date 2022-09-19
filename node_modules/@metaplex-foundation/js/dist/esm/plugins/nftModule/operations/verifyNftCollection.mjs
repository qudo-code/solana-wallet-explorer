import { createVerifySizedCollectionItemInstruction, createVerifyCollectionInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findMasterEditionV2Pda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'VerifyNftCollectionOperation';
/**
 * @group Operations
 * @category Constructors
 */

const verifyNftCollectionOperation = useOperation(Key);
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
    metadata: findMetadataPda(mintAddress),
    collectionAuthority: collectionAuthority.publicKey,
    payer: payer.publicKey,
    collectionMint: collectionMintAddress,
    collection: findMetadataPda(collectionMintAddress),
    collectionMasterEditionAccount: findMasterEditionV2Pda(collectionMintAddress)
  };
  const instruction = isSizedCollection ? createVerifySizedCollectionItemInstruction(accounts) : createVerifyCollectionInstruction(accounts);

  if (isDelegated) {
    instruction.keys.push({
      pubkey: findCollectionAuthorityRecordPda(collectionMintAddress, collectionAuthority.publicKey),
      isWritable: false,
      isSigner: false
    });
  }

  return TransactionBuilder.make().setFeePayer(payer) // Verify the collection.
  .add({
    instruction: instruction,
    signers: [payer, collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'verifyCollection'
  });
};

export { verifyNftCollectionBuilder, verifyNftCollectionOperation, verifyNftCollectionOperationHandler };
//# sourceMappingURL=verifyNftCollection.mjs.map
