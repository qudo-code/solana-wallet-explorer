import { useOperation } from '../../types/Operation.mjs';
import { assertNftOrSftWithToken } from '../nftModule/models/Nft.mjs';
import { amount } from '../../types/Amount.mjs';

// Operation
// -----------------

const Key = 'LoadPurchaseOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadPurchaseOperation = useOperation(Key);
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
    assertNftOrSftWithToken(asset);
    return { ...lazyPurchase,
      lazy: false,
      isPublic: false,
      asset,
      tokens: amount(lazyPurchase.tokens, asset.mint.currency)
    };
  }
};

export { loadPurchaseOperation, loadPurchaseOperationHandler };
//# sourceMappingURL=loadPurchase.mjs.map
