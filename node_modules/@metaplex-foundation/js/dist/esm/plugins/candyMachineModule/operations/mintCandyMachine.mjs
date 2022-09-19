import { createMintNftInstruction, createSetCollectionDuringMintInstruction } from '@metaplex-foundation/mpl-candy-machine';
import { Keypair, SYSVAR_CLOCK_PUBKEY, SYSVAR_SLOT_HASHES_PUBKEY, SYSVAR_INSTRUCTIONS_PUBKEY } from '@solana/web3.js';
import { parseCandyMachineCollectionAccount } from '../accounts.mjs';
import { assertCanMintCandyMachine } from '../asserts.mjs';
import { CandyMachineBotTaxError } from '../errors.mjs';
import { findCandyMachineCreatorPda, findCandyMachineCollectionPda } from '../pdas.mjs';
import { CandyMachineProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TokenMetadataProgram } from '../../nftModule/program.mjs';
import { findMetadataPda, findMasterEditionV2Pda, findCollectionAuthorityRecordPda } from '../../nftModule/pdas.mjs';
import { token } from '../../../types/Amount.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';
import { assertAccountExists } from '../../../types/Account.mjs';

// Operation
// -----------------

const Key = 'MintCandyMachineOperation';
/**
 * @group Operations
 * @category Constructors
 */

const mintCandyMachineOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const mintCandyMachineOperationHandler = {
  async handle(operation, metaplex, scope) {
    var _operation$input$paye;

    assertCanMintCandyMachine(operation.input.candyMachine, (_operation$input$paye = operation.input.payer) !== null && _operation$input$paye !== void 0 ? _operation$input$paye : metaplex.identity());
    const builder = await mintCandyMachineBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    let nft;

    try {
      nft = await metaplex.nfts().findByMint({
        mintAddress: output.mintSigner.publicKey,
        tokenAddress: output.tokenAddress
      }).run(scope);
    } catch (error) {
      throw new CandyMachineBotTaxError(metaplex.rpc().getSolanaExporerUrl(output.response.signature), error);
    }

    return {
      nft,
      ...output
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
const mintCandyMachineBuilder = async (metaplex, params) => {
  var _params$mintNftInstru;

  const {
    candyMachine,
    payer = metaplex.identity(),
    newMint = Keypair.generate(),
    newOwner = metaplex.identity().publicKey,
    newToken,
    tokenProgram,
    associatedTokenProgram,
    tokenMetadataProgram = TokenMetadataProgram.publicKey,
    candyMachineProgram = CandyMachineProgram.publicKey
  } = params;
  const newMetadata = findMetadataPda(newMint.publicKey, tokenMetadataProgram);
  const newEdition = findMasterEditionV2Pda(newMint.publicKey, tokenMetadataProgram);
  const candyMachineCreator = findCandyMachineCreatorPda(candyMachine.address, candyMachineProgram);
  const candyMachineCollectionAddress = findCandyMachineCollectionPda(candyMachine.address, candyMachineProgram);
  const candyMachineCollectionAccount = parseCandyMachineCollectionAccount(await metaplex.rpc().getAccount(candyMachineCollectionAddress));
  const tokenWithMintBuilder = await metaplex.tokens().builders().createTokenWithMint({
    decimals: 0,
    initialSupply: token(1),
    mint: newMint,
    mintAuthority: payer,
    freezeAuthority: payer.publicKey,
    owner: newOwner,
    token: newToken,
    payer,
    tokenProgram,
    associatedTokenProgram,
    createMintAccountInstructionKey: params.createMintAccountInstructionKey,
    initializeMintInstructionKey: params.initializeMintInstructionKey,
    createAssociatedTokenAccountInstructionKey: params.createAssociatedTokenAccountInstructionKey,
    createTokenAccountInstructionKey: params.createTokenAccountInstructionKey,
    initializeTokenInstructionKey: params.initializeTokenInstructionKey,
    mintTokensInstructionKey: params.mintTokensInstructionKey
  });
  const {
    tokenAddress
  } = tokenWithMintBuilder.getContext();
  const mintNftInstruction = createMintNftInstruction({
    candyMachine: candyMachine.address,
    candyMachineCreator: candyMachineCreator,
    payer: payer.publicKey,
    wallet: candyMachine.walletAddress,
    metadata: newMetadata,
    mint: newMint.publicKey,
    mintAuthority: payer.publicKey,
    updateAuthority: payer.publicKey,
    masterEdition: newEdition,
    tokenMetadataProgram,
    clock: SYSVAR_CLOCK_PUBKEY,
    recentBlockhashes: SYSVAR_SLOT_HASHES_PUBKEY,
    instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY
  }, {
    creatorBump: candyMachineCreator.bump
  });

  if (candyMachine.whitelistMintSettings) {
    var _params$whitelistToke;

    const whitelistToken = (_params$whitelistToke = params.whitelistToken) !== null && _params$whitelistToke !== void 0 ? _params$whitelistToke : findAssociatedTokenAccountPda(candyMachine.whitelistMintSettings.mint, payer.publicKey, associatedTokenProgram);
    mintNftInstruction.keys.push({
      pubkey: whitelistToken,
      isWritable: true,
      isSigner: false
    }, {
      pubkey: candyMachine.whitelistMintSettings.mint,
      isWritable: true,
      isSigner: false
    }, {
      pubkey: payer.publicKey,
      isWritable: false,
      isSigner: true
    });
  }

  if (candyMachine.tokenMintAddress) {
    var _params$payerToken;

    const payerToken = (_params$payerToken = params.payerToken) !== null && _params$payerToken !== void 0 ? _params$payerToken : findAssociatedTokenAccountPda(candyMachine.tokenMintAddress, payer.publicKey, associatedTokenProgram);
    mintNftInstruction.keys.push({
      pubkey: payerToken,
      isWritable: true,
      isSigner: false
    }, {
      pubkey: payer.publicKey,
      isWritable: false,
      isSigner: true
    });
  }

  return TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: newMint,
    tokenAddress
  }) // Create token and mint accounts.
  .add(tokenWithMintBuilder) // Create the new NFT.
  .add({
    instruction: mintNftInstruction,
    signers: [payer, newMint],
    key: (_params$mintNftInstru = params.mintNftInstructionKey) !== null && _params$mintNftInstru !== void 0 ? _params$mintNftInstru : 'mintNft'
  }) // Set the collection on the NFT.
  .when(candyMachineCollectionAccount.exists, builder => {
    var _params$setCollection;

    assertAccountExists(candyMachineCollectionAccount);
    const collectionMint = candyMachineCollectionAccount.data.mint;
    const collectionMetadata = findMetadataPda(collectionMint, tokenMetadataProgram);
    const collectionMasterEdition = findMasterEditionV2Pda(collectionMint, tokenMetadataProgram);
    const collectionAuthorityRecord = findCollectionAuthorityRecordPda(collectionMint, candyMachineCollectionAccount.publicKey, tokenMetadataProgram);
    return builder.add({
      instruction: createSetCollectionDuringMintInstruction({
        candyMachine: candyMachine.address,
        metadata: newMetadata,
        payer: payer.publicKey,
        collectionPda: candyMachineCollectionAccount.publicKey,
        tokenMetadataProgram,
        instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        collectionMint: candyMachineCollectionAccount.data.mint,
        collectionMetadata,
        collectionMasterEdition,
        authority: candyMachine.authorityAddress,
        collectionAuthorityRecord
      }),
      signers: [payer],
      key: (_params$setCollection = params.setCollectionInstructionKey) !== null && _params$setCollection !== void 0 ? _params$setCollection : 'setCollection'
    });
  });
};

export { mintCandyMachineBuilder, mintCandyMachineOperation, mintCandyMachineOperationHandler };
//# sourceMappingURL=mintCandyMachine.mjs.map
