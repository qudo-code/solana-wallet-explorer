import { createUnverifySizedCollectionItemInstruction, createUnverifyCollectionInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findMasterEditionV2Pda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'UnverifyNftCollectionOperation';
/**
 * @group Operations
 * @category Constructors
 */

const unverifyNftCollectionOperation = useOperation(Key);
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
    metadata: findMetadataPda(mintAddress),
    collectionAuthority: collectionAuthority.publicKey,
    payer: payer.publicKey,
    collectionMint: collectionMintAddress,
    collection: findMetadataPda(collectionMintAddress),
    collectionMasterEditionAccount: findMasterEditionV2Pda(collectionMintAddress),
    collectionAuthorityRecord: isDelegated ? findCollectionAuthorityRecordPda(collectionMintAddress, collectionAuthority.publicKey) : undefined
  };
  const instruction = isSizedCollection ? createUnverifySizedCollectionItemInstruction(accounts) : createUnverifyCollectionInstruction(accounts);
  return TransactionBuilder.make().setFeePayer(payer) // Unverify the collection.
  .add({
    instruction: instruction,
    signers: [payer, collectionAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'unverifyCollection'
  });
};

export { unverifyNftCollectionBuilder, unverifyNftCollectionOperation, unverifyNftCollectionOperationHandler };
//# sourceMappingURL=unverifyNftCollection.mjs.map
