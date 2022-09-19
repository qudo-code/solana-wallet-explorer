import { MetaplexPlugin } from '../../types';
import { NftClient } from './NftClient';
/** @group Plugins */
export declare const nftModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        nfts(): NftClient;
    }
}
