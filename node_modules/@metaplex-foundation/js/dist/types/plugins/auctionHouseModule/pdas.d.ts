import { PublicKey } from '@solana/web3.js';
import { BigNumber, Pda } from '../../types';
import { Option } from '../../utils';
/** @group Pdas */
export declare const findAuctionHousePda: (creator: PublicKey, treasuryMint: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctioneerPda: (auctionHouse: PublicKey, auctioneerAuthority: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctionHouseProgramAsSignerPda: (programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctionHouseFeePda: (auctionHouse: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctionHouseTreasuryPda: (auctionHouse: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctionHouseBuyerEscrowPda: (auctionHouse: PublicKey, buyer: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findAuctionHouseTradeStatePda: (auctionHouse: PublicKey, wallet: PublicKey, treasuryMint: PublicKey, tokenMint: PublicKey, buyPrice: BigNumber, tokenSize: BigNumber, tokenAccount?: Option<PublicKey> | undefined, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findListingReceiptPda: (tradeState: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findBidReceiptPda: (tradeState: PublicKey, programId?: PublicKey) => Pda;
/** @group Pdas */
export declare const findPurchaseReceiptPda: (sellerTradeState: PublicKey, buyerTradeState: PublicKey, programId?: PublicKey) => Pda;
