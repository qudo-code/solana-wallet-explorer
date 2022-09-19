import { toMetadataAccount } from '../accounts.mjs';
import { findMetadataPda } from '../pdas.mjs';
import { GmaBuilder } from '../../../utils/GmaBuilder.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toMetadata } from '../models/Metadata.mjs';

// Operation
// -----------------

const Key = 'FindNftsByMintListOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByMintListOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByMintListOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      mints,
      commitment
    } = operation.input;
    const metadataPdas = mints.map(mint => findMetadataPda(mint));
    const metadataInfos = await GmaBuilder.make(metaplex, metadataPdas, {
      commitment
    }).get();
    scope.throwIfCanceled();
    return metadataInfos.map(account => {
      if (!account.exists) {
        return null;
      }

      try {
        return toMetadata(toMetadataAccount(account));
      } catch (error) {
        return null;
      }
    });
  }
};

export { findNftsByMintListOperation, findNftsByMintListOperationHandler };
//# sourceMappingURL=findNftsByMintList.mjs.map
