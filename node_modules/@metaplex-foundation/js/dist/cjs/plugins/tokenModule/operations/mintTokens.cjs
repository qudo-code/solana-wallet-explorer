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

const Key = 'MintTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const mintTokensOperation = Operation.useOperation(Key);
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
    const destination = toToken !== null && toToken !== void 0 ? toToken : pdas.findAssociatedTokenAccountPda(mintAddress, toOwner);
    const destinationAddress = PublicKey.toPublicKey(destination);
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
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const [mintAuthorityPublicKey, signers] = Signer.isSigner(mintAuthority) ? [mintAuthority.publicKey, [mintAuthority]] : [mintAuthority, multiSigners];
  const destination = toToken !== null && toToken !== void 0 ? toToken : pdas.findAssociatedTokenAccountPda(mintAddress, toOwner);
  return TransactionBuilder.TransactionBuilder.make() // Create token account if missing.
  .add(await metaplex.tokens().builders().createTokenIfMissing({ ...params,
    mint: mintAddress,
    owner: toOwner,
    token: toToken,
    tokenExists: toTokenExists,
    payer,
    tokenVariable: 'toToken'
  })) // Mint tokens.
  .add({
    instruction: splToken.createMintToInstruction(mintAddress, PublicKey.toPublicKey(destination), mintAuthorityPublicKey, amount.basisPoints.toNumber(), multiSigners, tokenProgram),
    signers,
    key: (_params$mintTokensIns = params.mintTokensInstructionKey) !== null && _params$mintTokensIns !== void 0 ? _params$mintTokensIns : 'mintTokens'
  });
};

exports.mintTokensBuilder = mintTokensBuilder;
exports.mintTokensOperation = mintTokensOperation;
exports.mintTokensOperationHandler = mintTokensOperationHandler;
//# sourceMappingURL=mintTokens.cjs.map
