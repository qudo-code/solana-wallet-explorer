'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('../../utils/assert.cjs');
var Pda = require('../../types/Pda.cjs');

const isAuctionHouse = value => typeof value === 'object' && value.model === 'auctionHouse';
function assertAuctionHouse(value) {
  assert["default"](isAuctionHouse(value), `Expected AuctionHouse type`);
}
const isAuctioneerAuctionHouse = value => isAuctionHouse(value) && value.hasAuctioneer;
function assertAuctioneerAuctionHouse(value) {
  assert["default"](isAuctioneerAuctionHouse(value), `Expected AuctioneerAuctionHouse type`);
}
const toAuctionHouse = (auctionHouseAccount, treasuryMint, auctioneerAccount) => {
  if (auctionHouseAccount.data.hasAuctioneer) {
    assert["default"](!!auctioneerAccount, 'Auctioneer account is required when hasAuctioneer is true');
    assert["default"](!!auctioneerAccount && auctioneerAccount.data.auctionHouse.equals(auctionHouseAccount.publicKey), 'Auctioneer account does not match the AuctionHouse account');
  }

  return {
    model: 'auctionHouse',
    address: new Pda.Pda(auctionHouseAccount.publicKey, auctionHouseAccount.data.bump),
    creatorAddress: auctionHouseAccount.data.creator,
    authorityAddress: auctionHouseAccount.data.authority,
    treasuryMint,
    feeAccountAddress: new Pda.Pda(auctionHouseAccount.data.auctionHouseFeeAccount, auctionHouseAccount.data.feePayerBump),
    treasuryAccountAddress: new Pda.Pda(auctionHouseAccount.data.auctionHouseTreasury, auctionHouseAccount.data.treasuryBump),
    feeWithdrawalDestinationAddress: auctionHouseAccount.data.feeWithdrawalDestination,
    treasuryWithdrawalDestinationAddress: auctionHouseAccount.data.treasuryWithdrawalDestination,
    sellerFeeBasisPoints: auctionHouseAccount.data.sellerFeeBasisPoints,
    requiresSignOff: auctionHouseAccount.data.requiresSignOff,
    canChangeSalePrice: auctionHouseAccount.data.canChangeSalePrice,
    isNative: treasuryMint.isWrappedSol,
    // Auctioneer.
    ...(auctionHouseAccount.data.hasAuctioneer && auctioneerAccount ? {
      hasAuctioneer: true,
      auctioneer: {
        address: auctioneerAccount.publicKey,
        authority: auctioneerAccount.data.auctioneerAuthority,
        scopes: auctioneerAccount.data.scopes.reduce((acc, isAllowed, index) => isAllowed ? [...acc, index] : acc, [])
      }
    } : {
      hasAuctioneer: false
    })
  };
};

exports.assertAuctionHouse = assertAuctionHouse;
exports.assertAuctioneerAuctionHouse = assertAuctioneerAuctionHouse;
exports.isAuctionHouse = isAuctionHouse;
exports.isAuctioneerAuctionHouse = isAuctioneerAuctionHouse;
exports.toAuctionHouse = toAuctionHouse;
//# sourceMappingURL=AuctionHouse.cjs.map
