import assert from '../../utils/assert.mjs';
import { useOperation } from '../../types/Operation.mjs';
import { assertNftOrSftWithToken } from '../nftModule/models/Nft.mjs';
import { amount } from '../../types/Amount.mjs';

// Operation
// -----------------

const Key = 'LoadBidOperation';
/**
 * @group Operations
 * @category Constructors
 */

const loadBidOperation = useOperation(Key);
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
      assertNftOrSftWithToken(asset);
      assert(asset.metadataAddress.equals(lazyBid.metadataAddress), `Asset metadata address must be ${lazyBid.metadataAddress}`);
      return { ...bid,
        isPublic: false,
        asset,
        tokens: amount(lazyBid.tokens, asset.mint.currency)
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
        tokens: amount(lazyBid.tokens, asset.mint.currency)
      };
    }
  }
};

export { loadBidOperation, loadBidOperationHandler };
//# sourceMappingURL=loadBid.mjs.map
