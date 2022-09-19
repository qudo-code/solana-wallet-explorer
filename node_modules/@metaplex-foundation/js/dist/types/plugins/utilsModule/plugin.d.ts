import { MetaplexPlugin } from '../../types';
import { UtilsClient } from './UtilsClient';
/** @group Plugins */
export declare const utilsModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        utils(): UtilsClient;
    }
}
