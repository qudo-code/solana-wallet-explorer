import { createThawDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMasterEditionV2Pda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TokenProgram } from '../../tokenModule/program.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'ThawDelegatedNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const thawDelegatedNftOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const thawDelegatedNftOperationHandler = {
  async handle(operation, metaplex) {
    return thawDelegatedNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const thawDelegatedNftBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    delegateAuthority,
    tokenOwner = metaplex.identity().publicKey,
    tokenAddress,
    tokenProgram = TokenProgram.publicKey
  } = params;
  const editionAddress = findMasterEditionV2Pda(mintAddress);
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : findAssociatedTokenAccountPda(mintAddress, tokenOwner);
  return TransactionBuilder.make().add({
    instruction: createThawDelegatedAccountInstruction({
      delegate: delegateAuthority.publicKey,
      tokenAccount: tokenAddressOrAta,
      edition: editionAddress,
      mint: mintAddress,
      tokenProgram
    }),
    signers: [delegateAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'thawDelegatedNft'
  });
};

export { thawDelegatedNftBuilder, thawDelegatedNftOperation, thawDelegatedNftOperationHandler };
//# sourceMappingURL=thawDelegatedNft.mjs.map
