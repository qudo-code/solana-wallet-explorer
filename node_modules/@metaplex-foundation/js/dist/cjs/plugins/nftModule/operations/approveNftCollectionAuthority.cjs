'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var web3_js = require('@solana/web3.js');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'ApproveNftCollectionAuthorityOperation';
/**
 * @group Operations
 * @category Constructors
 */

const approveNftCollectionAuthorityOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const approveNftCollectionAuthorityOperationHandler = {
  handle: async (operation, metaplex) => {
    return approveNftCollectionAuthorityBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const approveNftCollectionAuthorityBuilder = (metaplex, params) => {
  var _params$systemProgram, _params$instructionKe;

  const {
    mintAddress,
    collectionAuthority,
    updateAuthority = metaplex.identity(),
    payer = metaplex.identity()
  } = params;
  const metadata = pdas.findMetadataPda(mintAddress);
  const collectionAuthorityRecord = pdas.findCollectionAuthorityRecordPda(mintAddress, collectionAuthority);
  return TransactionBuilder.TransactionBuilder.make().setFeePayer(payer) // Approve the collection authority.
  .add({
    instruction: mplTokenMetadata.createApproveCollectionAuthorityInstruction({
      collectionAuthorityRecord,
      newCollectionAuthority: collectionAuthority,
      updateAuthority: updateAuthority.publicKey,
      payer: payer.publicKey,
      metadata,
      mint: mintAddress,
      systemProgram: (_params$systemProgram = params.systemProgram) !== null && _params$systemProgram !== void 0 ? _params$systemProgram : web3_js.SystemProgram.programId
    }),
    signers: [payer, updateAuthority],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'approveCollectionAuthority'
  });
};

exports.approveNftCollectionAuthorityBuilder = approveNftCollectionAuthorityBuilder;
exports.approveNftCollectionAuthorityOperation = approveNftCollectionAuthorityOperation;
exports.approveNftCollectionAuthorityOperationHandler = approveNftCollectionAuthorityOperationHandler;
//# sourceMappingURL=approveNftCollectionAuthority.cjs.map
