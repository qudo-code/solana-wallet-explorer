import { TokenBuildersClient } from './TokenBuildersClient.mjs';
import { findMintByAddressOperation } from './operations/findMintByAddress.mjs';
import { findTokenByAddressOperation } from './operations/findTokenByAddress.mjs';
import { findTokenWithMintByAddressOperation } from './operations/findTokenWithMintByAddress.mjs';
import { findTokenWithMintByMintOperation } from './operations/findTokenWithMintByMint.mjs';
import { createMintOperation } from './operations/createMint.mjs';
import { createTokenOperation } from './operations/createToken.mjs';
import { createTokenWithMintOperation } from './operations/createTokenWithMint.mjs';
import { mintTokensOperation } from './operations/mintTokens.mjs';
import { sendTokensOperation } from './operations/sendTokens.mjs';
import { freezeTokensOperation } from './operations/freezeTokens.mjs';
import { thawTokensOperation } from './operations/thawTokens.mjs';
import { approveTokenDelegateAuthorityOperation } from './operations/approveTokenDelegateAuthority.mjs';
import { revokeTokenDelegateAuthorityOperation } from './operations/revokeTokenDelegateAuthority.mjs';

/**
 * This is a client for the Token module.
 *
 * It enables us to interact with the SPL Token program in order to
 * create, send, freeze, thaw, and mint tokens.
 *
 * You may access this client via the `tokens()` method of your `Metaplex` instance.
 *
 * ```ts
 * const tokenClient = metaplex.tokens();
 * ```
 *
 * @example
 * You can create a new mint account with an associated token account like so.
 * The owner of this token account will, by default, be the current identity
 * of the metaplex instance.
 *
 * ```ts
 * const { token } = await metaplex.tokens().createTokenWithMint();
 * ```
 *
 * @group Modules
 */

class TokenClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /**
   * You may use the `builders()` client to access the
   * underlying Transaction Builders of this module.
   */


  builders() {
    return new TokenBuildersClient(this.metaplex);
  } // -----------------
  // Queries
  // -----------------

  /** {@inheritDoc findMintByAddressOperation} */


  findMintByAddress(input) {
    return this.metaplex.operations().getTask(findMintByAddressOperation(input));
  }
  /** {@inheritDoc findTokenByAddressOperation} */


  findTokenByAddress(input) {
    return this.metaplex.operations().getTask(findTokenByAddressOperation(input));
  }
  /** {@inheritDoc findTokenWithMintByAddressOperation} */


  findTokenWithMintByAddress(input) {
    return this.metaplex.operations().getTask(findTokenWithMintByAddressOperation(input));
  }
  /** {@inheritDoc findTokenWithMintByMintOperation} */


  findTokenWithMintByMint(input) {
    return this.metaplex.operations().getTask(findTokenWithMintByMintOperation(input));
  } // -----------------
  // Create
  // -----------------

  /** {@inheritDoc createMintOperation} */


  createMint(input) {
    return this.metaplex.operations().getTask(createMintOperation(input !== null && input !== void 0 ? input : {}));
  }
  /**
   * Create a new Token account from the provided input
   * and returns the newly created `Token` model.
   */

  /** {@inheritDoc createTokenOperation} */


  createToken(input) {
    return this.metaplex.operations().getTask(createTokenOperation(input));
  }
  /** {@inheritDoc createTokenWithMintOperation} */


  createTokenWithMint(input = {}) {
    return this.metaplex.operations().getTask(createTokenWithMintOperation(input));
  } // -----------------
  // Update
  // -----------------

  /** {@inheritDoc mintTokensOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintTokensOperation(input));
  }
  /** {@inheritDoc sendTokensOperation} */


  send(input) {
    return this.metaplex.operations().getTask(sendTokensOperation(input));
  }
  /** {@inheritDoc freezeTokensOperation} */


  freeze(input) {
    return this.metaplex.operations().getTask(freezeTokensOperation(input));
  }
  /** {@inheritDoc thawTokensOperation} */


  thaw(input) {
    return this.metaplex.operations().getTask(thawTokensOperation(input));
  } // -----------------
  // Delegate
  // -----------------

  /** {@inheritDoc approveTokenDelegateAuthorityOperation} */


  approveDelegateAuthority(input) {
    return this.metaplex.operations().getTask(approveTokenDelegateAuthorityOperation(input));
  }
  /** {@inheritDoc revokeTokenDelegateAuthorityOperation} */


  revokeDelegateAuthority(input) {
    return this.metaplex.operations().getTask(revokeTokenDelegateAuthorityOperation(input));
  }

}

export { TokenClient };
//# sourceMappingURL=TokenClient.mjs.map
