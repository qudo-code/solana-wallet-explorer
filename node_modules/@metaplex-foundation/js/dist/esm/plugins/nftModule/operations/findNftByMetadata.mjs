import { toMetadataAccount } from '../accounts.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'FindNftByMetadataOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftByMetadataOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftByMetadataOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const metadata = toMetadataAccount(await metaplex.rpc().getAccount(operation.input.metadata));
    scope.throwIfCanceled();
    return metaplex.nfts().findByMint({ ...operation.input,
      mintAddress: metadata.data.mint
    }).run(scope);
  }
};

export { findNftByMetadataOperation, findNftByMetadataOperationHandler };
//# sourceMappingURL=findNftByMetadata.mjs.map
