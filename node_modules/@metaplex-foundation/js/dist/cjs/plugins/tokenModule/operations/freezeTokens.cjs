'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var Operation = require('../../../types/Operation.cjs');
var Signer = require('../../../types/Signer.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'FreezeTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const freezeTokensOperation = Operation.useOperation(Key);
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
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const [authorityPublicKey, signers] = Signer.isSigner(freezeAuthority) ? [freezeAuthority.publicKey, [freezeAuthority]] : [freezeAuthority, multiSigners];
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : pdas.findAssociatedTokenAccountPda(mintAddress, tokenOwner);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: splToken.createFreezeAccountInstruction(tokenAddressOrAta, mintAddress, authorityPublicKey, multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'freezeTokens'
  });
};

exports.freezeTokensBuilder = freezeTokensBuilder;
exports.freezeTokensOperation = freezeTokensOperation;
exports.freezeTokensOperationHandler = freezeTokensOperationHandler;
//# sourceMappingURL=freezeTokens.cjs.map
