'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.cjs');
var NftBuildersClient = require('./NftBuildersClient.cjs');
var findNftByMint = require('./operations/findNftByMint.cjs');
var findNftByMetadata = require('./operations/findNftByMetadata.cjs');
var findNftByToken = require('./operations/findNftByToken.cjs');
var findNftsByCreator = require('./operations/findNftsByCreator.cjs');
var findNftsByMintList = require('./operations/findNftsByMintList.cjs');
var findNftsByOwner = require('./operations/findNftsByOwner.cjs');
var findNftsByUpdateAuthority = require('./operations/findNftsByUpdateAuthority.cjs');
var loadMetadata = require('./operations/loadMetadata.cjs');
var createNft = require('./operations/createNft.cjs');
var createSft = require('./operations/createSft.cjs');
var printNewEdition = require('./operations/printNewEdition.cjs');
var uploadMetadata = require('./operations/uploadMetadata.cjs');
var updateNft = require('./operations/updateNft.cjs');
var deleteNft = require('./operations/deleteNft.cjs');
var useNft = require('./operations/useNft.cjs');
var approveNftUseAuthority = require('./operations/approveNftUseAuthority.cjs');
var revokeNftUseAuthority = require('./operations/revokeNftUseAuthority.cjs');
var verifyNftCreator = require('./operations/verifyNftCreator.cjs');
var unverifyNftCreator = require('./operations/unverifyNftCreator.cjs');
var verifyNftCollection = require('./operations/verifyNftCollection.cjs');
var unverifyNftCollection = require('./operations/unverifyNftCollection.cjs');
var approveNftCollectionAuthority = require('./operations/approveNftCollectionAuthority.cjs');
var revokeNftCollectionAuthority = require('./operations/revokeNftCollectionAuthority.cjs');
var migrateToSizedCollectionNft = require('./operations/migrateToSizedCollectionNft.cjs');
var freezeDelegatedNft = require('./operations/freezeDelegatedNft.cjs');
var thawDelegatedNft = require('./operations/thawDelegatedNft.cjs');
var Amount = require('../../types/Amount.cjs');

/**
 * @group Modules
 */

class NftClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new NftBuildersClient.NftBuildersClient(this.metaplex);
  } // -----------------
  // Queries
  // -----------------

  /** {@inheritDoc findNftByMintOperation} */


  findByMint(input) {
    return this.metaplex.operations().getTask(findNftByMint.findNftByMintOperation(input));
  }
  /** {@inheritDoc findNftByMetadataOperation} */


  findByMetadata(input) {
    return this.metaplex.operations().getTask(findNftByMetadata.findNftByMetadataOperation(input));
  }
  /** {@inheritDoc findNftByTokenOperation} */


  findByToken(input) {
    return this.metaplex.operations().getTask(findNftByToken.findNftByTokenOperation(input));
  }
  /** {@inheritDoc findNftsByCreatorOperation} */


  findAllByCreator(input) {
    return this.metaplex.operations().getTask(findNftsByCreator.findNftsByCreatorOperation(input));
  }
  /** {@inheritDoc findNftsByMintListOperation} */


  findAllByMintList(input) {
    return this.metaplex.operations().getTask(findNftsByMintList.findNftsByMintListOperation(input));
  }
  /** {@inheritDoc findNftsByOwnerOperation} */


  findAllByOwner(input) {
    return this.metaplex.operations().getTask(findNftsByOwner.findNftsByOwnerOperation(input));
  }
  /** {@inheritDoc findNftsByUpdateAuthorityOperation} */


  findAllByUpdateAuthority(input) {
    return this.metaplex.operations().getTask(findNftsByUpdateAuthority.findNftsByUpdateAuthorityOperation(input));
  }
  /** {@inheritDoc loadMetadataOperation} */


  load(input) {
    return this.metaplex.operations().getTask(loadMetadata.loadMetadataOperation(input));
  }
  /**
   * Helper method that refetches a given model
   * and returns an instance of the same type.
   */


  refresh(model, input) {
    return this.findByMint({
      mintAddress: helpers.toMintAddress(model),
      tokenAddress: 'token' in model ? model.token.address : undefined,
      ...input
    });
  } // -----------------
  // Create, Update and Delete
  // -----------------

  /** {@inheritDoc createNftOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createNft.createNftOperation(input));
  }
  /** {@inheritDoc createSftOperation} */


  createSft(input) {
    return this.metaplex.operations().getTask(createSft.createSftOperation(input));
  }
  /** {@inheritDoc printNewEditionOperation} */


  printNewEdition(input) {
    return this.metaplex.operations().getTask(printNewEdition.printNewEditionOperation(input));
  }
  /** {@inheritDoc uploadMetadataOperation} */


  uploadMetadata(input) {
    return this.metaplex.operations().getTask(uploadMetadata.uploadMetadataOperation(input));
  }
  /** {@inheritDoc updateNftOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateNft.updateNftOperation(input));
  }
  /** {@inheritDoc deleteNftOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteNft.deleteNftOperation(input));
  } // -----------------
  // Use
  // -----------------

  /** {@inheritDoc useNftOperation} */


  use(input) {
    return this.metaplex.operations().getTask(useNft.useNftOperation(input));
  }
  /** {@inheritDoc approveNftUseAuthorityOperation} */


  approveUseAuthority(input) {
    return this.metaplex.operations().getTask(approveNftUseAuthority.approveNftUseAuthorityOperation(input));
  }
  /** {@inheritDoc revokeNftUseAuthorityOperation} */


  revokeUseAuthority(input) {
    return this.metaplex.operations().getTask(revokeNftUseAuthority.revokeNftUseAuthorityOperation(input));
  } // -----------------
  // Creators
  // -----------------

  /** {@inheritDoc verifyNftCreatorOperation} */


  verifyCreator(input) {
    return this.metaplex.operations().getTask(verifyNftCreator.verifyNftCreatorOperation(input));
  }
  /** {@inheritDoc unverifyNftCreatorOperation} */


  unverifyCreator(input) {
    return this.metaplex.operations().getTask(unverifyNftCreator.unverifyNftCreatorOperation(input));
  } // -----------------
  // Collections
  // -----------------

  /** {@inheritDoc verifyNftCollectionOperation} */


  verifyCollection(input) {
    return this.metaplex.operations().getTask(verifyNftCollection.verifyNftCollectionOperation(input));
  }
  /** {@inheritDoc unverifyNftCollectionOperation} */


  unverifyCollection(input) {
    return this.metaplex.operations().getTask(unverifyNftCollection.unverifyNftCollectionOperation(input));
  }
  /** {@inheritDoc approveNftCollectionAuthorityOperation} */


  approveCollectionAuthority(input) {
    return this.metaplex.operations().getTask(approveNftCollectionAuthority.approveNftCollectionAuthorityOperation(input));
  }
  /** {@inheritDoc revokeNftCollectionAuthorityOperation} */


  revokeCollectionAuthority(input) {
    return this.metaplex.operations().getTask(revokeNftCollectionAuthority.revokeNftCollectionAuthorityOperation(input));
  }
  /** {@inheritDoc migrateToSizedCollectionNftOperation} */


  migrateToSizedCollection(input) {
    return this.metaplex.operations().getTask(migrateToSizedCollectionNft.migrateToSizedCollectionNftOperation(input));
  } // -----------------
  // Tokens
  // -----------------

  /** {@inheritDoc freezeDelegatedNftOperation} */


  freezeDelegatedNft(input) {
    return this.metaplex.operations().getTask(freezeDelegatedNft.freezeDelegatedNftOperation(input));
  }
  /** {@inheritDoc thawDelegatedNftOperation} */


  thawDelegatedNft(input) {
    return this.metaplex.operations().getTask(thawDelegatedNft.thawDelegatedNftOperation(input));
  }
  /** {@inheritDoc sendTokensOperation} */


  send(input) {
    return this.metaplex.tokens().send({ ...input,
      amount: Amount.token(1)
    });
  }

}

exports.NftClient = NftClient;
//# sourceMappingURL=NftClient.cjs.map
