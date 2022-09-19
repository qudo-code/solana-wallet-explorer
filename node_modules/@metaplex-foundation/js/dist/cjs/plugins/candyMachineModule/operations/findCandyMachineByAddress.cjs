'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var CandyMachine = require('../models/CandyMachine.cjs');
var pdas = require('../pdas.cjs');
var Account = require('../../../types/Account.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindCandyMachineByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findCandyMachineByAddressOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findCandyMachineByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const collectionPda = pdas.findCandyMachineCollectionPda(address);
    const accounts$1 = await metaplex.rpc().getMultipleAccounts([address, collectionPda], commitment);
    const unparsedAccount = accounts$1[0];
    Account.assertAccountExists(unparsedAccount);
    const account = accounts.toCandyMachineAccount(unparsedAccount);
    const collectionAccount = accounts.parseCandyMachineCollectionAccount(accounts$1[1]);
    return CandyMachine.toCandyMachine(account, unparsedAccount, collectionAccount);
  }
};

exports.findCandyMachineByAddressOperation = findCandyMachineByAddressOperation;
exports.findCandyMachineByAddressOperationHandler = findCandyMachineByAddressOperationHandler;
//# sourceMappingURL=findCandyMachineByAddress.cjs.map
