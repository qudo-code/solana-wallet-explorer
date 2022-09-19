'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var Operation = require('../../../types/Operation.cjs');
var Amount = require('../../../types/Amount.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// -----------------
// Operation
// -----------------
const Key = 'CreateAccountOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createAccountOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createAccountOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createAccountBuilder(metaplex, operation.input);
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
 * Note that accessing this transaction builder is asynchronous
 * because we may need to contact the cluster to get the
 * rent-exemption for the provided space.
 *
 * @group Transaction Builders
 * @category Constructors
 */
const createAccountBuilder = async (metaplex, params) => {
  var _params$lamports, _params$instructionKe;

  const {
    space,
    payer = metaplex.identity(),
    newAccount = web3_js.Keypair.generate(),
    program = web3_js.SystemProgram.programId
  } = params;
  const lamports = (_params$lamports = params.lamports) !== null && _params$lamports !== void 0 ? _params$lamports : await metaplex.rpc().getRent(space);
  Amount.assertSol(lamports);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    newAccount,
    lamports
  }).add({
    instruction: web3_js.SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: newAccount.publicKey,
      space,
      lamports: lamports.basisPoints.toNumber(),
      programId: program
    }),
    signers: [payer, newAccount],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'createAccount'
  });
};

exports.createAccountBuilder = createAccountBuilder;
exports.createAccountOperation = createAccountOperation;
exports.createAccountOperationHandler = createAccountOperationHandler;
//# sourceMappingURL=createAccount.cjs.map
