'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Nft = require('../nftModule/models/Nft.cjs');
var Operation = require('../../types/Operation.cjs');
var Amount = require('../../types/Amount.cjs');

// Operation
// -----------------

const Key = 'LoadListingOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadListingOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const loadListingOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      lazyListing,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const asset = await metaplex.nfts().findByMetadata({
      metadata: lazyListing.metadataAddress,
      tokenOwner: lazyListing.sellerAddress,
      commitment,
      loadJsonMetadata
    }).run(scope);
    Nft.assertNftOrSftWithToken(asset);
    return { ...lazyListing,
      model: 'listing',
      lazy: false,
      asset,
      tokens: Amount.amount(lazyListing.tokens, asset.mint.currency)
    };
  }
};

exports.loadListingOperation = loadListingOperation;
exports.loadListingOperationHandler = loadListingOperationHandler;
//# sourceMappingURL=loadListing.cjs.map
