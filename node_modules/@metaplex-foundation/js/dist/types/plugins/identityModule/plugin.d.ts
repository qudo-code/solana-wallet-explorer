import { MetaplexPlugin } from '../../types';
import { IdentityClient } from './IdentityClient';
/** @group Plugins */
export declare const identityModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        identity(): IdentityClient;
    }
}
