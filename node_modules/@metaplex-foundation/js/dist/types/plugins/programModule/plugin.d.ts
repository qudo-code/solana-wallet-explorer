import { MetaplexPlugin } from '../../types';
import { ProgramClient } from './ProgramClient';
/** @group Plugins */
export declare const programModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        programs(): ProgramClient;
    }
}
