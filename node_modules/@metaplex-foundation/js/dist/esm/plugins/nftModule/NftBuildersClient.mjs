import { createNftBuilder } from './operations/createNft.mjs';
import { createSftBuilder } from './operations/createSft.mjs';
import { printNewEditionBuilder } from './operations/printNewEdition.mjs';
import { updateNftBuilder } from './operations/updateNft.mjs';
import { deleteNftBuilder } from './operations/deleteNft.mjs';
import { useNftBuilder } from './operations/useNft.mjs';
import { approveNftUseAuthorityBuilder } from './operations/approveNftUseAuthority.mjs';
import { revokeNftUseAuthorityBuilder } from './operations/revokeNftUseAuthority.mjs';
import { verifyNftCreatorBuilder } from './operations/verifyNftCreator.mjs';
import { unverifyNftCreatorBuilder } from './operations/unverifyNftCreator.mjs';
import { verifyNftCollectionBuilder } from './operations/verifyNftCollection.mjs';
import { unverifyNftCollectionBuilder } from './operations/unverifyNftCollection.mjs';
import { approveNftCollectionAuthorityBuilder } from './operations/approveNftCollectionAuthority.mjs';
import { revokeNftCollectionAuthorityBuilder } from './operations/revokeNftCollectionAuthority.mjs';
import { migrateToSizedCollectionNftBuilder } from './operations/migrateToSizedCollectionNft.mjs';
import { freezeDelegatedNftBuilder } from './operations/freezeDelegatedNft.mjs';
import { thawDelegatedNftBuilder } from './operations/thawDelegatedNft.mjs';

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
    return createNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc createSftBuilder} */


  createSft(input) {
    return createSftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc printNewEditionBuilder} */


  printNewEdition(input) {
    return printNewEditionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc updateNftBuilder} */


  update(input) {
    return updateNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc deleteNftBuilder} */


  delete(input) {
    return deleteNftBuilder(this.metaplex, input);
  } // -----------------
  // Use
  // -----------------

  /** {@inheritDoc useNftBuilder} */


  use(input) {
    return useNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc approveNftUseAuthorityBuilder} */


  approveUseAuthority(input) {
    return approveNftUseAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeNftUseAuthorityBuilder} */


  revokeUseAuthority(input) {
    return revokeNftUseAuthorityBuilder(this.metaplex, input);
  } // -----------------
  // Creators
  // -----------------

  /** {@inheritDoc verifyNftCreatorBuilder} */


  verifyCreator(input) {
    return verifyNftCreatorBuilder(this.metaplex, input);
  }
  /** {@inheritDoc unverifyNftCreatorBuilder} */


  unverifyCreator(input) {
    return unverifyNftCreatorBuilder(this.metaplex, input);
  } // -----------------
  // Collections
  // -----------------

  /** {@inheritDoc verifyNftCollectionBuilder} */


  verifyCollection(input) {
    return verifyNftCollectionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc unverifyNftCollectionBuilder} */


  unverifyCollection(input) {
    return unverifyNftCollectionBuilder(this.metaplex, input);
  }
  /** {@inheritDoc approveNftCollectionAuthorityBuilder} */


  approveCollectionAuthority(input) {
    return approveNftCollectionAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc revokeNftCollectionAuthorityBuilder} */


  revokeCollectionAuthority(input) {
    return revokeNftCollectionAuthorityBuilder(this.metaplex, input);
  }
  /** {@inheritDoc migrateToSizedCollectionNftBuilder} */


  migrateToSizedCollection(input) {
    return migrateToSizedCollectionNftBuilder(this.metaplex, input);
  } // -----------------
  // Token
  // -----------------

  /** {@inheritDoc freezeDelegatedNftBuilder} */


  freezeDelegatedNft(input) {
    return freezeDelegatedNftBuilder(this.metaplex, input);
  }
  /** {@inheritDoc thawDelegatedNftBuilder} */


  thawDelegatedNft(input) {
    return thawDelegatedNftBuilder(this.metaplex, input);
  }

}

export { NftBuildersClient };
//# sourceMappingURL=NftBuildersClient.mjs.map
