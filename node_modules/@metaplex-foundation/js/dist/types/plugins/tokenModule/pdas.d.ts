import { PublicKey } from '@solana/web3.js';
import { Pda } from '../../types';
/** @group Pdas */
export declare const findAssociatedTokenAccountPda: (mint: PublicKey, owner: PublicKey, tokenProgramId?: PublicKey, associatedTokenProgramId?: PublicKey) => Pda;
