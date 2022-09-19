'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../utils/assert.cjs');
var Operation = require('../../types/Operation.cjs');
var Nft = require('../nftModule/models/Nft.cjs');
var Amount = require('../../types/Amount.cjs');

// Operation
// -----------------

const Key = 'LoadBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadBidOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const loadBidOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      lazyBid,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const bid = { ...lazyBid,
      model: 'bid',
      lazy: false
    };

    if (lazyBid.tokenAddress) {
      const asset = await metaplex.nfts().findByToken({
        token: lazyBid.tokenAddress,
        commitment,
        loadJsonMetadata
      }).run(scope);
      scope.throwIfCanceled();
      Nft.assertNftOrSftWithToken(asset);
      assert["default"](asset.metadataAddress.equals(lazyBid.metadataAddress), `Asset metadata address must be ${lazyBid.metadataAddress}`);
      return { ...bid,
        isPublic: false,
        asset,
        tokens: Amount.amount(lazyBid.tokens, asset.mint.currency)
      };
    } else {
      const asset = await metaplex.nfts().findByMetadata({
        metadata: lazyBid.metadataAddress,
        commitment,
        loadJsonMetadata
      }).run(scope);
      scope.throwIfCanceled();
      return { ...bid,
        isPublic: true,
        asset,
        tokens: Amount.amount(lazyBid.tokens, asset.mint.currency)
      };
    }
  }
};

exports.loadBidOperation = loadBidOperation;
exports.loadBidOperationHandler = loadBidOperationHandler;
//# sourceMappingURL=loadBid.cjs.map
