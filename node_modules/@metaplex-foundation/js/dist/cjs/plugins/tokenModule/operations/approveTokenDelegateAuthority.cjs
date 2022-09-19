'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var Operation = require('../../../types/Operation.cjs');
var Signer = require('../../../types/Signer.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Amount = require('../../../types/Amount.cjs');

// Operation
// -----------------

const Key = 'ApproveTokenDelegateAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveTokenDelegateAuthorityOperation = Operation.useOperation(Key);
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
    amount = Amount.token(1),
    owner = metaplex.identity(),
    tokenAddress,
    multiSigners = [],
    tokenProgram = program.TokenProgram.publicKey
  } = params;
  const [ownerPublicKey, signers] = Signer.isSigner(owner) ? [owner.publicKey, [owner]] : [owner, multiSigners];
  const tokenAddressOrAta = tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : pdas.findAssociatedTokenAccountPda(mintAddress, ownerPublicKey);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: splToken.createApproveInstruction(tokenAddressOrAta, delegateAuthority, ownerPublicKey, amount.basisPoints.toNumber(), multiSigners, tokenProgram),
    signers,
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveDelegateAuthority'
  });
};

exports.approveTokenDelegateAuthorityBuilder = approveTokenDelegateAuthorityBuilder;
exports.approveTokenDelegateAuthorityOperation = approveTokenDelegateAuthorityOperation;
exports.approveTokenDelegateAuthorityOperationHandler = approveTokenDelegateAuthorityOperationHandler;
//# sourceMappingURL=approveTokenDelegateAuthority.cjs.map
