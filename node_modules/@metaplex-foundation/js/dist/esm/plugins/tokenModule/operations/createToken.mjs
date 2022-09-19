import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, ACCOUNT_SIZE, createInitializeAccountInstruction } from '@solana/spl-token';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { TokenProgram } from '../program.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { ExpectedSignerError } from '../../../errors/SdkError.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../../types/Signer.mjs';

// -----------------
// Operation
// -----------------
const Key = 'CreateTokenOperation';
/**
 * Create a new Token account from the provided input
 * and returns the newly created `Token` model.
 *
 * @group Operations
 * @category Constructors
 */

const createTokenOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createTokenOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createTokenBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    const token = await metaplex.tokens().findTokenByAddress({
      address: output.tokenAddress
    }).run(scope);
    return { ...output,
      token
    };
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
const createTokenBuilder = async (metaplex, params) => {
  var _params$createAccount, _params$initializeTok;

  const {
    mint,
    owner = metaplex.identity().publicKey,
    token,
    payer = metaplex.identity(),
    tokenProgram = TokenProgram.publicKey,
    associatedTokenProgram = ASSOCIATED_TOKEN_PROGRAM_ID
  } = params;
  const isAssociatedToken = token === undefined;
  const builder = TransactionBuilder.make().setFeePayer(payer);

  if (isAssociatedToken) {
    var _params$createAssocia;

    const associatedTokenAddress = findAssociatedTokenAccountPda(mint, owner, tokenProgram, associatedTokenProgram);
    return builder.setContext({
      tokenAddress: associatedTokenAddress
    }) // Create an associated token account.
    .add({
      instruction: createAssociatedTokenAccountInstruction(payer.publicKey, associatedTokenAddress, owner, mint, tokenProgram, associatedTokenProgram),
      signers: [payer],
      key: (_params$createAssocia = params.createAssociatedTokenAccountInstructionKey) !== null && _params$createAssocia !== void 0 ? _params$createAssocia : 'createAssociatedTokenAccount'
    });
  }

  return builder.setFeePayer(payer).setContext({
    tokenAddress: token.publicKey
  }) // Create an empty account for the Token.
  .add(await metaplex.system().builders().createAccount({
    payer,
    newAccount: token,
    space: ACCOUNT_SIZE,
    program: tokenProgram,
    instructionKey: (_params$createAccount = params.createAccountInstructionKey) !== null && _params$createAccount !== void 0 ? _params$createAccount : 'createAccount'
  })) // Initialize the Token.
  .add({
    instruction: createInitializeAccountInstruction(token.publicKey, mint, owner, tokenProgram),
    signers: [token],
    key: (_params$initializeTok = params.initializeTokenInstructionKey) !== null && _params$initializeTok !== void 0 ? _params$initializeTok : 'initializeToken'
  });
};
/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * @group Transaction Builders
 * @category Constructors
 */
const createTokenIfMissingBuilder = async (metaplex, params) => {
  const {
    mint,
    owner = metaplex.identity().publicKey,
    token,
    tokenExists = true,
    payer = metaplex.identity(),
    tokenVariable = 'token'
  } = params;
  const destination = token !== null && token !== void 0 ? token : findAssociatedTokenAccountPda(mint, owner);
  const destinationAddress = toPublicKey(destination);
  const builder = TransactionBuilder.make().setFeePayer(payer).setContext({
    tokenAddress: destinationAddress
  });

  if (tokenExists) {
    return builder;
  } // When creating a token account, ensure it is passed as a Signer.


  if (token && !isSigner(token)) {
    throw new ExpectedSignerError(tokenVariable, 'PublicKey', {
      problemSuffix: `The provided "${tokenVariable}" account ` + `at address [${destinationAddress}] does not exist. ` + `Therefore, it needs to be created and passed as a Signer.`,
      solution: `If you want to create the "${tokenVariable}" account, then please pass it as a Signer. ` + `Alternatively, you can pass the owner account as a PublicKey instead to ` + `use (or create) an associated token account.`
    });
  }

  return builder.add(await metaplex.tokens().builders().createToken({ ...params,
    mint,
    owner,
    token,
    payer
  }));
};

export { createTokenBuilder, createTokenIfMissingBuilder, createTokenOperation, createTokenOperationHandler };
//# sourceMappingURL=createToken.mjs.map
