import { createBurnNftInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findMasterEditionV2Pda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TokenProgram } from '../../tokenModule/program.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'DeleteNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const deleteNftOperation = useOperation(Key);
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
    tokenProgram = TokenProgram.publicKey
  } = params;
  const metadata = findMetadataPda(mintAddress);
  const edition = findMasterEditionV2Pda(mintAddress);
  const tokenAddress = ownerTokenAccount !== null && ownerTokenAccount !== void 0 ? ownerTokenAccount : findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.make().add({
    instruction: createBurnNftInstruction({
      metadata,
      owner: owner.publicKey,
      mint: mintAddress,
      tokenAccount: tokenAddress,
      masterEditionAccount: edition,
      splTokenProgram: tokenProgram,
      collectionMetadata: collection ? findMetadataPda(collection) : undefined
    }),
    signers: [owner],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'deleteNft'
  });
};

export { deleteNftBuilder, deleteNftOperation, deleteNftOperationHandler };
//# sourceMappingURL=deleteNft.mjs.map
