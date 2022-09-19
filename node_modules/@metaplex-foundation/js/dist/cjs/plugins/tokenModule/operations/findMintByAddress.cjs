'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Mint = require('../models/Mint.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindMintByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findMintByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = accounts.toMintAccount(await metaplex.rpc().getAccount(address, commitment));
    return Mint.toMint(account);
  }
};

exports.findMintByAddressOperation = findMintByAddressOperation;
exports.findMintByAddressOperationHandler = findMintByAddressOperationHandler;
//# sourceMappingURL=findMintByAddress.cjs.map
