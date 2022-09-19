'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var AuctionsBuildersClient = require('./AuctionsBuildersClient.cjs');
var pdas = require('./pdas.cjs');
var createAuctionHouse = require('./createAuctionHouse.cjs');
var findAuctionHouseByAddress = require('./findAuctionHouseByAddress.cjs');
var updateAuctionHouse = require('./updateAuctionHouse.cjs');
var AuctionHouseClient = require('./AuctionHouseClient.cjs');
var Task = require('../../utils/Task.cjs');

/**
 * @group Modules
 */
class AuctionsClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new AuctionsBuildersClient.AuctionsBuildersClient(this.metaplex);
  }

  for(auctionHouse, auctioneerAuthority) {
    return new AuctionHouseClient.AuctionHouseClient(this.metaplex, auctionHouse, auctioneerAuthority);
  }

  createAuctionHouse(input) {
    return new Task.Task(async scope => {
      const output = await this.metaplex.operations().getTask(createAuctionHouse.createAuctionHouseOperation(input)).run(scope);
      scope.throwIfCanceled();
      const auctionHouse = await this.findAuctionHouseByAddress(output.auctionHouseAddress, input.auctioneerAuthority).run(scope);
      return { ...output,
        auctionHouse
      };
    });
  }

  updateAuctionHouse(auctionHouse, input) {
    return new Task.Task(async scope => {
      var _input$auctioneerAuth;

      const output = await this.metaplex.operations().getTask(updateAuctionHouse.updateAuctionHouseOperation({
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
    return this.metaplex.operations().getTask(findAuctionHouseByAddress.findAuctionHouseByAddressOperation({
      address,
      auctioneerAuthority,
      ...options
    }));
  }

  findAuctionHouseByCreatorAndMint(creator, treasuryMint, auctioneerAuthority, options) {
    return this.findAuctionHouseByAddress(pdas.findAuctionHousePda(creator, treasuryMint), auctioneerAuthority, options);
  }

}

exports.AuctionsClient = AuctionsClient;
//# sourceMappingURL=AuctionsClient.cjs.map
