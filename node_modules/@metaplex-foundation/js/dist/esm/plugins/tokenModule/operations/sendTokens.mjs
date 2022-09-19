import { createTransferInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'SendTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const sendTokensOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const sendTokensOperationHandler = {
  async handle(operation, metaplex, scope) {
    const {
      mintAddress,
      toOwner = metaplex.identity().publicKey,
      toToken
    } = operation.input;
    const destination = toToken !== null && toToken !== void 0 ? toToken : findAssociatedTokenAccountPda(mintAddress, toOwner);
    const destinationAddress = toPublicKey(destination);
    const destinationAccountExists = await metaplex.rpc().accountExists(destinationAddress);
    scope.throwIfCanceled();
    const builder = await sendTokensBuilder(metaplex, { ...operation.input,
      toTokenExists: destinationAccountExists
    });
    scope.throwIfCanceled();
    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const sendTokensBuilder = async (metaplex, params) => {
  var _params$transferToken;

  const {
    mintAddress,
    amount,
    toOwner = metaplex.identity().publicKey,
    toToken,
    toTokenExists = true,
    fromOwner = metaplex.identity(),
    fromToken,
    fromMultiSigners = [],
    delegateAuthority,
    payer = metaplex.identity(),
    tokenProgram = TokenProgram.publicKey
  } = params;
  const [fromOwnerPublicKey, signers] = isSigner(fromOwner) ? [fromOwner.publicKey, [fromOwner]] : [fromOwner, [delegateAuthority, ...fromMultiSigners].filter(isSigner)];
  const source = fromToken !== null && fromToken !== void 0 ? fromToken : findAssociatedTokenAccountPda(mintAddress, fromOwnerPublicKey);
  const destination = toToken !== null && toToken !== void 0 ? toToken : findAssociatedTokenAccountPda(mintAddress, toOwner);
  return TransactionBuilder.make() // Create token account if missing.
  .add(await metaplex.tokens().builders().createTokenIfMissing({ ...params,
    mint: mintAddress,
    owner: toOwner,
    token: toToken,
    tokenExists: toTokenExists,
    payer,
    tokenVariable: 'toToken'
  })) // Transfer tokens.
  .add({
    instruction: createTransferInstruction(source, toPublicKey(destination), delegateAuthority ? delegateAuthority.publicKey : fromOwnerPublicKey, amount.basisPoints.toNumber(), fromMultiSigners, tokenProgram),
    signers,
    key: (_params$transferToken = params.transferTokensInstructionKey) !== null && _params$transferToken !== void 0 ? _params$transferToken : 'transferTokens'
  });
};

export { sendTokensBuilder, sendTokensOperation, sendTokensOperationHandler };
//# sourceMappingURL=sendTokens.mjs.map
