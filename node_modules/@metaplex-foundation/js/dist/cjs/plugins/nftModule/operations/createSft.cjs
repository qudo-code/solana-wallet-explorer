'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var web3_js = require('@solana/web3.js');
var pdas$1 = require('../pdas.cjs');
var Sft = require('../models/Sft.cjs');
var Operation = require('../../../types/Operation.cjs');
var pdas = require('../../tokenModule/pdas.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var Signer = require('../../../types/Signer.cjs');

// Operation
// -----------------

const Key = 'CreateSftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createSftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createSftOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    var _output$tokenAddress;

    const {
      useNewMint = web3_js.Keypair.generate(),
      useExistingMint,
      tokenOwner,
      tokenAddress: tokenSigner,
      confirmOptions
    } = operation.input;
    const mintAddress = useExistingMint !== null && useExistingMint !== void 0 ? useExistingMint : useNewMint.publicKey;
    const associatedTokenAddress = tokenOwner ? pdas.findAssociatedTokenAccountPda(mintAddress, tokenOwner) : null;
    const tokenAddress = tokenSigner ? PublicKey.toPublicKey(tokenSigner) : associatedTokenAddress;
    let tokenExists;

    if (!!useExistingMint && !!tokenAddress) {
      const tokenAccount = await metaplex.rpc().getAccount(tokenAddress);
      tokenExists = tokenAccount.exists;
    } else {
      tokenExists = false;
    }

    const builder = await createSftBuilder(metaplex, { ...operation.input,
      useNewMint,
      tokenExists
    });
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, confirmOptions);
    scope.throwIfCanceled();
    const sft = await metaplex.nfts().findByMint({
      mintAddress: output.mintAddress,
      tokenAddress: (_output$tokenAddress = output.tokenAddress) !== null && _output$tokenAddress !== void 0 ? _output$tokenAddress : undefined
    }).run(scope);
    scope.throwIfCanceled();
    Sft.assertSft(sft);
    return { ...output,
      sft
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
const createSftBuilder = async (metaplex, params) => {
  var _params$creators, _params$symbol, _params$uses, _params$isMutable, _params$createMetadat;

  const {
    payer = metaplex.identity(),
    useNewMint = web3_js.Keypair.generate(),
    updateAuthority = metaplex.identity(),
    mintAuthority = metaplex.identity()
  } = params;
  const mintAndTokenBuilder = await createMintAndTokenForSftBuilder(metaplex, params, useNewMint);
  const {
    mintAddress,
    tokenAddress
  } = mintAndTokenBuilder.getContext();
  const metadataPda = pdas$1.findMetadataPda(mintAddress);
  const creatorsInput = (_params$creators = params.creators) !== null && _params$creators !== void 0 ? _params$creators : [{
    address: updateAuthority.publicKey,
    authority: updateAuthority,
    share: 100
  }];
  const creators = creatorsInput.length > 0 ? creatorsInput.map(creator => ({ ...creator,
    verified: creator.address.equals(updateAuthority.publicKey)
  })) : null;
  const createMetadataInstruction = mplTokenMetadata.createCreateMetadataAccountV3Instruction({
    metadata: metadataPda,
    mint: mintAddress,
    mintAuthority: mintAuthority.publicKey,
    payer: payer.publicKey,
    updateAuthority: updateAuthority.publicKey
  }, {
    createMetadataAccountArgsV3: {
      data: {
        name: params.name,
        symbol: (_params$symbol = params.symbol) !== null && _params$symbol !== void 0 ? _params$symbol : '',
        uri: params.uri,
        sellerFeeBasisPoints: params.sellerFeeBasisPoints,
        creators,
        collection: params.collection ? {
          key: params.collection,
          verified: false
        } : null,
        uses: (_params$uses = params.uses) !== null && _params$uses !== void 0 ? _params$uses : null
      },
      isMutable: (_params$isMutable = params.isMutable) !== null && _params$isMutable !== void 0 ? _params$isMutable : true,
      collectionDetails: params.isCollection ? {
        __kind: 'V1',
        size: 0
      } // Program will hardcode size to zero anyway.
      : null
    }
  }); // When the payer is different than the update authority, the latter will
  // not be marked as a signer and therefore signing as a creator will fail.

  createMetadataInstruction.keys[4].isSigner = true;
  const verifyAdditionalCreatorInstructions = creatorsInput.filter(creator => {
    return !!creator.authority && !creator.address.equals(updateAuthority.publicKey);
  }).map(creator => {
    return metaplex.nfts().builders().verifyCreator({
      mintAddress,
      creator: creator.authority
    });
  });
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer).setContext({
    mintAddress,
    metadataAddress: metadataPda,
    tokenAddress
  }) // Create the mint and token accounts before minting 1 token to the owner.
  .add(mintAndTokenBuilder) // Create metadata account.
  .add({
    instruction: createMetadataInstruction,
    signers: [payer, mintAuthority, updateAuthority],
    key: (_params$createMetadat = params.createMetadataInstructionKey) !== null && _params$createMetadat !== void 0 ? _params$createMetadat : 'createMetadata'
  }) // Verify additional creators.
  .add(...verifyAdditionalCreatorInstructions) // Verify collection.
  .when(!!params.collection && !!params.collectionAuthority, builder => {
    var _params$collectionAut, _params$collectionIsS;

    return builder.add(metaplex.nfts().builders().verifyCollection({
      payer,
      mintAddress,
      collectionMintAddress: params.collection,
      collectionAuthority: params.collectionAuthority,
      isDelegated: (_params$collectionAut = params.collectionAuthorityIsDelegated) !== null && _params$collectionAut !== void 0 ? _params$collectionAut : false,
      isSizedCollection: (_params$collectionIsS = params.collectionIsSized) !== null && _params$collectionIsS !== void 0 ? _params$collectionIsS : true
    }));
  });
};

