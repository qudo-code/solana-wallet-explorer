import { findNftsByMintListOperation } from './findNftsByMintList.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TokenProgram } from '../../tokenModule/program.mjs';

// Operation
// -----------------

const Key = 'FindNftsByOwnerOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByOwnerOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByOwnerOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      owner,
      commitment
    } = operation.input;
    const mints = await TokenProgram.tokenAccounts(metaplex).selectMint().whereOwner(owner).whereAmount(1).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

export { findNftsByOwnerOperation, findNftsByOwnerOperationHandler };
//# sourceMappingURL=findNftsByOwner.mjs.map
