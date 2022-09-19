'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var Mint = require('../models/Mint.cjs');
var Token = require('../models/Token.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindTokenWithMintByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenWithMintByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenWithMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const tokenAccount = accounts.toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    const mintAccount = accounts.toMintAccount(await metaplex.rpc().getAccount(tokenAccount.data.mint, commitment));
    return Token.toTokenWithMint(tokenAccount, Mint.toMint(mintAccount));
  }
};

exports.findTokenWithMintByAddressOperation = findTokenWithMintByAddressOperation;
exports.findTokenWithMintByAddressOperationHandler = findTokenWithMintByAddressOperationHandler;
//# sourceMappingURL=findTokenWithMintByAddress.cjs.map
