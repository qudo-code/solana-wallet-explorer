import type { Metaplex } from '../../Metaplex';
import { CreateAccountBuilderParams, TransferSolBuilderParams } from './operations';
/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the System module.
 *
 * @see {@link SystemClient}
 * @group Module Builders
 * */
export declare class SystemBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /** {@inheritDoc createAccountBuilder} */
    createAccount(input: CreateAccountBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateAccountBuilderContext>>;
    /** {@inheritDoc transferSolBuilder} */
    transferSol(input: TransferSolBuilderParams): import("../..").TransactionBuilder<object>;
}
