'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Operation = require('../../../types/Operation.cjs');

// -----------------
// Operation
// -----------------
const Key = 'LoadMetadataOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadMetadataOperation = Operation.useOperation(Key);
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

exports.loadMetadataOperation = loadMetadataOperation;
exports.loadMetadataOperationHandler = loadMetadataOperationHandler;
//# sourceMappingURL=loadMetadata.cjs.map
