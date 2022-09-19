import { createApproveInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { token } from '../../../types/Amount.mjs';

// Operation
// -----------------

const Key = 'ApproveTokenDelegateAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveTokenDelegateAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const approveTokenDelegateAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return approveTokenDelegateAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const approveTokenDelegateAuthorityBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    delegateAuthority,
    amount = token(1),
    owner = metaplex.identity(),
    tokenAddress,
    multiSigners = [],
    tokenProgram = TokenProgram.publicKey
  } = params;
  const [ownerPublicKey, signers] = isSigner(owner) ? [owner.publicKey, [owner]] : [owner, multiSigners];
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : findAssociatedTokenAccountPda(mintAddress, ownerPublicKey);
  return TransactionBuilder.make().add({
    instruction: createApproveInstruction(tokenAddressOrAta, delegateAuthority, ownerPublicKey, amount.basisPoints.toNumber(), multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveDelegateAuthority'
  });
};

export { approveTokenDelegateAuthorityBuilder, approveTokenDelegateAuthorityOperation, approveTokenDelegateAuthorityOperationHandler };
//# sourceMappingURL=approveTokenDelegateAuthority.mjs.map
