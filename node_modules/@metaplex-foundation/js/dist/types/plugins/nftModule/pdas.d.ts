import { PublicKey } from '@solana/web3.js';
import { BigNumber, Pda } from '../../types';
/** @group Pdas */
export declare const findMetadataPda: (mint: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findMasterEditionV2Pda: (mint: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findEditionPda: (mint: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findEditionMarkerPda: (mint: PublicKey, edition: BigNumber, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findCollectionAuthorityRecordPda: (mint: PublicKey, collectionAuthority: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findUseAuthorityRecordPda: (mint: PublicKey, useAuthority: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findProgramAsBurnerPda: (programId?: PublicKey) => Pda;
