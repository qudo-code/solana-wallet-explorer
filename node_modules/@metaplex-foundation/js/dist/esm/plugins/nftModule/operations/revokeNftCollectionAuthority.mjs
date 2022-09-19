import { createRevokeCollectionAuthorityInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'RevokeNftCollectionAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const revokeNftCollectionAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const revokeNftCollectionAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return revokeNftCollectionAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const revokeNftCollectionAuthorityBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority,
    revokeAuthority = metaplex.identity()
  } = params;
  const metadata = findMetadataPda(mintAddress);
  const collectionAuthorityRecord = findCollectionAuthorityRecordPda(mintAddress, collectionAuthority);
  const instruction = createRevokeCollectionAuthorityInstruction({
    collectionAuthorityRecord,
    delegateAuthority: collectionAuthority,
    revokeAuthority: revokeAuthority.publicKey,
    metadata,
    mint: mintAddress
  }); // Temporary fix. The Shank macro wrongfully ask for the delegateAuthority to be a signer.
  // https://github.com/metaplex-foundation/metaplex-program-library/pull/639

  instruction.keys[1].isSigner = false;
  return TransactionBuilder.make() // Revoke the collection authority.
  .add({
    instruction,
    signers: [revokeAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'revokeCollectionAuthority'
  });
};

export { revokeNftCollectionAuthorityBuilder, revokeNftCollectionAuthorityOperation, revokeNftCollectionAuthorityOperationHandler };
//# sourceMappingURL=revokeNftCollectionAuthority.mjs.map
