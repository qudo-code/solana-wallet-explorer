import { Keypair } from '@solana/web3.js';
import { MintAuthorityMustBeSignerToMintInitialSupplyError } from '../errors.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { isSigner } from '../../../types/Signer.mjs';

// -----------------
// Operation
// -----------------
const Key = 'CreateTokenWithMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createTokenWithMintOperation = useOperation(Key);
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
    mint = Keypair.generate(),
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
    mintAuthority: toPublicKey(mintAuthority),
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
  const builder = TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: mint,
    tokenAddress
  }) // Create the Mint account.
  .add(createMintBuilder) // Create the Token account.
  .add(createTokenBuilder); // Potentially mint the initial supply to the token account.

  if (!!initialSupply) {
    var _params$mintTokensIns;

    if (!isSigner(mintAuthority)) {
      throw new MintAuthorityMustBeSignerToMintInitialSupplyError();
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

export { createTokenWithMintBuilder, createTokenWithMintOperation, createTokenWithMintOperationHandler };
//# sourceMappingURL=createTokenWithMint.mjs.map
