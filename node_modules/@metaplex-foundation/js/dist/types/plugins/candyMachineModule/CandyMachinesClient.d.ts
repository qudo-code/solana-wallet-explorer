import type { Metaplex } from '../../Metaplex';
import { Task } from '../../utils';
import type { PublicKey } from '@solana/web3.js';
import { CandyMachinesBuildersClient } from './CandyMachinesBuildersClient';
import { CandyMachine } from './models';
import { CreateCandyMachineInput, DeleteCandyMachineInput, FindCandyMachineByAddressInput, FindCandyMachinesByPublicKeyFieldInput, FindMintedNftsByCandyMachineInput, InsertItemsToCandyMachineInput, MintCandyMachineInput, UpdateCandyMachineInput } from './operations';
/**
 * @group Modules
 */
export declare class CandyMachinesClient {
    readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    builders(): CandyMachinesBuildersClient;
    /** {@inheritDoc createCandyMachineOperation} */
    create(input: CreateCandyMachineInput): Task<import("./operations").CreateCandyMachineOutput, []>;
    /** {@inheritDoc deleteCandyMachineOperation} */
    delete(input: DeleteCandyMachineInput): Task<import("./operations").DeleteCandyMachineOutput, []>;
    /** {@inheritDoc findCandyMachinesByPublicKeyFieldOperation} */
    findAllBy(input: FindCandyMachinesByPublicKeyFieldInput): Task<CandyMachine[], []>;
    /** {@inheritDoc findCandyMachineByAddressOperation} */
    findByAddress(input: FindCandyMachineByAddressInput): Task<CandyMachine>;
    /** {@inheritDoc findMintedNftsByCandyMachineOperation} */
    findMintedNfts(input: FindMintedNftsByCandyMachineInput): Task<import("./operations").FindMintedNftsByCandyMachineOutput, []>;
    /** {@inheritDoc insertItemsToCandyMachineOperation} */
    insertItems(input: InsertItemsToCandyMachineInput): Task<import("./operations").InsertItemsToCandyMachineOutput, []>;
    /** {@inheritDoc mintCandyMachineOperation} */
    mint(input: MintCandyMachineInput): Task<import("./operations").MintCandyMachineOutput, []>;
    /**
     * Helper method that refetches a given Candy Machine.
     */
    refresh(candyMachine: CandyMachine | PublicKey, input?: Omit<FindCandyMachineByAddressInput, 'address'>): Task<CandyMachine>;
    /** {@inheritDoc updateCandyMachineOperation} */
    update(input: UpdateCandyMachineInput): Task<import("./operations").UpdateCandyMachineOutput, []>;
}
