'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var errors = require('../errors.cjs');
var Mint = require('../models/Mint.cjs');
var pdas = require('../pdas.cjs');
var Token = require('../models/Token.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindTokenWithMintByMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenWithMintByMintOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenWithMintByMintOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      mint,
      address,
      addressType,
      commitment
    } = operation.input;
    const tokenAddress = addressType === 'owner' ? pdas.findAssociatedTokenAccountPda(mint, address) : address;
    const accounts$1 = await metaplex.rpc().getMultipleAccounts([mint, tokenAddress], commitment);
    const mintAccount = accounts.toMintAccount(accounts$1[0]);
    const tokenAccount = accounts.toTokenAccount(accounts$1[1]);

    if (!tokenAccount.data.mint.equals(mint)) {
      throw new errors.TokenAndMintDoNotMatchError(tokenAddress, tokenAccount.data.mint, mint);
    }

    return Token.toTokenWithMint(tokenAccount, Mint.toMint(mintAccount));
  }
};

exports.findTokenWithMintByMintOperation = findTokenWithMintByMintOperation;
exports.findTokenWithMintByMintOperationHandler = findTokenWithMintByMintOperationHandler;
//# sourceMappingURL=findTokenWithMintByMint.cjs.map
