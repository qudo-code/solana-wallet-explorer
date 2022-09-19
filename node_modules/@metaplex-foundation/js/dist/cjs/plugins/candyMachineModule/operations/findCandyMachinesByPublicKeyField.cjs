'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts = require('../accounts.cjs');
var CandyMachine = require('../models/CandyMachine.cjs');
var pdas = require('../pdas.cjs');
var program = require('../program.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var common = require('../../../utils/common.cjs');
var Operation = require('../../../types/Operation.cjs');

// Operation
// -----------------

const Key = 'FindCandyMachinesByPublicKeyOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findCandyMachinesByPublicKeyFieldOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findCandyMachinesByPublicKeyFieldOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      type,
      publicKey,
      commitment
    } = operation.input;
    const accounts$1 = program.CandyMachineProgram.accounts(metaplex).mergeConfig({
      commitment
    });
    let candyMachineQuery;

    switch (type) {
      case 'authority':
        candyMachineQuery = accounts$1.candyMachineAccountsForAuthority(publicKey);
        break;

      case 'wallet':
        candyMachineQuery = accounts$1.candyMachineAccountsForWallet(publicKey);
        break;

      default:
        throw new SdkError.UnreachableCaseError(type);
    }

    const unparsedAccounts = await candyMachineQuery.get();
    scope.throwIfCanceled();
    const collectionPdas = unparsedAccounts.map(unparsedAccount => pdas.findCandyMachineCollectionPda(unparsedAccount.publicKey));
    const unparsedCollectionAccounts = await metaplex.rpc().getMultipleAccounts(collectionPdas, commitment);
    scope.throwIfCanceled();
    return common.zipMap(unparsedAccounts, unparsedCollectionAccounts, (unparsedAccount, unparsedCollectionAccount) => {
      const account = accounts.parseCandyMachineAccount(unparsedAccount);
      const collectionAccount = unparsedCollectionAccount ? accounts.parseCandyMachineCollectionAccount(unparsedCollectionAccount) : null;
      return CandyMachine.toCandyMachine(account, unparsedAccount, collectionAccount);
    });
  }
};

exports.findCandyMachinesByPublicKeyFieldOperation = findCandyMachinesByPublicKeyFieldOperation;
exports.findCandyMachinesByPublicKeyFieldOperationHandler = findCandyMachinesByPublicKeyFieldOperationHandler;
//# sourceMappingURL=findCandyMachinesByPublicKeyField.cjs.map
