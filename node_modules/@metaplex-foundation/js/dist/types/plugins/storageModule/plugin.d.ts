import { MetaplexPlugin } from '../../types';
import { StorageClient } from './StorageClient';
/** @group Plugins */
export declare const storageModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        storage(): StorageClient;
    }
}
