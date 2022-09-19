'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Token module.
 *
 * @see {@link TokenClient}
 * @group Module Builders
 * */

class TokenBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  } // -----------------
  // Create
  // -----------------

  /** {@inheritDoc createMintBuilder} */


  createMint(input) {
    return createMint.createMintBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenBuilder} */


  createToken(input) {
    return createToken.createTokenBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenIfMissingBuilder} */


  createTokenIfMissing(input) {
    return createToken.createTokenIfMissingBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenWithMintBuilder} */


  createTokenWithMint(input) {
    return createTokenWithMint.createTokenWithMintBuilder(this.metaplex, input);
  } // -----------------
  // Update
  // -----------------

  /** {@inheritDoc mintTokensBuilder} */


  mint(input) {
    return mintTokens.mintTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc sendTokensBuilder} */


  send(input) {
    return sendTokens.sendTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc freezeTokensBuilder} */


  freeze(input) {
    return freezeTokens.freezeTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc thawTokensBuilder} */


  thaw(input) {
    return thawTokens.thawTokensBuilder(this.metaplex, input);
  } // -----------------
  // Delegate
  // -----------------

  /** {@inheritDoc approveTokenDelegateAuthorityBuilder} */


  approveDelegateAuthority(input) {
    return approveTokenDelegateAuthority.approveTokenDelegateAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeTokenDelegateAuthorityBuilder} */


  revokeDelegateAuthority(input) {
    return revokeTokenDelegateAuthority.revokeTokenDelegateAuthorityBuilder(this.metaplex, input);
  }

}

exports.TokenBuildersClient = TokenBuildersClient;
//# sourceMappingURL=TokenBuildersClient.cjs.map
