'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Operation = require('../../../types/Operation.cjs');

// -----------------
// Operation
// -----------------
const Key = 'FindNftByMetadataOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftByMetadataOperation = Operation.useOperation(Key);
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
    const metadata = accounts.toMetadataAccount(await metaplex.rpc().getAccount(operation.input.metadata));
    scope.throwIfCanceled();
    return metaplex.nfts().findByMint({ ...operation.input,
      mintAddress: metadata.data.mint
    }).run(scope);
  }
};

exports.findNftByMetadataOperation = findNftByMetadataOperation;
exports.findNftByMetadataOperationHandler = findNftByMetadataOperationHandler;
//# sourceMappingURL=findNftByMetadata.cjs.map
