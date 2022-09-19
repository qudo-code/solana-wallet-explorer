import { toMintAccount } from '../accounts.mjs';
import { toMint } from '../models/Mint.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindMintByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findMintByAddressOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const account = toMintAccount(await metaplex.rpc().getAccount(address, commitment));
    return toMint(account);
  }
};

export { findMintByAddressOperation, findMintByAddressOperationHandler };
//# sourceMappingURL=findMintByAddress.mjs.map
