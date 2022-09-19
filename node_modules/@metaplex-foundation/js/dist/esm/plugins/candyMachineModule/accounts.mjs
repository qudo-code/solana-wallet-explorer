import { CandyMachine, CollectionPDA } from '@metaplex-foundation/mpl-candy-machine';
import { getAccountParsingFunction, getAccountParsingAndAssertingFunction } from '../../types/Account.mjs';

/** @group Accounts */

/** @group Account Helpers */
const parseCandyMachineAccount = getAccountParsingFunction(CandyMachine);
/** @group Account Helpers */

const toCandyMachineAccount = getAccountParsingAndAssertingFunction(CandyMachine);
/** @group Accounts */

/** @group Account Helpers */
const parseCandyMachineCollectionAccount = getAccountParsingFunction(CollectionPDA);
/** @group Account Helpers */

const toCandyMachineCollectionAccount = getAccountParsingAndAssertingFunction(CollectionPDA);

export { parseCandyMachineAccount, parseCandyMachineCollectionAccount, toCandyMachineAccount, toCandyMachineCollectionAccount };
//# sourceMappingURL=accounts.mjs.map
