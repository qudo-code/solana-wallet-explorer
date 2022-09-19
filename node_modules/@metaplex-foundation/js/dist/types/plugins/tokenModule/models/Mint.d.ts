import type { PublicKey } from '@solana/web3.js';
import { SplTokenCurrency, SplTokenAmount } from '../../../types';
import { Option } from '../../../utils';
import { MintAccount } from '../accounts';
/** @group Models */
export declare type Mint = {
    readonly model: 'mint';
    readonly address: PublicKey;
    readonly mintAuthorityAddress: Option<PublicKey>;
    readonly freezeAuthorityAddress: Option<PublicKey>;
    readonly decimals: number;
    readonly supply: SplTokenAmount;
    readonly isWrappedSol: boolean;
    readonly currency: SplTokenCurrency;
};
/** @group Model Helpers */
export declare const isMint: (value: any) => value is Mint;
/** @group Model Helpers */
export declare function assertMint(value: any): asserts value is Mint;
/** @group Model Helpers */
export declare const toMint: (account: MintAccount) => Mint;
