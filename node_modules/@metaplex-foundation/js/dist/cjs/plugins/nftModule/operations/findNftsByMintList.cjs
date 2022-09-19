'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var pdas = require('../pdas.cjs');
var GmaBuilder = require('../../../utils/GmaBuilder.cjs');
var Operation = require('../../../types/Operation.cjs');
var Metadata = require('../models/Metadata.cjs');

// Operation
// -----------------

const Key = 'FindNftsByMintListOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftsByMintListOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftsByMintListOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      mints,
      commitment
    } = operation.input;
    const metadataPdas = mints.map(mint => pdas.findMetadataPda(mint));
    const metadataInfos = await GmaBuilder.GmaBuilder.make(metaplex, metadataPdas, {
      commitment
    }).get();
    scope.throwIfCanceled();
    return metadataInfos.map(account => {
      if (!account.exists) {
        return null;
      }

      try {
        return Metadata.toMetadata(accounts.toMetadataAccount(account));
      } catch (error) {
        return null;
      }
    });
  }
};

exports.findNftsByMintListOperation = findNftsByMintListOperation;
exports.findNftsByMintListOperationHandler = findNftsByMintListOperationHandler;
//# sourceMappingURL=findNftsByMintList.cjs.map
