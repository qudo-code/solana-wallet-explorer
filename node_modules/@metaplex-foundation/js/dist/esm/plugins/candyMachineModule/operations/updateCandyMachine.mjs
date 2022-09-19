import { createUpdateCandyMachineInstruction, createSetCollectionInstruction, createRemoveCollectionInstruction, createUpdateAuthorityInstruction } from '@metaplex-foundation/mpl-candy-machine';
import isEqual from 'lodash.isequal';
import { toCandyMachineConfigs, toCandyMachineInstructionData } from '../models/CandyMachine.mjs';
import { findCandyMachineCollectionPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { NoInstructionsToSendError } from '../../../errors/SdkError.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { findMetadataPda, findMasterEditionV2Pda, findCollectionAuthorityRecordPda } from '../../nftModule/pdas.mjs';
import { TokenMetadataProgram } from '../../nftModule/program.mjs';

// Operation
// -----------------

const Key = 'UpdateCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const updateCandyMachineOperation = useOperation(Key);
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
    const currentConfigs = toCandyMachineConfigs(candyMachine);
    const instructionDataWithoutChanges = toCandyMachineInstructionData(candyMachine.address, currentConfigs);
    const instructionData = toCandyMachineInstructionData(candyMachine.address, { ...currentConfigs,
      ...updatableFields
    });
    const {
      data,
      wallet,
      tokenMint
    } = instructionData;
    const shouldUpdateData = !isEqual(instructionData, instructionDataWithoutChanges);
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
      throw new NoInstructionsToSendError(Key);
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
  return TransactionBuilder.make() // Update data.
  .when(!!newData, builder => {
    var _params$updateInstruc;

    const data = newData;
    const wallet = newData === null || newData === void 0 ? void 0 : newData.wallet;
    const tokenMint = newData === null || newData === void 0 ? void 0 : newData.tokenMint;
    const updateInstruction = createUpdateCandyMachineInstruction({
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
    const metadata = findMetadataPda(collectionMint);
    const edition = findMasterEditionV2Pda(collectionMint);
    const collectionPda = findCandyMachineCollectionPda(candyMachine.address);
    const collectionAuthorityRecord = findCollectionAuthorityRecordPda(collectionMint, collectionPda);
    return builder.add({
      instruction: createSetCollectionInstruction({
        candyMachine: candyMachine.address,
        authority: authority.publicKey,
        collectionPda,
        payer: payer.publicKey,
        metadata,
        mint: collectionMint,
        edition,
        collectionAuthorityRecord,
        tokenMetadataProgram: TokenMetadataProgram.publicKey
      }),
      signers: [payer, authority],
      key: (_params$setCollection = params.setCollectionInstructionKey) !== null && _params$setCollection !== void 0 ? _params$setCollection : 'setCollection'
    });
  }) // Remove collection.
  .when(shouldRemoveCollection, builder => {
    var _params$removeCollect;

    const collectionMint = candyMachine.collectionMintAddress;
    const metadata = findMetadataPda(collectionMint);
    const collectionPda = findCandyMachineCollectionPda(candyMachine.address);
    const collectionAuthorityRecord = findCollectionAuthorityRecordPda(collectionMint, collectionPda);
    return builder.add({
      instruction: createRemoveCollectionInstruction({
        candyMachine: candyMachine.address,
        authority: authority.publicKey,
        collectionPda,
        metadata,
        mint: collectionMint,
        collectionAuthorityRecord,
        tokenMetadataProgram: TokenMetadataProgram.publicKey
      }),
      signers: [authority],
      key: (_params$removeCollect = params.removeCollectionInstructionKey) !== null && _params$removeCollect !== void 0 ? _params$removeCollect : 'removeCollection'
    });
  }) // Update authority.
  .when(shouldUpdateAuthority, builder => {
    var _newData$wallet, _params$updateAuthori;

    return builder.add({
      instruction: createUpdateAuthorityInstruction({
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

export { updateCandyMachineBuilder, updateCandyMachineOperation, updateCandyMachineOperationHandler };
//# sourceMappingURL=updateCandyMachine.mjs.map
