import { PublicKeyValues } from '../../types';
import type { PublicKey } from '@solana/web3.js';
import type { Nft, NftWithToken, Sft, SftWithToken } from './models';
import type { Metadata } from './models/Metadata';
export declare type HasMintAddress = Nft | Sft | NftWithToken | SftWithToken | Metadata | PublicKey;
export declare const toMintAddress: (value: PublicKeyValues | HasMintAddress) => PublicKey;
