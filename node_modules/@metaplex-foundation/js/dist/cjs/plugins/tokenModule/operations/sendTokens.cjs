'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var Operation = require('../../../types/Operation.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var Signer = require('../../../types/Signer.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'SendTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const sendTokensOperation = Operation.useOperation(Key);
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
    const destination = toToken !== null && toToken !== void 0 ? toToken : pdas.findAssociatedTokenAccountPda(mintAddress, toOwner);
    const destinationAddress = PublicKey.toPublicKey(destination);
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
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const [fromOwnerPublicKey, signers] = Signer.isSigner(fromOwner) ? [fromOwner.publicKey, [fromOwner]] : [fromOwner, [delegateAuthority, ...fromMultiSigners].filter(Signer.isSigner)];
  const source = fromToken !== null && fromToken !== void 0 ? fromToken : pdas.findAssociatedTokenAccountPda(mintAddress, fromOwnerPublicKey);
  const destination = toToken !== null && toToken !== void 0 ? toToken : pdas.findAssociatedTokenAccountPda(mintAddress, toOwner);
  return TransactionBuilder.TransactionBuilder.make() // Create token account if missing.
  .add(await metaplex.tokens().builders().createTokenIfMissing({ ...params,
    mint: mintAddress,
    owner: toOwner,
    token: toToken,
    tokenExists: toTokenExists,
    payer,
    tokenVariable: 'toToken'
  })) // Transfer tokens.
  .add({
    instruction: splToken.createTransferInstruction(source, PublicKey.toPublicKey(destination), delegateAuthority ? delegateAuthority.publicKey : fromOwnerPublicKey, amount.basisPoints.toNumber(), fromMultiSigners, tokenProgram),
    signers,
    key: (_params$transferToken = params.transferTokensInstructionKey) !== null && _params$transferToken !== void 0 ? _params$transferToken : 'transferTokens'
  });
};

exports.sendTokensBuilder = sendTokensBuilder;
exports.sendTokensOperation = sendTokensOperation;
exports.sendTokensOperationHandler = sendTokensOperationHandler;
//# sourceMappingURL=sendTokens.cjs.map
