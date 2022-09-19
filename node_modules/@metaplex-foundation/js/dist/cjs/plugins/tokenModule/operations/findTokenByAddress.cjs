'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Token = require('../models/Token.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindTokenByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = accounts.toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    return Token.toToken(account);
  }
};

exports.findTokenByAddressOperation = findTokenByAddressOperation;
exports.findTokenByAddressOperationHandler = findTokenByAddressOperationHandler;
//# sourceMappingURL=findTokenByAddress.cjs.map
