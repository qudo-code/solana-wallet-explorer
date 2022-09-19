'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CandyMachinesClient = require('./CandyMachinesClient.cjs');
var createCandyMachine = require('./operations/createCandyMachine.cjs');
var deleteCandyMachine = require('./operations/deleteCandyMachine.cjs');
var findCandyMachineByAddress = require('./operations/findCandyMachineByAddress.cjs');
var findCandyMachinesByPublicKeyField = require('./operations/findCandyMachinesByPublicKeyField.cjs');
var findMintedNftsByCandyMachine = require('./operations/findMintedNftsByCandyMachine.cjs');
var insertItemsToCandyMachine = require('./operations/insertItemsToCandyMachine.cjs');
var mintCandyMachine = require('./operations/mintCandyMachine.cjs');
var updateCandyMachine = require('./operations/updateCandyMachine.cjs');

/** @group Plugins */

const candyMachineModule = () => ({
  install(metaplex) {
    const op = metaplex.operations();
    op.register(createCandyMachine.createCandyMachineOperation, createCandyMachine.createCandyMachineOperationHandler);
    op.register(deleteCandyMachine.deleteCandyMachineOperation, deleteCandyMachine.deleteCandyMachineOperationHandler);
    op.register(findCandyMachineByAddress.findCandyMachineByAddressOperation, findCandyMachineByAddress.findCandyMachineByAddressOperationHandler);
    op.register(findCandyMachinesByPublicKeyField.findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyField.findCandyMachinesByPublicKeyFieldOperationHandler);
    op.register(findMintedNftsByCandyMachine.findMintedNftsByCandyMachineOperation, findMintedNftsByCandyMachine.findMintedNftsByCandyMachineOperationHandler);
    op.register(insertItemsToCandyMachine.insertItemsToCandyMachineOperation, insertItemsToCandyMachine.InsertItemsToCandyMachineOperationHandler);
    op.register(mintCandyMachine.mintCandyMachineOperation, mintCandyMachine.mintCandyMachineOperationHandler);
    op.register(updateCandyMachine.updateCandyMachineOperation, updateCandyMachine.updateCandyMachineOperationHandler);

    metaplex.candyMachines = function () {
      return new CandyMachinesClient.CandyMachinesClient(this);
    };
  }

});

exports.candyMachineModule = candyMachineModule;
//# sourceMappingURL=plugin.cjs.map
