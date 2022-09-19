import { createMintBuilder } from './operations/createMint.mjs';
import { createTokenBuilder, createTokenIfMissingBuilder } from './operations/createToken.mjs';
import { createTokenWithMintBuilder } from './operations/createTokenWithMint.mjs';
import { mintTokensBuilder } from './operations/mintTokens.mjs';
import { sendTokensBuilder } from './operations/sendTokens.mjs';
import { freezeTokensBuilder } from './operations/freezeTokens.mjs';
import { thawTokensBuilder } from './operations/thawTokens.mjs';
import { approveTokenDelegateAuthorityBuilder } from './operations/approveTokenDelegateAuthority.mjs';
import { revokeTokenDelegateAuthorityBuilder } from './operations/revokeTokenDelegateAuthority.mjs';

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
    return createMintBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenBuilder} */


  createToken(input) {
    return createTokenBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenIfMissingBuilder} */


  createTokenIfMissing(input) {
    return createTokenIfMissingBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createTokenWithMintBuilder} */


  createTokenWithMint(input) {
    return createTokenWithMintBuilder(this.metaplex, input);
  } // -----------------
  // Update
  // -----------------

  /** {@inheritDoc mintTokensBuilder} */


  mint(input) {
    return mintTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc sendTokensBuilder} */


  send(input) {
    return sendTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc freezeTokensBuilder} */


  freeze(input) {
    return freezeTokensBuilder(this.metaplex, input);
  }
  /** {@inheritDoc thawTokensBuilder} */


  thaw(input) {
    return thawTokensBuilder(this.metaplex, input);
  } // -----------------
  // Delegate
  // -----------------

  /** {@inheritDoc approveTokenDelegateAuthorityBuilder} */


  approveDelegateAuthority(input) {
    return approveTokenDelegateAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeTokenDelegateAuthorityBuilder} */


  revokeDelegateAuthority(input) {
    return revokeTokenDelegateAuthorityBuilder(this.metaplex, input);
  }

}

export { TokenBuildersClient };
//# sourceMappingURL=TokenBuildersClient.mjs.map
