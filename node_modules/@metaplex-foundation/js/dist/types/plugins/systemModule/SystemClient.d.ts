import type { Metaplex } from '../../Metaplex';
import { CreateAccountInput, TransferSolInput } from './operations';
import { SystemBuildersClient } from './SystemBuildersClient';
/**
 * This is a client for the System module.
 *
 * It enables us to interact with the System program in order to
 * create uninitialized accounts and transfer SOL.
 *
 * You may access this client via the `system()` method of your `Metaplex` instance.
 *
 * ```ts
 * const systemClient = metaplex.system();
 * ```
 *
 * @example
 * You can create a new uninitialized account with a given space in bytes
 * using the code below.
 *
 * ```ts
 * const { newAccount } = await metaplex.system().createAccount({ space: 42 });
 * ```
 *
 * @group Modules
 */
export declare class SystemClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /**
     * You may use the `builders()` client to access the
     * underlying Transaction Builders of this module.
     */
    builders(): SystemBuildersClient;
    /** {@inheritDoc createAccountOperation} */
    createAccount(input: CreateAccountInput): import("../..").Task<import("./operations").CreateAccountOutput, []>;
    /** {@inheritDoc transferSolOperation} */
    transferSol(input: TransferSolInput): import("../..").Task<import("./operations").TransferSolOutput, []>;
}
