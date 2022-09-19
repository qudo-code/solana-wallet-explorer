import { PublicKey } from '@solana/web3.js';
import { Pda } from '../../types';
/** @group Pdas */
export declare const findCandyMachineCreatorPda: (candyMachine: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findCandyMachineCollectionPda: (candyMachine: PublicKey, programId?: PublicKey) => Pda;
