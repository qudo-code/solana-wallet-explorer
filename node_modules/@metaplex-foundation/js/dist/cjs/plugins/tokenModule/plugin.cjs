'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var splToken = require('@solana/spl-token');
var TokenClient = require('./TokenClient.cjs');
var approveTokenDelegateAuthority = require('./operations/approveTokenDelegateAuthority.cjs');
var createMint = require('./operations/createMint.cjs');
var createToken = require('./operations/createToken.cjs');
var createTokenWithMint = require('./operations/createTokenWithMint.cjs');
var findMintByAddress = require('./operations/findMintByAddress.cjs');
var findTokenByAddress = require('./operations/findTokenByAddress.cjs');
var findTokenWithMintByAddress = require('./operations/findTokenWithMintByAddress.cjs');
var findTokenWithMintByMint = require('./operations/findTokenWithMintByMint.cjs');
var freezeTokens = require('./operations/freezeTokens.cjs');
var mintTokens = require('./operations/mintTokens.cjs');
var revokeTokenDelegateAuthority = require('./operations/revokeTokenDelegateAuthority.cjs');
var sendTokens = require('./operations/sendTokens.cjs');
var thawTokens = require('./operations/thawTokens.cjs');

/**
 * @group Plugins
 */

/** @group Plugins */

const tokenModule = () => ({
  install(metaplex) {
    // Program.
    metaplex.programs().register({
      name: 'TokenProgram',
      address: splToken.TOKEN_PROGRAM_ID
    }); // Operations.

    const op = metaplex.operations();
    op.register(approveTokenDelegateAuthority.approveTokenDelegateAuthorityOperation, approveTokenDelegateAuthority.approveTokenDelegateAuthorityOperationHandler);
    op.register(createMint.createMintOperation, createMint.createMintOperationHandler);
    op.register(createToken.createTokenOperation, createToken.createTokenOperationHandler);
    op.register(createTokenWithMint.createTokenWithMintOperation, createTokenWithMint.createTokenWithMintOperationHandler);
    op.register(findMintByAddress.findMintByAddressOperation, findMintByAddress.findMintByAddressOperationHandler);
    op.register(findTokenByAddress.findTokenByAddressOperation, findTokenByAddress.findTokenByAddressOperationHandler);
    op.register(findTokenWithMintByAddress.findTokenWithMintByAddressOperation, findTokenWithMintByAddress.findTokenWithMintByAddressOperationHandler);
    op.register(findTokenWithMintByMint.findTokenWithMintByMintOperation, findTokenWithMintByMint.findTokenWithMintByMintOperationHandler);
    op.register(freezeTokens.freezeTokensOperation, freezeTokens.freezeTokensOperationHandler);
    op.register(mintTokens.mintTokensOperation, mintTokens.mintTokensOperationHandler);
    op.register(revokeTokenDelegateAuthority.revokeTokenDelegateAuthorityOperation, revokeTokenDelegateAuthority.revokeTokenDelegateAuthorityOperationHandler);
    op.register(sendTokens.sendTokensOperation, sendTokens.sendTokensOperationHandler);
    op.register(thawTokens.thawTokensOperation, thawTokens.thawTokensOperationHandler);

    metaplex.tokens = function () {
      return new TokenClient.TokenClient(this);
    };
  }

});

exports.tokenModule = tokenModule;
//# sourceMappingURL=plugin.cjs.map
