import { createSetCollectionSizeInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'MigrateToSizedCollectionNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const migrateToSizedCollectionNftOperation = useOperation(Key);
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
  return TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: createSetCollectionSizeInstruction({
      collectionMetadata: findMetadataPda(mintAddress),
      collectionAuthority: collectionAuthority.publicKey,
      collectionMint: mintAddress,
      collectionAuthorityRecord: isDelegated ? findCollectionAuthorityRecordPda(mintAddress, collectionAuthority.publicKey) : undefined
    }, {
      setCollectionSizeArgs: {
        size
      }
    }),
    signers: [collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'setCollectionSize'
  });
};

export { migrateToSizedCollectionNftBuilder, migrateToSizedCollectionNftOperation, migrateToSizedCollectionNftOperationHandler };
//# sourceMappingURL=migrateToSizedCollectionNft.mjs.map
