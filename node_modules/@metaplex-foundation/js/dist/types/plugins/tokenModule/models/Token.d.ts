import type { PublicKey } from '@solana/web3.js';
import { Pda, SplTokenAmount } from '../../../types';
import { Option } from '../../../utils';
import { TokenAccount } from '../accounts';
import { Mint } from './Mint';
import { AccountState } from '@solana/spl-token';
/** @group Models */
export declare type Token = {
    readonly model: 'token';
    readonly address: PublicKey | Pda;
    readonly isAssociatedToken: boolean;
    readonly mintAddress: PublicKey;
    readonly ownerAddress: PublicKey;
    readonly amount: SplTokenAmount;
    readonly closeAuthorityAddress: Option<PublicKey>;
    readonly delegateAddress: Option<PublicKey>;
    readonly delegateAmount: SplTokenAmount;
    readonly state: AccountState;
};
/** @group Model Helpers */
export declare const isToken: (value: any) => value is Token;
/** @group Model Helpers */
export declare function assertToken(value: any): asserts value is Token;
/** @group Model Helpers */
export declare const toToken: (account: TokenAccount) => Token;
/** @group Models */
export declare type TokenWithMint = Omit<Token, 'model' | 'mintAddress'> & Readonly<{
    model: 'tokenWithMint';
    mint: Mint;
}>;
/** @group Model Helpers */
export declare const isTokenWithMint: (value: any) => value is TokenWithMint;
/** @group Model Helpers */
export declare function assertTokenWithMint(value: any): asserts value is TokenWithMint;
/** @group Model Helpers */
export declare const toTokenWithMint: (tokenAccount: TokenAccount, mintModel: Mint) => TokenWithMint;
