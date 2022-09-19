'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

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

const createTokenOperation = Operation.useOperation(Key);
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
    tokenProgram = program.TokenProgram.publicKey,
    associatedTokenProgram = splToken.ASSOCIATED_TOKEN_PROGRAM_ID
  } = params;
  const isAssociatedToken = token === undefined;
  const builder = TransactionBuilder.TransactionBuilder.make().setFeePayer(payer);

  if (isAssociatedToken) {
    var _params$createAssocia;

    const associatedTokenAddress = pdas.findAssociatedTokenAccountPda(mint, owner, tokenProgram, associatedTokenProgram);
    return builder.setContext({
      tokenAddress: associatedTokenAddress
    }) // Create an associated token account.
    .add({
      instruction: splToken.createAssociatedTokenAccountInstruction(payer.publicKey, associatedTokenAddress, owner, mint, tokenProgram, associatedTokenProgram),
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
    space: splToken.ACCOUNT_SIZE,
    program: tokenProgram,
    instructionKey: (_params$createAccount = params.createAccountInstructionKey) !== null && _params$createAccount !== void 0 ? _params$createAccount : 'createAccount'
  })) // Initialize the Token.
  .add({
    instruction: splToken.createInitializeAccountInstruction(token.publicKey, mint, owner, tokenProgram),
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
  const destination = token !== null && token !== void 0 ? token : pdas.findAssociatedTokenAccountPda(mint, owner);
  const destinationAddress = PublicKey.toPublicKey(destination);
  const builder = TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    tokenAddress: destinationAddress
  });

  if (tokenExists) {
    return builder;
  } // When creating a token account, ensure it is passed as a Signer.


  if (token && !Signer.isSigner(token)) {
    throw new SdkError.ExpectedSignerError(tokenVariable, 'PublicKey', {
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

exports.createTokenBuilder = createTokenBuilder;
exports.createTokenIfMissingBuilder = createTokenIfMissingBuilder;
exports.createTokenOperation = createTokenOperation;
exports.createTokenOperationHandler = createTokenOperationHandler;
//# sourceMappingURL=createToken.cjs.map
