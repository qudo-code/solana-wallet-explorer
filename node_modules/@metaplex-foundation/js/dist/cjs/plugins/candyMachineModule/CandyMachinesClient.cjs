'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CandyMachinesBuildersClient = require('./CandyMachinesBuildersClient.cjs');
var createCandyMachine = require('./operations/createCandyMachine.cjs');
var deleteCandyMachine = require('./operations/deleteCandyMachine.cjs');
var findCandyMachinesByPublicKeyField = require('./operations/findCandyMachinesByPublicKeyField.cjs');
var findCandyMachineByAddress = require('./operations/findCandyMachineByAddress.cjs');
var findMintedNftsByCandyMachine = require('./operations/findMintedNftsByCandyMachine.cjs');
var insertItemsToCandyMachine = require('./operations/insertItemsToCandyMachine.cjs');
var mintCandyMachine = require('./operations/mintCandyMachine.cjs');
var updateCandyMachine = require('./operations/updateCandyMachine.cjs');
var PublicKey = require('../../types/PublicKey.cjs');

/**
 * @group Modules
 */

class CandyMachinesClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new CandyMachinesBuildersClient.CandyMachinesBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createCandyMachineOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createCandyMachine.createCandyMachineOperation(input));
  }
  /** {@inheritDoc deleteCandyMachineOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteCandyMachine.deleteCandyMachineOperation(input));
  }
  /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */


  findAllBy(input) {
    return this.metaplex.operations().getTask(findCandyMachinesByPublicKeyField.findCandyMachinesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findCandyMachineByAddressOperation} */


  findByAddress(input) {
    return this.metaplex.operations().getTask(findCandyMachineByAddress.findCandyMachineByAddressOperation(input));
  }
  /** {@inheritDoc findMintedNftsByCandyMachineOperation} */


  findMintedNfts(input) {
    return this.metaplex.operations().getTask(findMintedNftsByCandyMachine.findMintedNftsByCandyMachineOperation(input));
  }
  /** {@inheritDoc insertItemsToCandyMachineOperation} */


  insertItems(input) {
    return this.metaplex.operations().getTask(insertItemsToCandyMachine.insertItemsToCandyMachineOperation(input));
  }
  /** {@inheritDoc mintCandyMachineOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintCandyMachine.mintCandyMachineOperation(input));
  }
  /**
   * Helper method that refetches a given Candy Machine.
   */


  refresh(candyMachine, input) {
    return this.findByAddress({
      address: PublicKey.toPublicKey(candyMachine),
      ...input
    });
  }
  /** {@inheritDoc updateCandyMachineOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateCandyMachine.updateCandyMachineOperation(input));
  }

}

exports.CandyMachinesClient = CandyMachinesClient;
//# sourceMappingURL=CandyMachinesClient.cjs.map
