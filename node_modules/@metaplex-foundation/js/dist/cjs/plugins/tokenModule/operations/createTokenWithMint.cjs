'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3_js = require('@solana/web3.js');
var errors = require('../errors.cjs');
var Operation = require('../../../types/Operation.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

// -----------------
// Operation
// -----------------
const Key = 'CreateTokenWithMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createTokenWithMintOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createTokenWithMintOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createTokenWithMintBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    const token = await metaplex.tokens().findTokenWithMintByMint({
      mint: output.mintSigner.publicKey,
      address: output.tokenAddress,
      addressType: 'token'
    }).run(scope);
    return { ...output,
      token
    };
  }

}; // -----------------
// Builder
// -----------------

/**
 * @group Transaction Builders
 * @category Inputs
 */

/**
 * @group Transaction Builders
 * @category Constructors
 */
const createTokenWithMintBuilder = async (metaplex, params) => {
  var _params$createMintAcc, _params$initializeMin, _params$createAssocia, _params$createTokenAc, _params$initializeTok;

  const {
    decimals = 0,
    initialSupply,
    mint = web3_js.Keypair.generate(),
    mintAuthority = metaplex.identity(),
    freezeAuthority = metaplex.identity().publicKey,
    owner = metaplex.identity().publicKey,
    token,
    payer = metaplex.identity(),
    tokenProgram,
    associatedTokenProgram
  } = params;
  const createMintBuilder = await metaplex.tokens().builders().createMint({
    decimals,
    mint,
    payer,
    mintAuthority: PublicKey.toPublicKey(mintAuthority),
    freezeAuthority,
    tokenProgram,
    createAccountInstructionKey: (_params$createMintAcc = params.createMintAccountInstructionKey) !== null && _params$createMintAcc !== void 0 ? _params$createMintAcc : 'createMintAccount',
    initializeMintInstructionKey: (_params$initializeMin = params.initializeMintInstructionKey) !== null && _params$initializeMin !== void 0 ? _params$initializeMin : 'initializeMint'
  });
  const createTokenBuilder = await metaplex.tokens().builders().createToken({
    mint: mint.publicKey,
    owner,
    token,
    payer,
    tokenProgram,
    associatedTokenProgram,
    createAssociatedTokenAccountInstructionKey: (_params$createAssocia = params.createAssociatedTokenAccountInstructionKey) !== null && _params$createAssocia !== void 0 ? _params$createAssocia : 'createAssociatedTokenAccount',
    createAccountInstructionKey: (_params$createTokenAc = params.createTokenAccountInstructionKey) !== null && _params$createTokenAc !== void 0 ? _params$createTokenAc : 'createTokenAccount',
    initializeTokenInstructionKey: (_params$initializeTok = params.initializeTokenInstructionKey) !== null && _params$initializeTok !== void 0 ? _params$initializeTok : 'initializeToken'
  });
  const {
    tokenAddress
  } = createTokenBuilder.getContext();
  const builder = TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: mint,
    tokenAddress
  }) // Create the Mint account.
  .add(createMintBuilder) // Create the Token account.
  .add(createTokenBuilder); // Potentially mint the initial supply to the token account.

  if (!!initialSupply) {
    var _params$mintTokensIns;

    if (!Signer.isSigner(mintAuthority)) {
      throw new errors.MintAuthorityMustBeSignerToMintInitialSupplyError();
    }

    builder.add(await metaplex.tokens().builders().mint({
      mintAddress: mint.publicKey,
      toToken: tokenAddress,
      amount: initialSupply,
      mintAuthority,
      tokenProgram,
      mintTokensInstructionKey: (_params$mintTokensIns = params.mintTokensInstructionKey) !== null && _params$mintTokensIns !== void 0 ? _params$mintTokensIns : 'mintTokens'
    }));
  }

  return builder;
};

exports.createTokenWithMintBuilder = createTokenWithMintBuilder;
exports.createTokenWithMintOperation = createTokenWithMintOperation;
exports.createTokenWithMintOperationHandler = createTokenWithMintOperationHandler;
//# sourceMappingURL=createTokenWithMint.cjs.map
