import type { MetaplexPlugin } from '../../types';
import { AuctionsClient } from './AuctionsClient';
/** @group Plugins */
export declare const auctionHouseModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        auctions(): AuctionsClient;
    }
}
