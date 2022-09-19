'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var accounts$1 = require('../accounts.cjs');
var pdas$1 = require('../pdas.cjs');
var Mint = require('../../tokenModule/models/Mint.cjs');
var accounts = require('../../tokenModule/accounts.cjs');
var Metadata = require('../models/Metadata.cjs');
var Token = require('../../tokenModule/models/Token.cjs');
var NftEdition = require('../models/NftEdition.cjs');
var Nft = require('../models/Nft.cjs');
var Sft = require('../models/Sft.cjs');
var Operation = require('../../../types/Operation.cjs');
var pdas = require('../../tokenModule/pdas.cjs');

// Operation
// -----------------

const Key = 'FindNftByMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const findNftByMintOperation = Operation.useOperation(Key);
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
    const associatedTokenAddress = tokenOwner ? pdas.findAssociatedTokenAccountPda(mintAddress, tokenOwner) : undefined;
    const accountAddresses = [mintAddress, pdas$1.findMetadataPda(mintAddress), pdas$1.findMasterEditionV2Pda(mintAddress), tokenAddress !== null && tokenAddress !== void 0 ? tokenAddress : associatedTokenAddress].filter(address => !!address);
    const accounts$2 = await metaplex.rpc().getMultipleAccounts(accountAddresses, commitment);
    scope.throwIfCanceled();
    const mint = Mint.toMint(accounts.toMintAccount(accounts$2[0]));
    let metadata = Metadata.toMetadata(accounts$1.toMetadataAccount(accounts$2[1]));
    const editionAccount = accounts$1.parseOriginalOrPrintEditionAccount(accounts$2[2]);
    const token = accounts$2[3] ? Token.toToken(accounts.toTokenAccount(accounts$2[3])) : null;

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
      const edition = NftEdition.toNftEdition(editionAccount);
      return token ? Nft.toNftWithToken(metadata, mint, edition, token) : Nft.toNft(metadata, mint, edition);
    }

    return token ? Sft.toSftWithToken(metadata, mint, token) : Sft.toSft(metadata, mint);
  }
};

exports.findNftByMintOperation = findNftByMintOperation;
exports.findNftByMintOperationHandler = findNftByMintOperationHandler;
//# sourceMappingURL=findNftByMint.cjs.map
