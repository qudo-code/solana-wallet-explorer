import { createRevokeUseAuthorityInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { SystemProgram } from '@solana/web3.js';
import { findMetadataPda, findUseAuthorityRecordPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { TokenProgram } from '../../tokenModule/program.mjs';

// Operation
// -----------------

const Key = 'RevokeNftUseAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const revokeNftUseAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const revokeNftUseAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return revokeNftUseAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const revokeNftUseAuthorityBuilder = (metaplex, params) => {
  var _params$ownerTokenAdd, _params$tokenProgram, _params$systemProgram, _params$instructionKe;

  const {
    mintAddress,
    user,
    owner = metaplex.identity()
  } = params;
  const metadata = findMetadataPda(mintAddress);
  const useAuthorityRecord = findUseAuthorityRecordPda(mintAddress, user);
  const ownerTokenAddress = (_params$ownerTokenAdd = params.ownerTokenAddress) !== null && _params$ownerTokenAdd !== void 0 ? _params$ownerTokenAdd : findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.make() // Revoke the use authority.
  .add({
    instruction: createRevokeUseAuthorityInstruction({
      useAuthorityRecord,
      owner: owner.publicKey,
      user,
      ownerTokenAccount: ownerTokenAddress,
      mint: mintAddress,
      metadata,
      tokenProgram: (_params$tokenProgram = params.tokenProgram) !== null && _params$tokenProgram !== void 0 ? _params$tokenProgram : TokenProgram.publicKey,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : SystemProgram.programId
    }),
    signers: [owner],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'revokeUseAuthority'
  });
};

export { revokeNftUseAuthorityBuilder, revokeNftUseAuthorityOperation, revokeNftUseAuthorityOperationHandler };
//# sourceMappingURL=revokeNftUseAuthority.mjs.map
