import { parseCandyMachineAccount, parseCandyMachineCollectionAccount } from '../accounts.mjs';
import { toCandyMachine } from '../models/CandyMachine.mjs';
import { findCandyMachineCollectionPda } from '../pdas.mjs';
import { CandyMachineProgram } from '../program.mjs';
import { UnreachableCaseError } from '../../../errors/SdkError.mjs';
import { zipMap } from '../../../utils/common.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindCandyMachinesByPublicKeyOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findCandyMachinesByPublicKeyFieldOperation = useOperation(Key);
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
    const accounts = CandyMachineProgram.accounts(metaplex).mergeConfig({
      commitment
    });
    let candyMachineQuery;

    switch (type) {
      case 'authority':
        candyMachineQuery = accounts.candyMachineAccountsForAuthority(publicKey);
        break;

      case 'wallet':
        candyMachineQuery = accounts.candyMachineAccountsForWallet(publicKey);
        break;

      default:
        throw new UnreachableCaseError(type);
    }

    const unparsedAccounts = await candyMachineQuery.get();
    scope.throwIfCanceled();
    const collectionPdas = unparsedAccounts.map(unparsedAccount => findCandyMachineCollectionPda(unparsedAccount.publicKey));
    const unparsedCollectionAccounts = await metaplex.rpc().getMultipleAccounts(collectionPdas, commitment);
    scope.throwIfCanceled();
    return zipMap(unparsedAccounts, unparsedCollectionAccounts, (unparsedAccount, unparsedCollectionAccount) => {
      const account = parseCandyMachineAccount(unparsedAccount);
      const collectionAccount = unparsedCollectionAccount ? parseCandyMachineCollectionAccount(unparsedCollectionAccount) : null;
      return toCandyMachine(account, unparsedAccount, collectionAccount);
    });
  }
};

export { findCandyMachinesByPublicKeyFieldOperation, findCandyMachinesByPublicKeyFieldOperationHandler };
//# sourceMappingURL=findCandyMachinesByPublicKeyField.mjs.map
