'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var Account = require('../../types/Account.cjs');

/** @group Accounts */

/** @group Account Helpers */
const parseCandyMachineAccount = Account.getAccountParsingFunction(mplCandyMachine.CandyMachine);
/** @group Account Helpers */

const toCandyMachineAccount = Account.getAccountParsingAndAssertingFunction(mplCandyMachine.CandyMachine);
/** @group Accounts */

/** @group Account Helpers */
const parseCandyMachineCollectionAccount = Account.getAccountParsingFunction(mplCandyMachine.CollectionPDA);
/** @group Account Helpers */

const toCandyMachineCollectionAccount = Account.getAccountParsingAndAssertingFunction(mplCandyMachine.CollectionPDA);

exports.parseCandyMachineAccount = parseCandyMachineAccount;
exports.parseCandyMachineCollectionAccount = parseCandyMachineCollectionAccount;
exports.toCandyMachineAccount = toCandyMachineAccount;
exports.toCandyMachineCollectionAccount = toCandyMachineCollectionAccount;
//# sourceMappingURL=accounts.cjs.map
