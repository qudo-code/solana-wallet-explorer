import { createSignMetadataInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'VerifyNftCreatorOperation';
/**
 * @group Operations
 * @category Constructors
 */

const verifyNftCreatorOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const verifyNftCreatorOperationHandler = {
  handle: async (operation, metaplex) => {
    return verifyNftCreatorBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const verifyNftCreatorBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    creator = metaplex.identity()
  } = params;
  return TransactionBuilder.make() // Verify the creator.
  .add({
    instruction: createSignMetadataInstruction({
      metadata: findMetadataPda(mintAddress),
      creator: creator.publicKey
    }),
    signers: [creator],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'verifyCreator'
  });
};

export { verifyNftCreatorBuilder, verifyNftCreatorOperation, verifyNftCreatorOperationHandler };
//# sourceMappingURL=verifyNftCreator.mjs.map
