'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplTokenMetadata = require('@metaplex-foundation/mpl-token-metadata');
var pdas = require('../pdas.cjs');
var Operation = require('../../../types/Operation.cjs');
var Signer = require('../../../types/Signer.cjs');
var SdkError = require('../../../errors/SdkError.cjs');
var pdas$1 = require('../../tokenModule/pdas.cjs');
var PublicKey = require('../../../types/PublicKey.cjs');
var TransactionBuilder = require('../../../utils/TransactionBuilder.cjs');

// Operation
// -----------------

const Key = 'UseNftOperation';
/**
 * @group Operations
 * @category Constructors
 */

const useNftOperation = Operation.useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const useNftOperationHandler = {
  handle: async (operation, metaplex) => {
    return useNftBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const useNftBuilder = (metaplex, params) => {
  var _params$ownerTokenAcc, _params$instructionKe;

  const {
    mintAddress,
    numberOfUses = 1,
    owner = metaplex.identity(),
    useAuthority
  } = params;

  if (!Signer.isSigner(owner) && !useAuthority) {
    throw new SdkError.ExpectedSignerError('owner', 'PublicKey', {
      problemSuffix: 'In order to use an NFT you must either provide the owner as a Signer ' + 'or a delegated use authority as a Signer.'
    });
  }

  const metadata = pdas.findMetadataPda(mintAddress);
  const tokenAccount = (_params$ownerTokenAcc = params.ownerTokenAccount) !== null && _params$ownerTokenAcc !== void 0 ? _params$ownerTokenAcc : pdas$1.findAssociatedTokenAccountPda(mintAddress, PublicKey.toPublicKey(owner));
  const useAuthorityRecord = useAuthority ? pdas.findUseAuthorityRecordPda(mintAddress, useAuthority.publicKey) : undefined;
  const programAsBurner = pdas.findProgramAsBurnerPda();
  return TransactionBuilder.TransactionBuilder.make() // Update the metadata account.
  .add({
    instruction: mplTokenMetadata.createUtilizeInstruction({
      metadata,
      tokenAccount,
      useAuthority: useAuthority ? useAuthority.publicKey : PublicKey.toPublicKey(owner),
      mint: mintAddress,
      owner: PublicKey.toPublicKey(owner),
      useAuthorityRecord,
      burner: useAuthorityRecord ? programAsBurner : undefined
    }, {
      utilizeArgs: {
        numberOfUses
      }
    }),
    signers: [owner, useAuthority].filter(Signer.isSigner),
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'utilizeNft'
  });
};

exports.useNftBuilder = useNftBuilder;
exports.useNftOperation = useNftOperation;
exports.useNftOperationHandler = useNftOperationHandler;
//# sourceMappingURL=useNft.cjs.map
