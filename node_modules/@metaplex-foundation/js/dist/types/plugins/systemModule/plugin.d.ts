import type { MetaplexPlugin } from '../../types';
import { SystemClient } from './SystemClient';
/**
 * @group Plugins
 */
/** @group Plugins */
export declare const systemModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        system(): SystemClient;
    }
}
