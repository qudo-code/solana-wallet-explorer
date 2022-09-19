'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var findNftsByCreator = require('../../nftModule/operations/findNftsByCreator.cjs');

// Operation
// -----------------

const Key = 'FindMintedNftsByCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findMintedNftsByCandyMachineOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findMintedNftsByCandyMachineOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      candyMachine,
      version = 2,
      commitment
    } = operation.input;
    const firstCreator = version === 2 ? pdas.findCandyMachineCreatorPda(candyMachine) : candyMachine;
    const mintedNfts = await metaplex.operations().execute(findNftsByCreator.findNftsByCreatorOperation({
      creator: firstCreator,
      position: 1,
      commitment
    }), scope);
    return mintedNfts;
  }
};

exports.findMintedNftsByCandyMachineOperation = findMintedNftsByCandyMachineOperation;
exports.findMintedNftsByCandyMachineOperationHandler = findMintedNftsByCandyMachineOperationHandler;
//# sourceMappingURL=findMintedNftsByCandyMachine.cjs.map
