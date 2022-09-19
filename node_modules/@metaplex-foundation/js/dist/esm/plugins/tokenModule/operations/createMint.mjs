import { MINT_SIZE, createInitializeMintInstruction } from '@solana/spl-token';
import { Keypair } from '@solana/web3.js';
import { TokenProgram } from '../program.mjs';
import { useOperation } from '../../../types/Operation.mjs';
import { TransactionBuilder } from '../../../utils/TransactionBuilder.mjs';

// Operation
// -----------------

const Key = 'CreateMintOperation';
/**
 * @group Operations
 * @category Constructors
 */

const createMintOperation = useOperation(Key);
/**
 * @group Operations
 * @category Types
 */

/**
 * @group Operations
 * @category Handlers
 */
const createMintOperationHandler = {
  async handle(operation, metaplex, scope) {
    const builder = await createMintBuilder(metaplex, operation.input);
    scope.throwIfCanceled();
    const output = await builder.sendAndConfirm(metaplex, operation.input.confirmOptions);
    scope.throwIfCanceled();
    const mint = await metaplex.tokens().findMintByAddress({
      address: output.mintSigner.publicKey
    }).run(scope);
    return { ...output,
      mint
    };
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
const createMintBuilder = async (metaplex, params) => {
  var _params$createAccount, _params$initializeMin;

  const {
    decimals = 0,
    mint = Keypair.generate(),
    payer = metaplex.identity(),
    mintAuthority = metaplex.identity().publicKey,
    freezeAuthority = mintAuthority,
    tokenProgram = TokenProgram.publicKey
  } = params;
  return TransactionBuilder.make().setFeePayer(payer).setContext({
    mintSigner: mint
  }) // Create an empty account for the mint.
  .add(await metaplex.system().builders().createAccount({
    payer,
    newAccount: mint,
    space: MINT_SIZE,
    program: tokenProgram,
    instructionKey: (_params$createAccount = params.createAccountInstructionKey) !== null && _params$createAccount !== void 0 ? _params$createAccount : 'createAccount'
  })) // Initialize the mint.
  .add({
    instruction: createInitializeMintInstruction(mint.publicKey, decimals, mintAuthority, freezeAuthority, tokenProgram),
    signers: [mint],
    key: (_params$initializeMin = params.initializeMintInstructionKey) !== null && _params$initializeMin !== void 0 ? _params$initializeMin : 'initializeMint'
  });
};

export { createMintBuilder, createMintOperation, createMintOperationHandler };
//# sourceMappingURL=createMint.mjs.map
