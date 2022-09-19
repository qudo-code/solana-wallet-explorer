import { createApproveCollectionAuthorityInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { SystemProgram } from '@solana/web3.js';
import { findMetadataPda, findCollectionAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'ApproveNftCollectionAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveNftCollectionAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const approveNftCollectionAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return approveNftCollectionAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const approveNftCollectionAuthorityBuilder = (metaplex, params) => {
  var _params$systemProgram, _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority,
    updateAuthority = metaplex.identity(),
    payer = metaplex.identity()
  } = params;
  const metadata = findMetadataPda(mintAddress);
  const collectionAuthorityRecord = findCollectionAuthorityRecordPda(mintAddress, collectionAuthority);
  return TransactionBuilder.make().setFeePayer(payer) // Approve the collection authority.
  .add({
    instruction: createApproveCollectionAuthorityInstruction({
      collectionAuthorityRecord,
      newCollectionAuthority: collectionAuthority,
      updateAuthority: updateAuthority.publicKey,
      payer: payer.publicKey,
      metadata,
      mint: mintAddress,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : SystemProgram.programId
    }),
    signers: [payer, updateAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveCollectionAuthority'
  });
};

export { approveNftCollectionAuthorityBuilder, approveNftCollectionAuthorityOperation, approveNftCollectionAuthorityOperationHandler };
//# sourceMappingURL=approveNftCollectionAuthority.mjs.map
