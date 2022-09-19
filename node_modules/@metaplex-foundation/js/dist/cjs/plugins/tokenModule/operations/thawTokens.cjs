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

const Key = 'ThawTokensOperation';
/**
 * @group Operations
 * @category Constructors
 */

const thawTokensOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const thawTokensOperationHandler = {
  async handle(operation, metaplex) {
    return thawTokensBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const thawTokensBuilder = (metaplex, params) => {
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
    instruction: splToken.createThawAccountInstruction(tokenAddressOrAta, mintAddress, authorityPublicKey, multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'thawTokens'
  });
};

exports.thawTokensBuilder = thawTokensBuilder;
exports.thawTokensOperation = thawTokensOperation;
exports.thawTokensOperationHandler = thawTokensOperationHandler;
//# sourceMappingURL=thawTokens.cjs.map
