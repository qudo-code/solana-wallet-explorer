import { findCandyMachineCreatorPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { findNftsByCreatorOperation } from '../../nftModule/operations/findNftsByCreator.mjs';

// Operation
// -----------------

const Key = 'FindMintedNftsByCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findMintedNftsByCandyMachineOperation = useOperation(Key);
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
    const firstCreator = version === 2 ? findCandyMachineCreatorPda(candyMachine) : candyMachine;
    const mintedNfts = await metaplex.operations().execute(findNftsByCreatorOperation({
      creator: firstCreator,
      position: 1,
      commitment
    }), scope);
    return mintedNfts;
  }
};

export { findMintedNftsByCandyMachineOperation, findMintedNftsByCandyMachineOperationHandler };
//# sourceMappingURL=findMintedNftsByCandyMachine.mjs.map
