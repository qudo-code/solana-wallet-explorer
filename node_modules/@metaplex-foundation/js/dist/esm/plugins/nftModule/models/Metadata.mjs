import { findMetadataPda } from '../pdas.mjs';
import assert from '../../../utils/assert.mjs';
import { removeEmptyChars } from '../../../utils/common.mjs';
import { toBigNumber } from '../../../types/BigNumber.mjs';

/** @group Model Helpers */
const isMetadata = value => typeof value === 'object' && value.model === 'metadata';
/** @group Model Helpers */

function assertMetadata(value) {
  assert(isMetadata(value), `Expected Metadata model`);
}
/** @group Model Helpers */

const toMetadata = (account, json) => {
  var _account$data$data$cr;

  return {
    model: 'metadata',
    address: findMetadataPda(account.data.mint),
    mintAddress: account.data.mint,
    updateAuthorityAddress: account.data.updateAuthority,
    json: json !== null && json !== void 0 ? json : null,
    jsonLoaded: json !== undefined,
    name: removeEmptyChars(account.data.data.name),
    symbol: removeEmptyChars(account.data.data.symbol),
    uri: removeEmptyChars(account.data.data.uri),
    isMutable: account.data.isMutable,
    primarySaleHappened: account.data.primarySaleHappened,
    sellerFeeBasisPoints: account.data.data.sellerFeeBasisPoints,
    editionNonce: account.data.editionNonce,
    creators: (_account$data$data$cr = account.data.data.creators) !== null && _account$data$data$cr !== void 0 ? _account$data$data$cr : [],
    tokenStandard: account.data.tokenStandard,
    collection: account.data.collection ? { ...account.data.collection,
      address: account.data.collection.key
    } : null,
    collectionDetails: account.data.collectionDetails ? {
      version: account.data.collectionDetails.__kind,
      size: toBigNumber(account.data.collectionDetails.size)
    } : null,
    uses: account.data.uses ? { ...account.data.uses,
      remaining: toBigNumber(account.data.uses.remaining),
      total: toBigNumber(account.data.uses.total)
    } : null
  };
};

export { assertMetadata, isMetadata, toMetadata };
//# sourceMappingURL=Metadata.mjs.map
