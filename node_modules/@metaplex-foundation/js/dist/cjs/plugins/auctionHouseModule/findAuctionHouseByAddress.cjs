'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('./accounts.cjs');
var AuctionHouse = require('./AuctionHouse.cjs');
var pdas = require('./pdas.cjs');
var errors = require('./errors.cjs');
var Operation = require('../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindAuctionHouseByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findAuctionHouseByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findAuctionHouseByAddressOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      address,
      auctioneerAuthority,
      commitment
    } = operation.input;
    const auctioneerPda = auctioneerAuthority ? pdas.findAuctioneerPda(address, auctioneerAuthority) : undefined;
    const accountsToFetch = [address, auctioneerPda].filter(account => !!account);
    const accounts$1 = await metaplex.rpc().getMultipleAccounts(accountsToFetch, commitment);
    scope.throwIfCanceled();
    const auctionHouseAccount = accounts.toAuctionHouseAccount(accounts$1[0]);
    const mintModel = await metaplex.tokens().findMintByAddress({
      address: auctionHouseAccount.data.treasuryMint,
      commitment
    }).run(scope);
    scope.throwIfCanceled();

    if (!auctionHouseAccount.data.hasAuctioneer) {
      return AuctionHouse.toAuctionHouse(auctionHouseAccount, mintModel);
    }

    if (!accounts$1[1] || !accounts$1[1].exists) {
      throw new errors.AuctioneerAuthorityRequiredError();
    }

    const auctioneerAccount = accounts.toAuctioneerAccount(accounts$1[1]);
    return AuctionHouse.toAuctionHouse(auctionHouseAccount, mintModel, auctioneerAccount);
  }
};

exports.findAuctionHouseByAddressOperation = findAuctionHouseByAddressOperation;
exports.findAuctionHouseByAddressOperationHandler = findAuctionHouseByAddressOperationHandler;
//# sourceMappingURL=findAuctionHouseByAddress.cjs.map
