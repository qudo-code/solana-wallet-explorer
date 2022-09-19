import type { Commitment, PublicKey } from '@solana/web3.js';
import { Operation, OperationHandler } from '../../types';
import { AuctionHouse } from './AuctionHouse';
declare const Key: "FindAuctionHouseByAddressOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findAuctionHouseByAddressOperation: import("../../types").OperationConstructor<FindAuctionHouseByAddressOperation, "FindAuctionHouseByAddressOperation", FindAuctionHouseByAddressInput, Readonly<{
    model: "auctionHouse";
    address: import("../../types").Pda;
    creatorAddress: PublicKey;
    authorityAddress: PublicKey;
    treasuryMint: import("..").Mint;
    feeAccountAddress: import("../../types").Pda;
    treasuryAccountAddress: import("../../types").Pda;
    feeWithdrawalDestinationAddress: PublicKey;
    treasuryWithdrawalDestinationAddress: PublicKey;
    sellerFeeBasisPoints: number;
    requiresSignOff: boolean;
    canChangeSalePrice: boolean;
    isNative: boolean;
} & {
    hasAuctioneer: false;
}> | Readonly<{
    model: "auctionHouse";
    address: import("../../types").Pda;
    creatorAddress: PublicKey;
    authorityAddress: PublicKey;
    treasuryMint: import("..").Mint;
    feeAccountAddress: import("../../types").Pda;
    treasuryAccountAddress: import("../../types").Pda;
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
        /**
         * @group Operations
         * @category Inputs
         */
        scopes: import("@metaplex-foundation/mpl-auction-house").AuthorityScope[];
    };
}>>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindAuctionHouseByAddressOperation = Operation<typeof Key, FindAuctionHouseByAddressInput, AuctionHouse>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindAuctionHouseByAddressInput = {
    address: PublicKey;
    auctioneerAuthority?: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findAuctionHouseByAddressOperationHandler: OperationHandler<FindAuctionHouseByAddressOperation>;
export {};
