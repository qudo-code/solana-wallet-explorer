import { createMintToInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { isSigner } from '../../../types/Signer.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'MintTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const mintTokensOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const mintTokensOperationHandler = {
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
    const builder = await mintTokensBuilder(metaplex, { ...operation.input,
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
const mintTokensBuilder = async (metaplex, params) => {
  var _params$mintTokensIns;

  const {
    mintAddress,
    amount,
    toOwner = metaplex.identity().publicKey,
    toToken,
    toTokenExists = true,
    mintAuthority = metaplex.identity(),
    multiSigners = [],
    payer = metaplex.identity(),
    tokenProgram = TokenProgram.publicKey
  } = params;
  const [mintAuthorityPublicKey, signers] = isSigner(mintAuthority) ? [mintAuthority.publicKey, [mintAuthority]] : [mintAuthority, multiSigners];
  const destination = toToken !== null && toToken !== void 0 ? toToken : findAssociatedTokenAccountPda(mintAddress, toOwner);
  return TransactionBuilder.make() // Create token account if missing.
  .add(await metaplex.tokens().builders().createTokenIfMissing({ ...params,
    mint: mintAddress,
    owner: toOwner,
    token: toToken,
    tokenExists: toTokenExists,
    payer,
    tokenVariable: 'toToken'
  })) // Mint tokens.
  .add({
    instruction: createMintToInstruction(mintAddress, toPublicKey(destination), mintAuthorityPublicKey, amount.basisPoints.toNumber(), multiSigners, tokenProgram),
    signers,
    key: (_params$mintTokensIns = params.mintTokensInstructionKey) !== null && _params$mintTokensIns !== void 0 ? _params$mintTokensIns : 'mintTokens'
  });
};

export { mintTokensBuilder, mintTokensOperation, mintTokensOperationHandler };
//# sourceMappingURL=mintTokens.mjs.map
