import { MetaplexPlugin } from '../../types';
import { DerivedIdentityClient } from './DerivedIdentityClient';
/** @group Plugins */
export declare const derivedIdentity: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        derivedIdentity(): DerivedIdentityClient;
    }
}
