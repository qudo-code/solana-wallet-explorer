import { AuthorityScope } from '@metaplex-foundation/mpl-auction-house';
import { toBigNumber } from '../../types/BigNumber.mjs';

const AUCTIONEER_PRICE = toBigNumber('18446744073709551615');
const AUCTIONEER_ALL_SCOPES = [AuthorityScope.Deposit, AuthorityScope.Buy, AuthorityScope.PublicBuy, AuthorityScope.ExecuteSale, AuthorityScope.Sell, AuthorityScope.Cancel, AuthorityScope.Withdraw];

export { AUCTIONEER_ALL_SCOPES, AUCTIONEER_PRICE };
//# sourceMappingURL=constants.mjs.map
