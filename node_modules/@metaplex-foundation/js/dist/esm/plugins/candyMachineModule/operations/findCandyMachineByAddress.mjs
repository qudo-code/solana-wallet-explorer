import { toCandyMachineAccount, parseCandyMachineCollectionAccount } from '../accounts.mjs';
import { toCandyMachine } from '../models/CandyMachine.mjs';
import { findCandyMachineCollectionPda } from '../pdas.mjs';
import { assertAccountExists } from '../../../types/Account.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindCandyMachineByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findCandyMachineByAddressOperation = useOperation(Key);
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
    const collectionPda = findCandyMachineCollectionPda(address);
    const accounts = await metaplex.rpc().getMultipleAccounts([address, collectionPda], commitment);
    const unparsedAccount = accounts[0];
    assertAccountExists(unparsedAccount);
    const account = toCandyMachineAccount(unparsedAccount);
    const collectionAccount = parseCandyMachineCollectionAccount(accounts[1]);
    return toCandyMachine(account, unparsedAccount, collectionAccount);
  }
};

export { findCandyMachineByAddressOperation, findCandyMachineByAddressOperationHandler };
//# sourceMappingURL=findCandyMachineByAddress.mjs.map
