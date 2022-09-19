import { MetaplexPlugin } from '../../types';
import { CandyMachinesClient } from './CandyMachinesClient';
/** @group Plugins */
export declare const candyMachineModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        candyMachines(): CandyMachinesClient;
    }
}
