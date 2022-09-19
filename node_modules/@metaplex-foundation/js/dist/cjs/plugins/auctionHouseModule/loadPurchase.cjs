'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Operation = require('../../types/Operation.cjs');
var Nft = require('../nftModule/models/Nft.cjs');
var Amount = require('../../types/Amount.cjs');

// Operation
// -----------------

const Key = 'LoadPurchaseOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadPurchaseOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const loadPurchaseOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      lazyPurchase,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const asset = await metaplex.nfts().findByMetadata({
      metadata: lazyPurchase.metadataAddress,
      tokenOwner: lazyPurchase.buyerAddress,
      commitment,
      loadJsonMetadata
    }).run(scope);
    Nft.assertNftOrSftWithToken(asset);
    return { ...lazyPurchase,
      lazy: false,
      isPublic: false,
      asset,
      tokens: Amount.amount(lazyPurchase.tokens, asset.mint.currency)
    };
  }
};

exports.loadPurchaseOperation = loadPurchaseOperation;
exports.loadPurchaseOperationHandler = loadPurchaseOperationHandler;
//# sourceMappingURL=loadPurchase.cjs.map
