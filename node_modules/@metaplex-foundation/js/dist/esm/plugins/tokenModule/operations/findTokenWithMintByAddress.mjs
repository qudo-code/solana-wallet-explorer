import { toTokenAccount, toMintAccount } from '../accounts.mjs';
import { toMint } from '../models/Mint.mjs';
import { toTokenWithMint } from '../models/Token.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenWithMintByAddressOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenWithMintByAddressOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenWithMintByAddressOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      address,
      commitment
    } = operation.input;
    const tokenAccount = toTokenAccount(await metaplex.rpc().getAccount(address, commitment));
    const mintAccount = toMintAccount(await metaplex.rpc().getAccount(tokenAccount.data.mint, commitment));
    return toTokenWithMint(tokenAccount, toMint(mintAccount));
  }
};

export { findTokenWithMintByAddressOperation, findTokenWithMintByAddressOperationHandler };
//# sourceMappingURL=findTokenWithMintByAddress.mjs.map
