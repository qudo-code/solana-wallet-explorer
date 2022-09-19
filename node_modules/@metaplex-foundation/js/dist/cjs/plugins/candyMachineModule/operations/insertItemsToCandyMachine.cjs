'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var asserts = require('../asserts.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// -----------------
// Operation
// -----------------
const Key = 'InsertItemsToCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const insertItemsToCandyMachineOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const InsertItemsToCandyMachineOperationHandler = {
  async handle(operation, metaplex) {
    return insertItemsToCandyMachineBuilder(operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const insertItemsToCandyMachineBuilder = params => {
  var _params$index, _params$instructionKe;

  const index = (_params$index = params.index) !== null && _params$index !== void 0 ? _params$index : params.candyMachine.itemsLoaded;
  const items = params.items;
  asserts.assertNotFull(params.candyMachine, index);
  asserts.assertCanAdd(params.candyMachine, index, items.length);
  asserts.assertAllConfigLineConstraints(items);
  return TransactionBuilder.TransactionBuilder.make().add({
    instruction: mplCandyMachine.createAddConfigLinesInstruction({
      candyMachine: params.candyMachine.address,
      authority: params.authority.publicKey
    }, {
      index: index.toNumber(),
      configLines: items
    }),
    signers: [params.authority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'insertItems'
  });
};

exports.InsertItemsToCandyMachineOperationHandler = InsertItemsToCandyMachineOperationHandler;
exports.insertItemsToCandyMachineBuilder = insertItemsToCandyMachineBuilder;
exports.insertItemsToCandyMachineOperation = insertItemsToCandyMachineOperation;
//# sourceMappingURL=insertItemsToCandyMachine.cjs.map
