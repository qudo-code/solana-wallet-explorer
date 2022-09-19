'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'DeleteCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const deleteCandyMachineOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const deleteCandyMachineOperationHandler = {
  async handle(operation, metaplex) {
    return deleteCandyMachineBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const deleteCandyMachineBuilder = (metaplex, params) => {
  var _params$authority, _params$instructionKe;

  const authority = (_params$authority = params.authority) !== null && _params$authority !== void 0 ? _params$authority : metaplex.identity();
  const candyMachine = params.candyMachine;
  const deleteInstruction = mplCandyMachine.createWithdrawFundsInstruction({
    candyMachine: candyMachine.address,
    authority: authority.publicKey
  });

  if (candyMachine.collectionMintAddress) {
    const collectionPda = pdas.findCandyMachineCollectionPda(candyMachine.address);
    deleteInstruction.keys.push({
      pubkey: collectionPda,
      isWritable: true,
      isSigner: false
    });
  }

  return TransactionBuilder.TransactionBuilder.make() // This is important because, otherwise, the authority will not be identitied
  // as a mutable account and debitting it will cause an error.
  .setFeePayer(authority).add({
    instruction: deleteInstruction,
    signers: [authority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'withdrawFunds'
  });
};

exports.deleteCandyMachineBuilder = deleteCandyMachineBuilder;
exports.deleteCandyMachineOperation = deleteCandyMachineOperation;
exports.deleteCandyMachineOperationHandler = deleteCandyMachineOperationHandler;
//# sourceMappingURL=deleteCandyMachine.cjs.map
