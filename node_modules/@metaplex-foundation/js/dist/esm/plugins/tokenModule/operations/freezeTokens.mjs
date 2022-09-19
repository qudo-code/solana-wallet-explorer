import { createFreezeAccountInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'FreezeTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const freezeTokensOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const freezeTokensOperationHandler = {
  async handle(operation, metaplex) {
    return freezeTokensBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const freezeTokensBuilder = (metaplex, params) => {
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
    instruction: createFreezeAccountInstruction(tokenAddressOrAta, mintAddress, authorityPublicKey, multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'freezeTokens'
  });
};

export { freezeTokensBuilder, freezeTokensOperation, freezeTokensOperationHandler };
//# sourceMappingURL=freezeTokens.mjs.map
