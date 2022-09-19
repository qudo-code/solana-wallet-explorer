import { toMintAddress } from './helpers.mjs';
import { NftBuildersClient } from './NftBuildersClient.mjs';
import { findNftByMintOperation } from './operations/findNftByMint.mjs';
import { findNftByMetadataOperation } from './operations/findNftByMetadata.mjs';
import { findNftByTokenOperation } from './operations/findNftByToken.mjs';
import { findNftsByCreatorOperation } from './operations/findNftsByCreator.mjs';
import { findNftsByMintListOperation } from './operations/findNftsByMintList.mjs';
import { findNftsByOwnerOperation } from './operations/findNftsByOwner.mjs';
import { findNftsByUpdateAuthorityOperation } from './operations/findNftsByUpdateAuthority.mjs';
import { loadMetadataOperation } from './operations/loadMetadata.mjs';
import { createNftOperation } from './operations/createNft.mjs';
import { createSftOperation } from './operations/createSft.mjs';
import { printNewEditionOperation } from './operations/printNewEdition.mjs';
import { uploadMetadataOperation } from './operations/uploadMetadata.mjs';
import { updateNftOperation } from './operations/updateNft.mjs';
import { deleteNftOperation } from './operations/deleteNft.mjs';
import { useNftOperation } from './operations/useNft.mjs';
import { approveNftUseAuthorityOperation } from './operations/approveNftUseAuthority.mjs';
import { revokeNftUseAuthorityOperation } from './operations/revokeNftUseAuthority.mjs';
import { verifyNftCreatorOperation } from './operations/verifyNftCreator.mjs';
import { unverifyNftCreatorOperation } from './operations/unverifyNftCreator.mjs';
import { verifyNftCollectionOperation } from './operations/verifyNftCollection.mjs';
import { unverifyNftCollectionOperation } from './operations/unverifyNftCollection.mjs';
import { approveNftCollectionAuthorityOperation } from './operations/approveNftCollectionAuthority.mjs';
import { revokeNftCollectionAuthorityOperation } from './operations/revokeNftCollectionAuthority.mjs';
import { migrateToSizedCollectionNftOperation } from './operations/migrateToSizedCollectionNft.mjs';
import { freezeDelegatedNftOperation } from './operations/freezeDelegatedNft.mjs';
import { thawDelegatedNftOperation } from './operations/thawDelegatedNft.mjs';
import { token } from '../../types/Amount.mjs';

/**
 * @group Modules
 */

class NftClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new NftBuildersClient(this.metaplex);
  } // -----------------
  // Queries
  // -----------------

  /** {@inheritDoc findNftByMintOperation} */


  findByMint(input) {
    return this.metaplex.operations().getTask(findNftByMintOperation(input));
  }
  /** {@inheritDoc findNftByMetadataOperation} */


  findByMetadata(input) {
    return this.metaplex.operations().getTask(findNftByMetadataOperation(input));
  }
  /** {@inheritDoc findNftByTokenOperation} */


  findByToken(input) {
    return this.metaplex.operations().getTask(findNftByTokenOperation(input));
  }
  /** {@inheritDoc findNftsByCreatorOperation} */


  findAllByCreator(input) {
    return this.metaplex.operations().getTask(findNftsByCreatorOperation(input));
  }
  /** {@inheritDoc findNftsByMintListOperation} */


  findAllByMintList(input) {
    return this.metaplex.operations().getTask(findNftsByMintListOperation(input));
  }
  /** {@inheritDoc findNftsByOwnerOperation} */


  findAllByOwner(input) {
    return this.metaplex.operations().getTask(findNftsByOwnerOperation(input));
  }
  /** {@inheritDoc findNftsByUpdateAuthorityOperation} */


  findAllByUpdateAuthority(input) {
    return this.metaplex.operations().getTask(findNftsByUpdateAuthorityOperation(input));
  }
  /** {@inheritDoc loadMetadataOperation} */


  load(input) {
    return this.metaplex.operations().getTask(loadMetadataOperation(input));
  }
  /**
   * Helper method that refetches a given model
   * and returns an instance of the same type.
   */


  refresh(model, input) {
    return this.findByMint({
      mintAddress: toMintAddress(model),
      tokenAddress: 'token' in model ? model.token.address : undefined,
      ...input
    });
  } // -----------------
  // Create, Update and Delete
  // -----------------

  /** {@inheritDoc createNftOperation} */


  create(input) {
    return this.metaplex.operations().getTask(createNftOperation(input));
  }
  /** {@inheritDoc createSftOperation} */


  createSft(input) {
    return this.metaplex.operations().getTask(createSftOperation(input));
  }
  /** {@inheritDoc printNewEditionOperation} */


  printNewEdition(input) {
    return this.metaplex.operations().getTask(printNewEditionOperation(input));
  }
  /** {@inheritDoc uploadMetadataOperation} */


  uploadMetadata(input) {
    return this.metaplex.operations().getTask(uploadMetadataOperation(input));
  }
  /** {@inheritDoc updateNftOperation} */


  update(input) {
    return this.metaplex.operations().getTask(updateNftOperation(input));
  }
  /** {@inheritDoc deleteNftOperation} */


  delete(input) {
    return this.metaplex.operations().getTask(deleteNftOperation(input));
  } // -----------------
  // Use
  // -----------------

  /** {@inheritDoc useNftOperation} */


  use(input) {
    return this.metaplex.operations().getTask(useNftOperation(input));
  }
  /** {@inheritDoc approveNftUseAuthorityOperation} */


  approveUseAuthority(input) {
    return this.metaplex.operations().getTask(approveNftUseAuthorityOperation(input));
  }
  /** {@inheritDoc revokeNftUseAuthorityOperation} */


  revokeUseAuthority(input) {
    return this.metaplex.operations().getTask(revokeNftUseAuthorityOperation(input));
  } // -----------------
  // Creators
  // -----------------

  /** {@inheritDoc verifyNftCreatorOperation} */


  verifyCreator(input) {
    return this.metaplex.operations().getTask(verifyNftCreatorOperation(input));
  }
  /** {@inheritDoc unverifyNftCreatorOperation} */


  unverifyCreator(input) {
    return this.metaplex.operations().getTask(unverifyNftCreatorOperation(input));
  } // -----------------
  // Collections
  // -----------------

  /** {@inheritDoc verifyNftCollectionOperation} */


  verifyCollection(input) {
    return this.metaplex.operations().getTask(verifyNftCollectionOperation(input));
  }
  /** {@inheritDoc unverifyNftCollectionOperation} */


  unverifyCollection(input) {
    return this.metaplex.operations().getTask(unverifyNftCollectionOperation(input));
  }
  /** {@inheritDoc approveNftCollectionAuthorityOperation} */


  approveCollectionAuthority(input) {
    return this.metaplex.operations().getTask(approveNftCollectionAuthorityOperation(input));
  }
  /** {@inheritDoc revokeNftCollectionAuthorityOperation} */


  revokeCollectionAuthority(input) {
    return this.metaplex.operations().getTask(revokeNftCollectionAuthorityOperation(input));
  }
  /** {@inheritDoc migrateToSizedCollectionNftOperation} */


  migrateToSizedCollection(input) {
    return this.metaplex.operations().getTask(migrateToSizedCollectionNftOperation(input));
  } // -----------------
  // Tokens
  // -----------------

  /** {@inheritDoc freezeDelegatedNftOperation} */


  freezeDelegatedNft(input) {
    return this.metaplex.operations().getTask(freezeDelegatedNftOperation(input));
  }
  /** {@inheritDoc thawDelegatedNftOperation} */


  thawDelegatedNft(input) {
    return this.metaplex.operations().getTask(thawDelegatedNftOperation(input));
  }
  /** {@inheritDoc sendTokensOperation} */


  send(input) {
    return this.metaplex.tokens().send({ ...input,
      amount: token(1)
    });
  }

}

export { NftClient };
//# sourceMappingURL=NftClient.mjs.map
