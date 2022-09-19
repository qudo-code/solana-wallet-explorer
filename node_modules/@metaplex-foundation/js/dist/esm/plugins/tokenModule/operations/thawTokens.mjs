import { createThawAccountInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'ThawTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const thawTokensOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const thawTokensOperationHandler = {
  async handle(operation, metaplex) {
    return thawTokensBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const thawTokensBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    tokenOwner = metaplex.identity().publicKey,
    tokenAddress,
    multiSigners = [],
    freezeAuthority,
    tokenProgram = TokenProgram.publicKey
  } = params;
  const [authorityPublicKey, signers] = isSigner(freezeAuthority) ? [freezeAuthority.publicKey, [freezeAuthority]] : [freezeAuthority, multiSigners];
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : findAssociatedTokenAccountPda(mintAddress, tokenOwner);
  return TransactionBuilder.make().add({
    instruction: createThawAccountInstruction(tokenAddressOrAta, mintAddress, authorityPublicKey, multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'thawTokens'
  });
};

export { thawTokensBuilder, thawTokensOperation, thawTokensOperationHandler };
//# sourceMappingURL=thawTokens.mjs.map
