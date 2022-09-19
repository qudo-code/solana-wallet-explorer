import { MetaplexPlugin } from '../../types';
import { RpcClient } from './RpcClient';
/** @group Plugins */
export declare const rpcModule: () => MetaplexPlugin;
declare module '../../Metaplex' {
    interface Metaplex {
        rpc(): RpcClient;
    }
}
