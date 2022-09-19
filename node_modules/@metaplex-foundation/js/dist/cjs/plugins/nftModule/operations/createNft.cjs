'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var web3_js = require('@solana/web3.js');
var pdas$1 = require('../pdas.cjs');
var Nft = require('../models/Nft.cjs');
var Operation = require('../../../types/Operation.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var pdas = require('../../tokenModule/pdas.cjs');
var Amount = require('../../../types/Amount.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'CreateNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createNftOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      useNewMint = web3_js.Keypair.generate(),
      useExistingMint,
      tokenOwner = metaplex.identity().publicKey,
      tokenAddress: tokenSigner,
      confirmOptions
    } = operation.input;
    const mintAddress = useExistingMint !== null && useExistingMint !== void 0 ? useExistingMint : useNewMint.publicKey;
    const tokenAddress = tokenSigner ? PublicKey.toPublicKey(tokenSigner) : pdas.findAssociatedTokenAccountPda(mintAddress, tokenOwner);
    const tokenAccount = await metaplex.rpc().getAccount(tokenAddress);
    const tokenExists = tokenAccount.exists;
    const builder = await createNftBuilder(metaplex, { ...operation.input,
      useNewMint,
      tokenOwner,
      tokenExists
    });
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, confirmOptions);
    scope.throwIfCanceled();
    const nft = await metaplex.nfts().findByMint({
      mintAddress: output.mintAddress,
      tokenAddress: output.tokenAddress
    }).run(scope);
    scope.throwIfCanceled();
    Nft.assertNftWithToken(nft);
    return { ...output,
      nft
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
const createNftBuilder = async (metaplex, params) => {
  var _params$createMasterE;

  const {
    useNewMint = web3_js.Keypair.generate(),
    payer = metaplex.identity(),
    updateAuthority = metaplex.identity(),
    mintAuthority = metaplex.identity(),
    tokenOwner = metaplex.identity().publicKey
  } = params;
  const sftBuilder = await metaplex.nfts().builders().createSft({ ...params,
    payer,
    updateAuthority,
    mintAuthority,
    freezeAuthority: mintAuthority.publicKey,
    useNewMint,
    tokenOwner,
    tokenAmount: Amount.token(1),
    decimals: 0
  });
  const {
    mintAddress,
    metadataAddress,
    tokenAddress
  } = sftBuilder.getContext();
  const masterEditionAddress = pdas$1.findMasterEditionV2Pda(mintAddress);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    mintAddress,
    metadataAddress,
    masterEditionAddress,
    tokenAddress: tokenAddress
  }) // Create the mint, the token and the metadata.
  .add(sftBuilder) // Create master edition account (prevents further minting).
  .add({
    instruction: mplTokenMetadata.createCreateMasterEditionV3Instruction({
      edition: masterEditionAddress,
      mint: mintAddress,
      updateAuthority: updateAuthority.publicKey,
      mintAuthority: mintAuthority.publicKey,
      payer: payer.publicKey,
      metadata: metadataAddress
    }, {
      createMasterEditionArgs: {
        maxSupply: params.maxSupply === undefined ? 0 : params.maxSupply
      }
    }),
    signers: [payer, mintAuthority, updateAuthority],
    key: (_params$createMasterE = params.createMasterEditionInstructionKey) !== null && _params$createMasterE !== void 0 ? _params$createMasterE : 'createMasterEdition'
  });
};

exports.createNftBuilder = createNftBuilder;
exports.createNftOperation = createNftOperation;
exports.createNftOperationHandler = createNftOperationHandler;
//# sourceMappingURL=createNft.cjs.map
