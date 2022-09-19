import { createAccountBuilder } from './operations/createAccount.mjs';
import { transferSolBuilder } from './operations/transferSol.mjs';

/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the System module.
 *
 * @see {@link SystemClient}
 * @group Module Builders
 * */

class SystemBuildersClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }
  /** {@inheritDoc createAccountBuilder} */


  createAccount(input) {
    return createAccountBuilder(this.metaplex, input);
  }
  /** {@inheritDoc transferSolBuilder} */


  transferSol(input) {
    return transferSolBuilder(this.metaplex, input);
  }

}

export { SystemBuildersClient };
//# sourceMappingURL=SystemBuildersClient.mjs.map
