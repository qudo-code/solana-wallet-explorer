import type { Metaplex } from '../../Metaplex';
import { CreateCandyMachineBuilderParams, DeleteCandyMachineBuilderParams, InsertItemsToCandyMachineBuilderParams, MintCandyMachineBuilderParams, UpdateCandyMachineBuilderParams } from './operations';
/**
 * @group Module Builders
 */
export declare class CandyMachinesBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /** {@inheritDoc createCandyMachineBuilder} */
    create(input: CreateCandyMachineBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateCandyMachineBuilderContext>>;
    /** {@inheritDoc deleteCandyMachineBuilder} */
    delete(input: DeleteCandyMachineBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc insertItemsToCandyMachineBuilder} */
    insertItems(input: InsertItemsToCandyMachineBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc mintCandyMachineBuilder} */
    mint(input: MintCandyMachineBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").MintCandyMachineBuilderContext>>;
    /** {@inheritDoc updateCandyMachineBuilder} */
    update(input: UpdateCandyMachineBuilderParams): import("../..").TransactionBuilder<object>;
}
