'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var program = require('../../tokenModule/program.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'ThawDelegatedNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const thawDelegatedNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const thawDelegatedNftOperationHandler = {
  async handle(operation, metaplex) {
    return thawDelegatedNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const thawDelegatedNftBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    delegateAuthority,
    tokenOwner = metaplex.identity().publicKey,
    tokenAddress,
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const editionAddress = pdas.findMasterEditionV2Pda(mintAddress);
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : pdas$1.findAssociatedTokenAccountPda(mintAddress, tokenOwner);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: mplTokenMetadata.createThawDelegatedAccountInstruction({
      delegate: delegateAuthority.publicKey,
      tokenAccount: tokenAddressOrAta,
      edition: editionAddress,
      mint: mintAddress,
      tokenProgram
    }),
    signers: [delegateAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'thawDelegatedNft'
  });
};

exports.thawDelegatedNftBuilder = thawDelegatedNftBuilder;
exports.thawDelegatedNftOperation = thawDelegatedNftOperation;
exports.thawDelegatedNftOperationHandler = thawDelegatedNftOperationHandler;
//# sourceMappingURL=thawDelegatedNft.cjs.map
