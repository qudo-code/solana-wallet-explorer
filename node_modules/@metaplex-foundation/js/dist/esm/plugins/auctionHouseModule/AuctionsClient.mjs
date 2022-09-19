import { AuctionsBuildersClient } from './AuctionsBuildersClient.mjs';
import { findAuctionHousePda } from './pdas.mjs';
import { createAuctionHouseOperation } from './createAuctionHouse.mjs';
import { findAuctionHouseByAddressOperation } from './findAuctionHouseByAddress.mjs';
import { updateAuctionHouseOperation } from './updateAuctionHouse.mjs';
import { AuctionHouseClient } from './AuctionHouseClient.mjs';
import { Task } from '../../utils/Task.mjs';

/**
 * @group Modules
 */
class AuctionsClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new AuctionsBuildersClient(this.metaplex);
  }

  for(auctionHouse, auctioneerAuthority) {
    return new AuctionHouseClient(this.metaplex, auctionHouse, auctioneerAuthority);
  }

  createAuctionHouse(input) {
    return new Task(async scope => {
      const output = await this.metaplex.operations().getTask(createAuctionHouseOperation(input)).run(scope);
      scope.throwIfCanceled();
      const auctionHouse = await this.findAuctionHouseByAddress(output.auctionHouseAddress, input.auctioneerAuthority).run(scope);
      return { ...output,
        auctionHouse
      };
    });
  }

  updateAuctionHouse(auctionHouse, input) {
    return new Task(async scope => {
      var _input$auctioneerAuth;

      const output = await this.metaplex.operations().getTask(updateAuctionHouseOperation({
        auctionHouse,
        ...input
      })).run(scope);
      scope.throwIfCanceled();
      const currentAuctioneerAuthority = auctionHouse.hasAuctioneer ? auctionHouse.auctioneer.authority : undefined;
      const updatedAuctionHouse = await this.findAuctionHouseByAddress(auctionHouse.address, (_input$auctioneerAuth = input.auctioneerAuthority) !== null && _input$auctioneerAuth !== void 0 ? _input$auctioneerAuth : currentAuctioneerAuthority).run(scope);
      return { ...output,
        auctionHouse: updatedAuctionHouse
      };
    });
  }

  findAuctionHouseByAddress(address, auctioneerAuthority, options) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddressOperation({
      address,
      auctioneerAuthority,
      ...options
    }));
  }

  findAuctionHouseByCreatorAndMint(creator, treasuryMint, auctioneerAuthority, options) {
    return this.findAuctionHouseByAddress(findAuctionHousePda(creator, treasuryMint), auctioneerAuthority, options);
  }

}

export { AuctionsClient };
//# sourceMappingURL=AuctionsClient.mjs.map