const createMintAndTokenForSftBuilder = async (metaplex, params, useNewMint) => {
  var _params$useExistingMi;

  const {
    payer = metaplex.identity(),
    mintAuthority = metaplex.identity(),
    freezeAuthority = metaplex.identity().publicKey,
    tokenExists = false
  } = params;
  const mintAddress = (_params$useExistingMi = params.useExistingMint) !== null && _params$useExistingMi !== void 0 ? _params$useExistingMi : useNewMint.publicKey;
  const associatedTokenAddress = params.tokenOwner ? pdas.findAssociatedTokenAccountPda(mintAddress, params.tokenOwner) : null;
  const tokenAddress = params.tokenAddress ? PublicKey.toPublicKey(params.tokenAddress) : associatedTokenAddress;
  const builder = TransactionBuilder.TransactionBuilder.make().setContext({
    mintAddress,
    tokenAddress
  }); // Create the mint account if it doesn't exist.

  if (!params.useExistingMint) {
    var _params$decimals;

    builder.add(await metaplex.tokens().builders().createMint({
      decimals: (_params$decimals = params.decimals) !== null && _params$decimals !== void 0 ? _params$decimals : 0,
      mint: useNewMint,
      payer,
      mintAuthority: mintAuthority.publicKey,
      freezeAuthority,
      tokenProgram: params.tokenProgram,
      createAccountInstructionKey: params.createMintAccountInstructionKey,
      initializeMintInstructionKey: params.initializeMintInstructionKey
    }));
  } // Create the token account if it doesn't exist.


  const isNewToken = !!params.tokenAddress && Signer.isSigner(params.tokenAddress);
  const isNewAssociatedToken = !!params.tokenOwner;

  if (!tokenExists && (isNewToken || isNewAssociatedToken)) {
    builder.add(await metaplex.tokens().builders().createToken({
      mint: mintAddress,
      owner: params.tokenOwner,
      token: params.tokenAddress,
      payer,
      tokenProgram: params.tokenProgram,
      associatedTokenProgram: params.associatedTokenProgram,
      createAssociatedTokenAccountInstructionKey: params.createAssociatedTokenAccountInstructionKey,
      createAccountInstructionKey: params.createTokenAccountInstructionKey,
      initializeTokenInstructionKey: params.initializeTokenInstructionKey
    }));
  } // Mint provided amount to the token account.


  if (tokenAddress && params.tokenAmount) {
    builder.add(await metaplex.tokens().builders().mint({
      mintAddress,
      toToken: tokenAddress,
      toTokenExists: true,
      amount: params.tokenAmount,
      mintAuthority,
      tokenProgram: params.tokenProgram,
      mintTokensInstructionKey: params.mintTokensInstructionKey
    }));
  }

  return builder;
};

exports.createSftBuilder = createSftBuilder;
exports.createSftOperation = createSftOperation;
exports.createSftOperationHandler = createSftOperationHandler;
//# sourceMappingURL=createSft.cjs.map
