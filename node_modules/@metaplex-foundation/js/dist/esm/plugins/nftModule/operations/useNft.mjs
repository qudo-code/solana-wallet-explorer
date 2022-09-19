import { createUtilizeInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda, findUseAuthorityRecordPda, findProgramAsBurnerPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { ExpectedSignerError } from '../../../errors/SdkError.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'UseNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const useNftOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const useNftOperationHandler = {
  handle: async (operation, metaplex) => {
    return useNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const useNftBuilder = (metaplex, params) => {
  var _params$ownerTokenAcc, _params$instructionKe;

  const {
    mintAddress,
    numberOfUses = 1,
    owner = metaplex.identity(),
    useAuthority
  } = params;

  if (!isSigner(owner) && !useAuthority) {
    throw new ExpectedSignerError('owner', 'PublicKey', {
      problemSuffix: 'In order to use an NFT you must either provide the owner as a Signer ' + 'or a delegated use authority as a Signer.'
    });
  }

  const metadata = findMetadataPda(mintAddress);
  const tokenAccount = (_params$ownerTokenAcc = params.ownerTokenAccount) !== null && _params$ownerTokenAcc !== void 0 ? _params$ownerTokenAcc : findAssociatedTokenAccountPda(mintAddress, toPublicKey(owner));
  const useAuthorityRecord = useAuthority ? findUseAuthorityRecordPda(mintAddress, useAuthority.publicKey) : undefined;
  const programAsBurner = findProgramAsBurnerPda();
  return TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: createUtilizeInstruction({
      metadata,
      tokenAccount,
      useAuthority: useAuthority ? useAuthority.publicKey : toPublicKey(owner),
      mint: mintAddress,
      owner: toPublicKey(owner),
      useAuthorityRecord,
      burner: useAuthorityRecord ? programAsBurner : undefined
    }, {
      utilizeArgs: {
        numberOfUses
      }
    }),
    signers: [owner, useAuthority].filter(isSigner),
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'utilizeNft'
  });
};

export { useNftBuilder, useNftOperation, useNftOperationHandler };
//# sourceMappingURL=useNft.mjs.map
