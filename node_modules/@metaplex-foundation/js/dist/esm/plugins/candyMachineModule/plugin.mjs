import { CandyMachinesClient } from './CandyMachinesClient.mjs';
import { createCandyMachineOperation, createCandyMachineOperationHandler } from './operations/createCandyMachine.mjs';
import { deleteCandyMachineOperation, deleteCandyMachineOperationHandler } from './operations/deleteCandyMachine.mjs';
import { findCandyMachineByAddressOperation, findCandyMachineByAddressOperationHandler } from './operations/findCandyMachineByAddress.mjs';
import { findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyFieldOperationHandler } from './operations/findCandyMachinesByPublicKeyField.mjs';
import { findMintedNftsByCandyMachineOperation, findMintedNftsByCandyMachineOperationHandler } from './operations/findMintedNftsByCandyMachine.mjs';
import { insertItemsToCandyMachineOperation, InsertItemsToCandyMachineOperationHandler } from './operations/insertItemsToCandyMachine.mjs';
import { mintCandyMachineOperation, mintCandyMachineOperationHandler } from './operations/mintCandyMachine.mjs';
import { updateCandyMachineOperation, updateCandyMachineOperationHandler } from './operations/updateCandyMachine.mjs';

/** @group Plugins */

const candyMachineModule = () => ({
  install(metaplex) {
    const op = metaplex.operations();
    op.register(createCandyMachineOperation, createCandyMachineOperationHandler);
    op.register(deleteCandyMachineOperation, deleteCandyMachineOperationHandler);
    op.register(findCandyMachineByAddressOperation, findCandyMachineByAddressOperationHandler);
    op.register(findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyFieldOperationHandler);
    op.register(findMintedNftsByCandyMachineOperation, findMintedNftsByCandyMachineOperationHandler);
    op.register(insertItemsToCandyMachineOperation, InsertItemsToCandyMachineOperationHandler);
    op.register(mintCandyMachineOperation, mintCandyMachineOperationHandler);
    op.register(updateCandyMachineOperation, updateCandyMachineOperationHandler);

    metaplex.candyMachines = function () {
      return new CandyMachinesClient(this);
    };
  }

});

export { candyMachineModule };
//# sourceMappingURL=plugin.mjs.map
