import { GuestIdentityDriver } from './GuestIdentityDriver.mjs';

/** @group Plugins */

const guestIdentity = () => ({
  install(metaplex) {
    metaplex.identity().setDriver(new GuestIdentityDriver());
  }

});

export { guestIdentity };
//# sourceMappingURL=plugin.mjs.map
