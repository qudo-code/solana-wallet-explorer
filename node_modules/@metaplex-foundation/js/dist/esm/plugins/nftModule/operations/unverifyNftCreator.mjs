import { createRemoveCreatorVerificationInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda } from '../pdas.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'UnverifyNftCreatorOperation';
/**
 * @group Operations
 * @category Constructors
 */

const unverifyNftCreatorOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const unverifyNftCreatorOperationHandler = {
  handle: async (operation, metaplex) => {
    return unverifyNftCreatorBuilder(metaplex, operation.input).sendAndConfirm(metaplex, operation.input.confirmOptions);
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
const unverifyNftCreatorBuilder = (metaplex, params) => {
  var _params$instructionKe;

  const {
    mintAddress,
    creator = metaplex.identity()
  } = params;
  return TransactionBuilder.make() // Verify the creator.
  .add({
    instruction: createRemoveCreatorVerificationInstruction({
      metadata: findMetadataPda(mintAddress),
      creator: creator.publicKey
    }),
    signers: [creator],
    key: (_params$instructionKe = params.instructionKey) !== null && _params$instructionKe !== void 0 ? _params$instructionKe : 'unverifyCreator'
  });
};

export { unverifyNftCreatorBuilder, unverifyNftCreatorOperation, unverifyNftCreatorOperationHandler };
//# sourceMappingURL=unverifyNftCreator.mjs.map
