import { TokenMetadataProgram } from '../program.mjs';
import { findNftsByMintListOperation } from './findNftsByMintList.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindNftsByCreatorOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByCreatorOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByCreatorOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      creator,
      position = 1,
      commitment
    } = operation.input;
    const mints = await TokenMetadataProgram.metadataV1Accounts(metaplex).selectMint().whereCreator(position, creator).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

export { findNftsByCreatorOperation, findNftsByCreatorOperationHandler };
//# sourceMappingURL=findNftsByCreator.mjs.map
