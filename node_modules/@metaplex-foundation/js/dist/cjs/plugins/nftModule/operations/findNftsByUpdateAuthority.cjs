'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var program = require('../program.cjs');
var findNftsByMintList = require('./findNftsByMintList.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindNftsByUpdateAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByUpdateAuthorityOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByUpdateAuthorityOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      updateAuthority,
      commitment
    } = operation.input;
    const mints = await program.TokenMetadataProgram.metadataV1Accounts(metaplex).selectMint().whereUpdateAuthority(updateAuthority).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintList.findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

exports.findNftsByUpdateAuthorityOperation = findNftsByUpdateAuthorityOperation;
exports.findNftsByUpdateAuthorityOperationHandler = findNftsByUpdateAuthorityOperationHandler;
//# sourceMappingURL=findNftsByUpdateAuthority.cjs.map
