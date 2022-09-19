import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { Keypair } from '@solana/web3.js';
import { findMasterEditionV2Pda } from '../pdas.mjs';
import { assertNftWithToken } from '../models/Nft.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { toPublicKey } from '../../../types/PublicKey.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';
import { token } from '../../../types/Amount.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'CreateNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createNftOperation = useOperation(Key);
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
      useNewMint = Keypair.generate(),
      useExistingMint,
      tokenOwner = metaplex.identity().publicKey,
      tokenAddress: tokenSigner,
      confirmOptions
    } = operation.input;
    const mintAddress = useExistingMint !== null && useExistingMint !== void 0 ? useExistingMint : useNewMint.publicKey;
    const tokenAddress = tokenSigner ? toPublicKey(tokenSigner) : findAssociatedTokenAccountPda(mintAddress, tokenOwner);
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
const createNftBuilder = async (metaplex, params) => {
  var _params$createMasterE;

  const {
    useNewMint = Keypair.generate(),
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
    tokenAmount: token(1),
    decimals: 0
  });
  const {
    mintAddress,
    metadataAddress,
    tokenAddress
  } = sftBuilder.getContext();
  const masterEditionAddress = findMasterEditionV2Pda(mintAddress);
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    mintAddress,
    metadataAddress,
    masterEditionAddress,
    tokenAddress: tokenAddress
  }) // Create the mint, the token and the metadata.
  .add(sftBuilder) // Create master edition account (prevents further minting).
  .add({
    instruction: createCreateMasterEditionV3Instruction({
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

export { createNftBuilder, createNftOperation, createNftOperationHandler };
//# sourceMappingURL=createNft.mjs.map
