import { toAuctionHouseAccount, toAuctioneerAccount } from './accounts.mjs';
import { toAuctionHouse } from './AuctionHouse.mjs';
import { findAuctioneerPda } from './pdas.mjs';
import { AuctioneerAuthorityRequiredError } from './errors.mjs';
import { useOperation } from '../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindAuctionHouseByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findAuctionHouseByAddressOperation = useOperation(Key);
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
    const auctioneerPda = auctioneerAuthority ? findAuctioneerPda(address, auctioneerAuthority) : undefined;
    const accountsToFetch = [address, auctioneerPda].filter(account => !!account);
    const accounts = await metaplex.rpc().getMultipleAccounts(accountsToFetch, commitment);
    scope.throwIfCanceled();
    const auctionHouseAccount = toAuctionHouseAccount(accounts[0]);
    const mintModel = await metaplex.tokens().findMintByAddress({
      address: auctionHouseAccount.data.treasuryMint,
      commitment
    }).run(scope);
    scope.throwIfCanceled();

    if (!auctionHouseAccount.data.hasAuctioneer) {
      return toAuctionHouse(auctionHouseAccount, mintModel);
    }

    if (!accounts[1] || !accounts[1].exists) {
      throw new AuctioneerAuthorityRequiredError();
    }

    const auctioneerAccount = toAuctioneerAccount(accounts[1]);
    return toAuctionHouse(auctionHouseAccount, mintModel, auctioneerAccount);
  }
};

export { findAuctionHouseByAddressOperation, findAuctionHouseByAddressOperationHandler };
//# sourceMappingURL=findAuctionHouseByAddress.mjs.map
