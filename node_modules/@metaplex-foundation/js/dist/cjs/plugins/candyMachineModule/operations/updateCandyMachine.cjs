'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var isEqual = require('lodash.isequal');
var CandyMachine = require('../models/CandyMachine.cjs');
var pdas$1 = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');
var pdas = require('../../nftModule/pdas.cjs');
var program = require('../../nftModule/program.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);

// Operation
// -----------------

const Key = 'UpdateCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const updateCandyMachineOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const updateCandyMachineOperationHandler = {
  async handle(operation, metaplex) {
    const {
      candyMachine,
      authority = metaplex.identity(),
      payer = metaplex.identity(),
      newAuthority,
      newCollection,
      confirmOptions,
      ...updatableFields
    } = operation.input;
    const currentConfigs = CandyMachine.toCandyMachineConfigs(candyMachine);
    const instructionDataWithoutChanges = CandyMachine.toCandyMachineInstructionData(candyMachine.address, currentConfigs);
    const instructionData = CandyMachine.toCandyMachineInstructionData(candyMachine.address, { ...currentConfigs,
      ...updatableFields
    });
    const {
      data,
      wallet,
      tokenMint
    } = instructionData;
    const shouldUpdateData = !isEqual__default["default"](instructionData, instructionDataWithoutChanges);
    const builder = updateCandyMachineBuilder(metaplex, {
      candyMachine,
      authority,
      payer,
      newData: shouldUpdateData ? { ...data,
        wallet,
        tokenMint
      } : undefined,
      newCollection,
      newAuthority
    });

    if (builder.isEmpty()) {
      throw new SdkError.NoInstructionsToSendError(Key);
    }

    return builder.sendAndConfirm(metaplex, confirmOptions);
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
const updateCandyMachineBuilder = (metaplex, params) => {
  const {
    candyMachine,
    authority = metaplex.identity(),
    payer = metaplex.identity(),
    newData,
    newAuthority,
    newCollection
  } = params;
  const shouldUpdateAuthority = !!newAuthority && !newAuthority.equals(authority.publicKey);
  const sameCollection = newCollection && candyMachine.collectionMintAddress && candyMachine.collectionMintAddress.equals(newCollection);
  const shouldUpdateCollection = !!newCollection && !sameCollection;
  const shouldRemoveCollection = !shouldUpdateCollection && newCollection === null && candyMachine.collectionMintAddress !== null;
  return TransactionBuilder.TransactionBuilder.make() // Update data.
  .when(!!newData, builder => {
    var _params$updateInstruc;

    const data = newData;
    const wallet = newData === null || newData === void 0 ? void 0 : newData.wallet;
    const tokenMint = newData === null || newData === void 0 ? void 0 : newData.tokenMint;
    const updateInstruction = mplCandyMachine.createUpdateCandyMachineInstruction({
      candyMachine: candyMachine.address,
      authority: authority.publicKey,
      wallet
    }, {
      data
    });

    if (tokenMint) {
      updateInstruction.keys.push({
        pubkey: tokenMint,
        isWritable: false,
        isSigner: false
      });
    }

    return builder.add({
      instruction: updateInstruction,
      signers: [authority],
      key: (_params$updateInstruc = params.updateInstructionKey) !== null && _params$updateInstruc !== void 0 ? _params$updateInstruc : 'update'
    });
  }) // Set or update collection.
  .when(shouldUpdateCollection, builder => {
    var _params$setCollection;

    const collectionMint = newCollection;
    const metadata = pdas.findMetadataPda(collectionMint);
    const edition = pdas.findMasterEditionV2Pda(collectionMint);
    const collectionPda = pdas$1.findCandyMachineCollectionPda(candyMachine.address);
    const collectionAuthorityRecord = pdas.findCollectionAuthorityRecordPda(collectionMint, collectionPda);
    return builder.add({
      instruction: mplCandyMachine.createSetCollectionInstruction({
        candyMachine: candyMachine.address,
        authority: authority.publicKey,
        collectionPda,
        payer: payer.publicKey,
        metadata,
        mint: collectionMint,
        edition,
        collectionAuthorityRecord,
        tokenMetadataProgram: program.TokenMetadataProgram.publicKey
      }),
      signers: [payer, authority],
      key: (_params$setCollection = params.setCollectionInstructionKey) !== null && _params$setCollection !== void 0 ? _params$setCollection : 'setCollection'
    });
  }) // Remove collection.
  .when(shouldRemoveCollection, builder => {
    var _params$removeCollect;

    const collectionMint = candyMachine.collectionMintAddress;
    const metadata = pdas.findMetadataPda(collectionMint);
    const collectionPda = pdas$1.findCandyMachineCollectionPda(candyMachine.address);
    const collectionAuthorityRecord = pdas.findCollectionAuthorityRecordPda(collectionMint, collectionPda);
    return builder.add({
      instruction: mplCandyMachine.createRemoveCollectionInstruction({
        candyMachine: candyMachine.address,
        authority: authority.publicKey,
        collectionPda,
        metadata,
        mint: collectionMint,
        collectionAuthorityRecord,
        tokenMetadataProgram: program.TokenMetadataProgram.publicKey
      }),
      signers: [authority],
      key: (_params$removeCollect = params.removeCollectionInstructionKey) !== null && _params$removeCollect !== void 0 ? _params$removeCollect : 'removeCollection'
    });
  }) // Update authority.
  .when(shouldUpdateAuthority, builder => {
    var _newData$wallet, _params$updateAuthori;

    return builder.add({
      instruction: mplCandyMachine.createUpdateAuthorityInstruction({
        candyMachine: candyMachine.address,
        authority: authority.publicKey,
        wallet: (_newData$wallet = newData === null || newData === void 0 ? void 0 : newData.wallet) !== null && _newData$wallet !== void 0 ? _newData$wallet : candyMachine.walletAddress
      }, {
        newAuthority: newAuthority
      }),
      signers: [authority],
      key: (_params$updateAuthori = params.updateAuthorityInstructionKey) !== null && _params$updateAuthori !== void 0 ? _params$updateAuthori : 'updateAuthority'
    });
  });
};

exports.updateCandyMachineBuilder = updateCandyMachineBuilder;
exports.updateCandyMachineOperation = updateCandyMachineOperation;
exports.updateCandyMachineOperationHandler = updateCandyMachineOperationHandler;
//# sourceMappingURL=updateCandyMachine.cjs.map
