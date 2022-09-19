import { toTokenAccount } from '../accounts.mjs';
import { toToken } from '../models/Token.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenByAddressOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    return toToken(account);
  }
};

export { findTokenByAddressOperation, findTokenByAddressOperationHandler };
//# sourceMappingURL=findTokenByAddress.mjs.map
