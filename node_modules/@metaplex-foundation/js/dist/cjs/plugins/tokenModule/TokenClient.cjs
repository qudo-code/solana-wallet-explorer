'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TokenBuildersClient = require('./TokenBuildersClient.cjs');
var findMintByAddress = require('./operations/findMintByAddress.cjs');
var findTokenByAddress = require('./operations/findTokenByAddress.cjs');
var findTokenWithMintByAddress = require('./operations/findTokenWithMintByAddress.cjs');
var findTokenWithMintByMint = require('./operations/findTokenWithMintByMint.cjs');
var createMint = require('./operations/createMint.cjs');
var createToken = require('./operations/createToken.cjs');
var createTokenWithMint = require('./operations/createTokenWithMint.cjs');
var mintTokens = require('./operations/mintTokens.cjs');
var sendTokens = require('./operations/sendTokens.cjs');
var freezeTokens = require('./operations/freezeTokens.cjs');
var thawTokens = require('./operations/thawTokens.cjs');
var approveTokenDelegateAuthority = require('./operations/approveTokenDelegateAuthority.cjs');
var revokeTokenDelegateAuthority = require('./operations/revokeTokenDelegateAuthority.cjs');

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
    return new TokenBuildersClient.TokenBuildersClient(this.metaplex);
  } // -----------------
  // Queries
  // -----------------

  /** {@inheritDoc findMintByAddressOperation} */


  findMintByAddress(input) {
    return this.metaplex.operations().getTask(findMintByAddress.findMintByAddressOperation(input));
  }
  /** {@inheritDoc findTokenByAddressOperation} */


  findTokenByAddress(input) {
    return this.metaplex.operations().getTask(findTokenByAddress.findTokenByAddressOperation(input));
  }
  /** {@inheritDoc findTokenWithMintByAddressOperation} */


  findTokenWithMintByAddress(input) {
    return this.metaplex.operations().getTask(findTokenWithMintByAddress.findTokenWithMintByAddressOperation(input));
  }
  /** {@inheritDoc findTokenWithMintByMintOperation} */


  findTokenWithMintByMint(input) {
    return this.metaplex.operations().getTask(findTokenWithMintByMint.findTokenWithMintByMintOperation(input));
  } // -----------------
  // Create
  // -----------------

  /** {@inheritDoc createMintOperation} */


  createMint(input) {
    return this.metaplex.operations().getTask(createMint.createMintOperation(input !== null && input !== void 0 ? input : {}));
  }
  /**
   * Create a new Token account from the provided input
   * and returns the newly created `Token` model.
   */

  /** {@inheritDoc createTokenOperation} */


  createToken(input) {
    return this.metaplex.operations().getTask(createToken.createTokenOperation(input));
  }
  /** {@inheritDoc createTokenWithMintOperation} */


  createTokenWithMint(input = {}) {
    return this.metaplex.operations().getTask(createTokenWithMint.createTokenWithMintOperation(input));
  } // -----------------
  // Update
  // -----------------

  /** {@inheritDoc mintTokensOperation} */


  mint(input) {
    return this.metaplex.operations().getTask(mintTokens.mintTokensOperation(input));
  }
  /** {@inheritDoc sendTokensOperation} */


  send(input) {
    return this.metaplex.operations().getTask(sendTokens.sendTokensOperation(input));
  }
  /** {@inheritDoc freezeTokensOperation} */


  freeze(input) {
    return this.metaplex.operations().getTask(freezeTokens.freezeTokensOperation(input));
  }
  /** {@inheritDoc thawTokensOperation} */


  thaw(input) {
    return this.metaplex.operations().getTask(thawTokens.thawTokensOperation(input));
  } // -----------------
  // Delegate
  // -----------------

  /** {@inheritDoc approveTokenDelegateAuthorityOperation} */


  approveDelegateAuthority(input) {
    return this.metaplex.operations().getTask(approveTokenDelegateAuthority.approveTokenDelegateAuthorityOperation(input));
  }
  /** {@inheritDoc revokeTokenDelegateAuthorityOperation} */


  revokeDelegateAuthority(input) {
    return this.metaplex.operations().getTask(revokeTokenDelegateAuthority.revokeTokenDelegateAuthorityOperation(input));
  }

}

exports.TokenClient = TokenClient;
//# sourceMappingURL=TokenClient.cjs.map
