import { TokenMetadataProgram } from '../program.mjs';
import { findNftsByMintListOperation } from './findNftsByMintList.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindNftsByUpdateAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByUpdateAuthorityOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByUpdateAuthorityOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      updateAuthority,
      commitment
    } = operation.input;
    const mints = await TokenMetadataProgram.metadataV1Accounts(metaplex).selectMint().whereUpdateAuthority(updateAuthority).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

export { findNftsByUpdateAuthorityOperation, findNftsByUpdateAuthorityOperationHandler };
//# sourceMappingURL=findNftsByUpdateAuthority.mjs.map
