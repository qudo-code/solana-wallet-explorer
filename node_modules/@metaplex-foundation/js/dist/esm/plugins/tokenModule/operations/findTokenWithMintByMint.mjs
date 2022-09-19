import { toMintAccount, toTokenAccount } from '../accounts.mjs';
import { TokenAndMintDoNotMatchError } from '../errors.mjs';
import { toMint } from '../models/Mint.mjs';
import { findAssociatedTokenAccountPda } from '../pdas.mjs';
import { toTokenWithMint } from '../models/Token.mjs';
import { useOperation } from '../../../types/Operation.mjs';

// Operation
// -----------------

const Key = 'FindTokenWithMintByMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findTokenWithMintByMintOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findTokenWithMintByMintOperationHandler = {
  handle: async (operation, metaplex) => {
    const {
      mint,
      address,
      addressType,
      commitment
    } = operation.input;
    const tokenAddress = addressType === 'owner' ? findAssociatedTokenAccountPda(mint, address) : address;
    const accounts = await metaplex.rpc().getMultipleAccounts([mint, tokenAddress], commitment);
    const mintAccount = toMintAccount(accounts[0]);
    const tokenAccount = toTokenAccount(accounts[1]);

    if (!tokenAccount.data.mint.equals(mint)) {
      throw new TokenAndMintDoNotMatchError(tokenAddress, tokenAccount.data.mint, mint);
    }

    return toTokenWithMint(tokenAccount, toMint(mintAccount));
  }
};

export { findTokenWithMintByMintOperation, findTokenWithMintByMintOperationHandler };
//# sourceMappingURL=findTokenWithMintByMint.mjs.map
