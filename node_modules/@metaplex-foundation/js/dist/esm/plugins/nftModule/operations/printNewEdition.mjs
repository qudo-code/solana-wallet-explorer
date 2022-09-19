import { createMintNewEditionFromMasterEditionViaTokenInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { Keypair } from '@solana/web3.js';
import { toOriginalEditionAccount } from '../accounts.mjs';
import { findMasterEditionV2Pda, findMetadataPda, findEditionMarkerPda, findEditionPda } from '../pdas.mjs';
import { toNftOriginalEdition } from '../models/NftEdition.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { assertNftWithToken } from '../models/Nft.mjs';
import { toBigNumber } from '../../../types/BigNumber.mjs';
import { token } from '../../../types/Amount.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'PrintNewEditionOperation';
/**
 * @group Operations
 * @category Constructors
 */

const printNewEditionOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const printNewEditionOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const originalEditionAccount = await metaplex.rpc().getAccount(findMasterEditionV2Pda(operation.input.originalMint));
    scope.throwIfCanceled();
    const originalEdition = toNftOriginalEdition(toOriginalEditionAccount(originalEditionAccount));
    const builder = await printNewEditionBuilder(metaplex, { ...operation.input,
      originalSupply: originalEdition.supply
    });
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    const nft = await metaplex.nfts().findByMint({
      mintAddress: output.mintSigner.publicKey,
      tokenAddress: output.tokenAddress
    }).run(scope);
    scope.throwIfCanceled();
    assertNftWithToken(nft);
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
const printNewEditionBuilder = async (metaplex, params) => {
  var _params$originalToken, _params$originalToken2;

  const {
    originalMint,
    newMint = Keypair.generate(),
    newUpdateAuthority = metaplex.identity().publicKey,
    newOwner = metaplex.identity().publicKey,
    newTokenAccount,
    payer = metaplex.identity(),
    tokenProgram,
    associatedTokenProgram,
    printNewEditionInstructionKey = 'printNewEdition'
  } = params; // Original NFT.

  const originalMetadataAddress = findMetadataPda(originalMint);
  const originalEditionAddress = findMasterEditionV2Pda(originalMint);
  const edition = toBigNumber(params.originalSupply.addn(1));
  const originalEditionMarkPda = findEditionMarkerPda(originalMint, edition); // New NFT.

  const newMintAuthority = Keypair.generate(); // Will be overwritten by edition PDA.

  const newMetadataAddress = findMetadataPda(newMint.publicKey);
  const newEditionAddress = findEditionPda(newMint.publicKey);
  const sharedAccounts = {
    newMetadata: newMetadataAddress,
    newEdition: newEditionAddress,
    masterEdition: originalEditionAddress,
    newMint: newMint.publicKey,
    editionMarkPda: originalEditionMarkPda,
    newMintAuthority: newMintAuthority.publicKey,
    payer: payer.publicKey,
    newMetadataUpdateAuthority: newUpdateAuthority,
    metadata: originalMetadataAddress
  };
  const tokenWithMintBuilder = await metaplex.tokens().builders().createTokenWithMint({
    decimals: 0,
    initialSupply: token(1),
    mint: newMint,
    mintAuthority: newMintAuthority,
    freezeAuthority: newMintAuthority.publicKey,
    owner: newOwner,
    token: newTokenAccount,
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
  const originalTokenAccountOwner = (_params$originalToken = params.originalTokenAccountOwner) !== null && _params$originalToken !== void 0 ? _params$originalToken : metaplex.identity();
  const originalTokenAccount = (_params$originalToken2 = params.originalTokenAccount) !== null && _params$originalToken2 !== void 0 ? _params$originalToken2 : findAssociatedTokenAccountPda(originalMint, originalTokenAccountOwner.publicKey);
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: newMint,
    metadataAddress: newMetadataAddress,
    editionAddress: newEditionAddress,
    tokenAddress,
    updatedSupply: edition
  }) // Create the mint and token accounts before minting 1 token to the owner.
  .add(tokenWithMintBuilder) // Mint new edition.
  .add({
    instruction: createMintNewEditionFromMasterEditionViaTokenInstruction({ ...sharedAccounts,
      tokenAccountOwner: originalTokenAccountOwner.publicKey,
      tokenAccount: originalTokenAccount
    }, {
      mintNewEditionFromMasterEditionViaTokenArgs: {
        edition
      }
    }),
    signers: [newMint, newMintAuthority, payer, originalTokenAccountOwner],
    key: printNewEditionInstructionKey
  });
};

export { printNewEditionBuilder, printNewEditionOperation, printNewEditionOperationHandler };
//# sourceMappingURL=printNewEdition.mjs.map
