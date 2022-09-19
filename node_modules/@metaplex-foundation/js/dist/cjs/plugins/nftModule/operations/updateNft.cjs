'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var isEqual = require('lodash.isequal');
var pdas = require('../pdas.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

// Operation
// -----------------

const Key = 'UpdateNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const updateNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const updateNftOperationHandler = {
  handle: async (operation, metaplex) => {
    const builder = updateNftBuilder(metaplex, operation.input);

    if (builder.isEmpty()) {
      throw new SdkError.NoInstructionsToSendError(Key);
    }

    return builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const updateNftBuilder = (metaplex, params) => {
  var _params$creators;

  const {
    nftOrSft,
    updateAuthority = metaplex.identity()
  } = params;
  const updateInstructionDataWithoutChanges = toInstructionData(nftOrSft);
  const updateInstructionData = toInstructionData(nftOrSft, params);
  const shouldSendUpdateInstruction = !isEqual__default["default"](updateInstructionData, updateInstructionDataWithoutChanges);
  const isRemovingVerifiedCollection = !!nftOrSft.collection && !!nftOrSft.collection.verified && !params.collection;
  const isOverridingVerifiedCollection = !!nftOrSft.collection && !!nftOrSft.collection.verified && !!params.collection && !params.collection.equals(nftOrSft.collection.address);
  const shouldUnverifyCurrentCollection = isRemovingVerifiedCollection || isOverridingVerifiedCollection;
  const creatorsInput = (_params$creators = params.creators) !== null && _params$creators !== void 0 ? _params$creators : nftOrSft.creators;
  const verifyAdditionalCreatorInstructions = creatorsInput.filter(creator => {
    var _currentCreator$verif;

    const currentCreator = nftOrSft.creators.find(({
      address
    }) => address.equals(creator.address));
    const currentlyVerified = (_currentCreator$verif = currentCreator === null || currentCreator === void 0 ? void 0 : currentCreator.verified) !== null && _currentCreator$verif !== void 0 ? _currentCreator$verif : false;
    return !!creator.authority && !currentlyVerified;
  }).map(creator => {
    return metaplex.nfts().builders().verifyCreator({
      mintAddress: nftOrSft.address,
      creator: creator.authority
    });
  });
  return TransactionBuilder.TransactionBuilder.make() // Unverify current collection before overriding it.
  // Otherwise, the previous collection size will not be properly decremented.
  .when(shouldUnverifyCurrentCollection, builder => {
    var _nftOrSft$collection, _params$oldCollection;

    return builder.add(metaplex.nfts().builders().unverifyCollection({
      mintAddress: nftOrSft.address,
      collectionMintAddress: (_nftOrSft$collection = nftOrSft.collection) === null || _nftOrSft$collection === void 0 ? void 0 : _nftOrSft$collection.address,
      collectionAuthority: updateAuthority,
      isSizedCollection: (_params$oldCollection = params.oldCollectionIsSized) !== null && _params$oldCollection !== void 0 ? _params$oldCollection : true
    }));
  }) // Update the metadata account.
  .when(shouldSendUpdateInstruction, builder => {
    var _params$updateMetadat;

    return builder.add({
      instruction: mplTokenMetadata.createUpdateMetadataAccountV2Instruction({
        metadata: pdas.findMetadataPda(nftOrSft.address),
        updateAuthority: updateAuthority.publicKey
      }, {
        updateMetadataAccountArgsV2: updateInstructionData
      }),
      signers: [updateAuthority],
      key: (_params$updateMetadat = params.updateMetadataInstructionKey) !== null && _params$updateMetadat !== void 0 ? _params$updateMetadat : 'updateMetadata'
    });
  }) // Verify additional creators.
  .add(...verifyAdditionalCreatorInstructions) // Verify collection.
  .when(!!params.collection && !!params.collectionAuthority, builder => {
    var _params$collectionAut, _params$collectionIsS;

    return builder.add(metaplex.nfts().builders().verifyCollection({
      mintAddress: nftOrSft.address,
      collectionMintAddress: params.collection,
      collectionAuthority: params.collectionAuthority,
      isDelegated: (_params$collectionAut = params.collectionAuthorityIsDelegated) !== null && _params$collectionAut !== void 0 ? _params$collectionAut : false,
      isSizedCollection: (_params$collectionIsS = params.collectionIsSized) !== null && _params$collectionIsS !== void 0 ? _params$collectionIsS : true
    }));
  });
};

const toInstructionData = (nftOrSft, input = {}) => {
  var _input$newUpdateAutho, _input$primarySaleHap, _input$isMutable, _input$name, _input$symbol, _input$uri, _input$sellerFeeBasis;

  const creators = input.creators === undefined ? nftOrSft.creators : input.creators.map(creator => {
    var _currentCreator$verif2;

    const currentCreator = nftOrSft.creators.find(({
      address
    }) => address.equals(creator.address));
    return { ...creator,
      verified: (_currentCreator$verif2 = currentCreator === null || currentCreator === void 0 ? void 0 : currentCreator.verified) !== null && _currentCreator$verif2 !== void 0 ? _currentCreator$verif2 : false
    };
  });
  const currentCollection = nftOrSft.collection ? { ...nftOrSft.collection,
    key: nftOrSft.collection.address
  } : null;
  const newCollection = input.collection ? {
    key: input.collection,
    verified: false
  } : null;
  return {
    updateAuthority: (_input$newUpdateAutho = input.newUpdateAuthority) !== null && _input$newUpdateAutho !== void 0 ? _input$newUpdateAutho : null,
    primarySaleHappened: (_input$primarySaleHap = input.primarySaleHappened) !== null && _input$primarySaleHap !== void 0 ? _input$primarySaleHap : null,
    isMutable: (_input$isMutable = input.isMutable) !== null && _input$isMutable !== void 0 ? _input$isMutable : null,
    data: {
      name: (_input$name = input.name) !== null && _input$name !== void 0 ? _input$name : nftOrSft.name,
      symbol: (_input$symbol = input.symbol) !== null && _input$symbol !== void 0 ? _input$symbol : nftOrSft.symbol,
      uri: (_input$uri = input.uri) !== null && _input$uri !== void 0 ? _input$uri : nftOrSft.uri,
      sellerFeeBasisPoints: (_input$sellerFeeBasis = input.sellerFeeBasisPoints) !== null && _input$sellerFeeBasis !== void 0 ? _input$sellerFeeBasis : nftOrSft.sellerFeeBasisPoints,
      creators: creators.length > 0 ? creators : null,
      uses: input.uses === undefined ? nftOrSft.uses : input.uses,
      collection: input.collection === undefined ? currentCollection : newCollection
    }
  };
};

exports.updateNftBuilder = updateNftBuilder;
exports.updateNftOperation = updateNftOperation;
exports.updateNftOperationHandler = updateNftOperationHandler;
//# sourceMappingURL=updateNft.cjs.map
