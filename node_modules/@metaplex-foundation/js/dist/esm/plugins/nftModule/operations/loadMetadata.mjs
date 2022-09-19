import { useOperation } from '../../../types/Operation.mjs';

// -----------------
// Operation
// -----------------
const Key = 'LoadMetadataOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadMetadataOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const loadMetadataOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      metadata,
      loadJsonMetadata = true
    } = operation.input;
    let nftOrSft = await metaplex.nfts().findByMint({ ...operation.input,
      mintAddress: metadata.mintAddress,
      loadJsonMetadata: !metadata.jsonLoaded && loadJsonMetadata
    }).run(scope);

    if (!nftOrSft.jsonLoaded && metadata.jsonLoaded) {
      nftOrSft = { ...nftOrSft,
        json: metadata.json,
        jsonLoaded: true
      };
    }

    return nftOrSft;
  }
};

export { loadMetadataOperation, loadMetadataOperationHandler };
//# sourceMappingURL=loadMetadata.mjs.map
