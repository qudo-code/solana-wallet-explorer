import { AuthorityScope } from '@metaplex-foundation/mpl-auction-house';
import type { PublicKey } from '@solana/web3.js';
import { Pda } from '../../types';
import { AuctioneerAccount, AuctionHouseAccount } from './accounts';
import { Mint } from '../tokenModule';
export declare type AuctionHouse = Readonly<{
    model: 'auctionHouse';
    address: Pda;
    creatorAddress: PublicKey;
    authorityAddress: PublicKey;
    treasuryMint: Mint;
    feeAccountAddress: Pda;
    treasuryAccountAddress: Pda;
    feeWithdrawalDestinationAddress: PublicKey;
    treasuryWithdrawalDestinationAddress: PublicKey;
    sellerFeeBasisPoints: number;
    requiresSignOff: boolean;
    canChangeSalePrice: boolean;
    isNative: boolean;
} & ({
    hasAuctioneer: false;
} | {
    hasAuctioneer: true;
    auctioneer: {
        address: PublicKey;
        authority: PublicKey;
        scopes: AuthorityScope[];
    };
})>;
export declare const isAuctionHouse: (value: any) => value is AuctionHouse;
export declare function assertAuctionHouse(value: any): asserts value is AuctionHouse;
export declare type AuctioneerAuctionHouse = AuctionHouse & {
    hasAuctioneer: true;
};
export declare const isAuctioneerAuctionHouse: (value: any) => value is Readonly<{
    model: 'auctionHouse';
    address: Pda;
    creatorAddress: PublicKey;
    authorityAddress: PublicKey;
    treasuryMint: Mint;
    feeAccountAddress: Pda;
    treasuryAccountAddress: Pda;
    feeWithdrawalDestinationAddress: PublicKey;
    treasuryWithdrawalDestinationAddress: PublicKey;
    sellerFeeBasisPoints: number;
    requiresSignOff: boolean;
    canChangeSalePrice: boolean;
    isNative: boolean;
} & {
    hasAuctioneer: true;
    auctioneer: {
        address: PublicKey;
        authority: PublicKey;
        scopes: AuthorityScope[];
    };
}> & {
    hasAuctioneer: true;
};
export declare function assertAuctioneerAuctionHouse(value: any): asserts value is AuctioneerAuctionHouse;
export declare const toAuctionHouse: (auctionHouseAccount: AuctionHouseAccount, treasuryMint: Mint, auctioneerAccount?: AuctioneerAccount | null | undefined) => AuctionHouse;
