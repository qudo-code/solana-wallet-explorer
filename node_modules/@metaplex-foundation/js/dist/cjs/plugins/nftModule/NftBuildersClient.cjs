'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createNft = require('./operations/createNft.cjs');
var createSft = require('./operations/createSft.cjs');
var printNewEdition = require('./operations/printNewEdition.cjs');
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

/**
 * @group Module Builders
 */

class NftBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  } // -----------------
  // Create, Update and Delete
  // -----------------

  /** {@inheritDoc createNftBuilder} */


  create(input) {
    return createNft.createNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createSftBuilder} */


  createSft(input) {
    return createSft.createSftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc printNewEditionBuilder} */


  printNewEdition(input) {
    return printNewEdition.printNewEditionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateNftBuilder} */


  update(input) {
    return updateNft.updateNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc deleteNftBuilder} */


  delete(input) {
    return deleteNft.deleteNftBuilder(this.metaplex, input);
  } // -----------------
  // Use
  // -----------------

  /** {@inheritDoc useNftBuilder} */


  use(input) {
    return useNft.useNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc approveNftUseAuthorityBuilder} */


  approveUseAuthority(input) {
    return approveNftUseAuthority.approveNftUseAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeNftUseAuthorityBuilder} */


  revokeUseAuthority(input) {
    return revokeNftUseAuthority.revokeNftUseAuthorityBuilder(this.metaplex, input);
  } // -----------------
  // Creators
  // -----------------

  /** {@inheritDoc verifyNftCreatorBuilder} */


  verifyCreator(input) {
    return verifyNftCreator.verifyNftCreatorBuilder(this.metaplex, input);
  }
  /** {@inheritDoc unverifyNftCreatorBuilder} */


  unverifyCreator(input) {
    return unverifyNftCreator.unverifyNftCreatorBuilder(this.metaplex, input);
  } // -----------------
  // Collections
  // -----------------

  /** {@inheritDoc verifyNftCollectionBuilder} */


  verifyCollection(input) {
    return verifyNftCollection.verifyNftCollectionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc unverifyNftCollectionBuilder} */


  unverifyCollection(input) {
    return unverifyNftCollection.unverifyNftCollectionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc approveNftCollectionAuthorityBuilder} */


  approveCollectionAuthority(input) {
    return approveNftCollectionAuthority.approveNftCollectionAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeNftCollectionAuthorityBuilder} */


  revokeCollectionAuthority(input) {
    return revokeNftCollectionAuthority.revokeNftCollectionAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc migrateToSizedCollectionNftBuilder} */


  migrateToSizedCollection(input) {
    return migrateToSizedCollectionNft.migrateToSizedCollectionNftBuilder(this.metaplex, input);
  } // -----------------
  // Token
  // -----------------

  /** {@inheritDoc freezeDelegatedNftBuilder} */


  freezeDelegatedNft(input) {
    return freezeDelegatedNft.freezeDelegatedNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc thawDelegatedNftBuilder} */


  thawDelegatedNft(input) {
    return thawDelegatedNft.thawDelegatedNftBuilder(this.metaplex, input);
  }

}

exports.NftBuildersClient = NftBuildersClient;
//# sourceMappingURL=NftBuildersClient.cjs.map
