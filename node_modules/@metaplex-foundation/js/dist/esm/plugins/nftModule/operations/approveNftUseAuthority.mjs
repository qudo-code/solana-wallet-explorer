import { createApproveUseAuthorityInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { SystemProgram } from '@solana/web3.js';
import { findMetadataPda, findUseAuthorityRecordPda, findProgramAsBurnerPda } from '../pdas.mjs';
import { TokenProgram } from '../../tokenModule/program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'ApproveNftUseAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveNftUseAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const approveNftUseAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return approveNftUseAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const approveNftUseAuthorityBuilder = (metaplex, params) => {
  var _params$ownerTokenAdd, _params$tokenProgram, _params$systemProgram, _params$numberOfUses, _params$instructionKe;

  const {
    mintAddress,
    user,
    owner = metaplex.identity(),
    payer = metaplex.identity()
  } = params;
  const metadata = findMetadataPda(mintAddress);
  const useAuthorityRecord = findUseAuthorityRecordPda(mintAddress, user);
  const programAsBurner = findProgramAsBurnerPda();
  const ownerTokenAddress = (_params$ownerTokenAdd = params.ownerTokenAddress) !== null && _params$ownerTokenAdd !== void 0 ? _params$ownerTokenAdd : findAssociatedTokenAccountPda(mintAddress, owner.publicKey);
  return TransactionBuilder.make().setFeePayer(payer) // Approve the use authority.
  .add({
    instruction: createApproveUseAuthorityInstruction({
      useAuthorityRecord,
      owner: owner.publicKey,
      payer: payer.publicKey,
      user,
      ownerTokenAccount: ownerTokenAddress,
      metadata,
      mint: mintAddress,
      burner: programAsBurner,
      tokenProgram: (_params$tokenProgram = params.tokenProgram) !== null && _params$tokenProgram !== void 0 ? _params$tokenProgram : TokenProgram.publicKey,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : SystemProgram.programId
    }, {
      approveUseAuthorityArgs: {
        numberOfUses: (_params$numberOfUses = params.numberOfUses) !== null && _params$numberOfUses !== void 0 ? _params$numberOfUses : 1
      }
    }),
    signers: [owner, payer],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveUseAuthority'
  });
};

export { approveNftUseAuthorityBuilder, approveNftUseAuthorityOperation, approveNftUseAuthorityOperationHandler };
//# sourceMappingURL=approveNftUseAuthority.mjs.map
