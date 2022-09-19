'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createAccount = require('./operations/createAccount.cjs');
var transferSol = require('./operations/transferSol.cjs');

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
    return createAccount.createAccountBuilder(this.metaplex, input);
  }
  /** {@inheritDoc transferSolBuilder} */


  transferSol(input) {
    return transferSol.transferSolBuilder(this.metaplex, input);
  }

}

exports.SystemBuildersClient = SystemBuildersClient;
//# sourceMappingURL=SystemBuildersClient.cjs.map
