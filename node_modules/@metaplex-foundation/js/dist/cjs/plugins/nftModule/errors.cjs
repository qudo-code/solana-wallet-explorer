'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MetaplexError = require('../../errors/MetaplexError.cjs');

/** @group Errors */
class NftError extends MetaplexError.MetaplexError {
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

exports.NftError = NftError;
exports.ParentCollectionMissingError = ParentCollectionMissingError;
//# sourceMappingURL=errors.cjs.map
