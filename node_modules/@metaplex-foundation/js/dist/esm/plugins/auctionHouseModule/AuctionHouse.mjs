import assert from '../../utils/assert.mjs';
import { Pda } from '../../types/Pda.mjs';

const isAuctionHouse = value => typeof value === 'object' && value.model === 'auctionHouse';
function assertAuctionHouse(value) {
  assert(isAuctionHouse(value), `Expected AuctionHouse type`);
}
const isAuctioneerAuctionHouse = value => isAuctionHouse(value) && value.hasAuctioneer;
function assertAuctioneerAuctionHouse(value) {
  assert(isAuctioneerAuctionHouse(value), `Expected AuctioneerAuctionHouse type`);
}
const toAuctionHouse = (auctionHouseAccount, treasuryMint, auctioneerAccount) => {
  if (auctionHouseAccount.data.hasAuctioneer) {
    assert(!!auctioneerAccount, 'Auctioneer account is required when hasAuctioneer is true');
    assert(!!auctioneerAccount && auctioneerAccount.data.auctionHouse.equals(auctionHouseAccount.publicKey), 'Auctioneer account does not match the AuctionHouse account');
  }

  return {
    model: 'auctionHouse',
    address: new Pda(auctionHouseAccount.publicKey, auctionHouseAccount.data.bump),
    creatorAddress: auctionHouseAccount.data.creator,
    authorityAddress: auctionHouseAccount.data.authority,
    treasuryMint,
    feeAccountAddress: new Pda(auctionHouseAccount.data.auctionHouseFeeAccount, auctionHouseAccount.data.feePayerBump),
    treasuryAccountAddress: new Pda(auctionHouseAccount.data.auctionHouseTreasury, auctionHouseAccount.data.treasuryBump),
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

export { assertAuctionHouse, assertAuctioneerAuctionHouse, isAuctionHouse, isAuctioneerAuctionHouse, toAuctionHouse };
//# sourceMappingURL=AuctionHouse.mjs.map
