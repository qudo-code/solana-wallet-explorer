import { createRevokeInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'RevokeTokenDelegateAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const revokeTokenDelegateAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const revokeTokenDelegateAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return revokeTokenDelegateAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const revokeTokenDelegateAuthorityBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    owner = metaplex.identity(),
    tokenAddress,
    multiSigners = [],
    tokenProgram = TokenProgram.publicKey
  } = params;
  const [ownerPublicKey, signers] = isSigner(owner) ? [owner.publicKey, [owner]] : [owner, multiSigners];
  const tokenAccount = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : findAssociatedTokenAccountPda(mintAddress, ownerPublicKey);
  return TransactionBuilder.make().add({
    instruction: createRevokeInstruction(tokenAccount, ownerPublicKey, multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'revokeDelegateAuthority'
  });
};

export { revokeTokenDelegateAuthorityBuilder, revokeTokenDelegateAuthorityOperation, revokeTokenDelegateAuthorityOperationHandler };
//# sourceMappingURL=revokeTokenDelegateAuthority.mjs.map
