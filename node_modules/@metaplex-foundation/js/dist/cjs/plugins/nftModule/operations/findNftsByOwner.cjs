'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findNftsByMintList = require('./findNftsByMintList.cjs');
var Operation = require('../../../types/Operation.cjs');
var program = require('../../tokenModule/program.cjs');

// Operation
// -----------------

const Key = 'FindNftsByOwnerOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByOwnerOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByOwnerOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      owner,
      commitment
    } = operation.input;
    const mints = await program.TokenProgram.tokenAccounts(metaplex).selectMint().whereOwner(owner).whereAmount(1).getDataAsPublicKeys();
    scope.throwIfCanceled();
    const nfts = await metaplex.operations().execute(findNftsByMintList.findNftsByMintListOperation({
      mints,
      commitment
    }), scope);
    scope.throwIfCanceled();
    return nfts.filter(nft => nft !== null);
  }
};

exports.findNftsByOwnerOperation = findNftsByOwnerOperation;
exports.findNftsByOwnerOperationHandler = findNftsByOwnerOperationHandler;
//# sourceMappingURL=findNftsByOwner.cjs.map
