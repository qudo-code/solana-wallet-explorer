import { toMetadataAccount, parseOriginalOrPrintEditionAccount } from '../accounts.mjs';
import { findMetadataPda, findMasterEditionV2Pda } from '../pdas.mjs';
import { toMint } from '../../tokenModule/models/Mint.mjs';
import { toMintAccount, toTokenAccount } from '../../tokenModule/accounts.mjs';
import { toMetadata } from '../models/Metadata.mjs';
import { toToken } from '../../tokenModule/models/Token.mjs';
import { toNftEdition } from '../models/NftEdition.mjs';
import { toNftWithToken, toNft } from '../models/Nft.mjs';
import { toSftWithToken, toSft } from '../models/Sft.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { findAssociatedTokenAccountPda } from '../../tokenModule/pdas.mjs';

// Operation
// -----------------

const Key = 'FindNftByMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftByMintOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const findNftByMintOperationHandler = {
  handle: async (operation, metaplex, scope) => {
    const {
      mintAddress,
      tokenAddress,
      tokenOwner,
      loadJsonMetadata = true,
      commitment
    } = operation.input;
    const associatedTokenAddress = tokenOwner ? findAssociatedTokenAccountPda(mintAddress, tokenOwner) : undefined;
    const accountAddresses = [mintAddress, findMetadataPda(mintAddress), findMasterEditionV2Pda(mintAddress), tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : associatedTokenAddress].filter(address => !!address);
    const accounts = await metaplex.rpc().getMultipleAccounts(accountAddresses, commitment);
    scope.throwIfCanceled();
    const mint = toMint(toMintAccount(accounts[0]));
    let metadata = toMetadata(toMetadataAccount(accounts[1]));
    const editionAccount = parseOriginalOrPrintEditionAccount(accounts[2]);
    const token = accounts[3] ? toToken(toTokenAccount(accounts[3])) : null;

    if (loadJsonMetadata) {
      try {
        const json = await metaplex.storage().downloadJson(metadata.uri, scope);
        metadata = { ...metadata,
          jsonLoaded: true,
          json
        };
      } catch (error) {
        metadata = { ...metadata,
          jsonLoaded: true,
          json: null
        };
      }
    }

    const isNft = editionAccount.exists && mint.mintAuthorityAddress && mint.mintAuthorityAddress.equals(editionAccount.publicKey);

    if (isNft) {
      const edition = toNftEdition(editionAccount);
      return token ? toNftWithToken(metadata, mint, edition, token) : toNft(metadata, mint, edition);
    }

    return token ? toSftWithToken(metadata, mint, token) : toSft(metadata, mint);
  }
};

export { findNftByMintOperation, findNftByMintOperationHandler };
//# sourceMappingURL=findNftByMint.mjs.map
