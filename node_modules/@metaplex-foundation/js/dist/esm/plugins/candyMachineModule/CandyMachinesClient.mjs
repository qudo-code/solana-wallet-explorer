import { CandyMachinesBuildersClient } from './CandyMachinesBuildersClient.mjs';
import { createCandyMachineOperation } from './operations/createCandyMachine.mjs';
import { deleteCandyMachineOperation } from './operations/deleteCandyMachine.mjs';
import { findCandyMachinesByPublicKeyFieldOperation } from './operations/findCandyMachinesByPublicKeyField.mjs';
import { findCandyMachineByAddressOperation } from './operations/findCandyMachineByAddress.mjs';
import { findMintedNftsByCandyMachineOperation } from './operations/findMintedNftsByCandyMachine.mjs';
import { insertItemsToCandyMachineOperation } from './operations/insertItemsToCandyMachine.mjs';
import { mintCandyMachineOperation } from './operations/mintCandyMachine.mjs';
import { updateCandyMachineOperation } from './operations/updateCandyMachine.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';

/**
 * @group Modules
 */

class CandyMachinesClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new CandyMachinesBuildersClient(this.metaplex);
  }
  /** {@inheritDoc createCandyMachineOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createCandyMachineOperation(input));
  }
  /** {@inheritDoc deleteCandyMachineOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteCandyMachineOperation(input));
  }
  /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */


  findAllBy(input) {
    return this.metaplex.operations().getTask(findCandyMachinesByPublicKeyFieldOperation(input));
  }
  /** {@inheritDoc findCandyMachineByAddressOperation} */


  findByAddress(input) {
    return this.metaplex.operations().getTask(findCandyMachineByAddressOperation(input));
  }
  /** {@inheritDoc findMintedNftsByCandyMachineOperation} */


  findMintedNfts(input) {
    return this.metaplex.operations().getTask(findMintedNftsByCandyMachineOperation(input));
  }
  /** {@inheritDoc insertItemsToCandyMachineOperation} */


  insertItems(input) {
    return this.metaplex.operations().getTask(insertItemsToCandyMachineOperation(input));
  }
  /** {@inheritDoc mintCandyMachineOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintCandyMachineOperation(input));
  }
  /**
   * Helper method that refetches a given Candy Machine.
   */


  refresh(candyMachine, input) {
    return this.findByAddress({
      address: toPublicKey(candyMachine),
      ...input
    });
  }
  /** {@inheritDoc updateCandyMachineOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateCandyMachineOperation(input));
  }

}

export { CandyMachinesClient };
//# sourceMappingURL=CandyMachinesClient.mjs.map
