import { MetaplexError } from '../../errors/MetaplexError.mjs';

/** @group Errors */
class NftError extends MetaplexError {
  constructor(input) {
    super({ ...input,
      key: `plugin.nft.${input.key}`,
      title: `NFT > ${input.title}`,
      source: 'plugin',
      sourceDetails: 'NFT'
    });
  }

}
/** @group Errors */

class ParentCollectionMissingError extends NftError {
  constructor(mint, operation, options) {
    super({
      options,
      key: 'parent_collection_missing',
      title: 'Parent Collection Missing',
      problem: `You are trying to send the operation [${operation}] which requires the NFT to have ` + `a parent collection but that is not the case for the NFT at address [${mint}].`,
      solution: 'Ensure the NFT you are interacting with has a parent collection.'
    });
  }

}

export { NftError, ParentCollectionMissingError };
//# sourceMappingURL=errors.mjs.map
