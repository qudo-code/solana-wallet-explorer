import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { AuthorityScope } from '@metaplex-foundation/mpl-auction-house';
import type { Metaplex } from '../../Metaplex';
import { Operation, Signer, OperationHandler } from '../../types';
import { TransactionBuilder } from '../../utils';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
import { AuctionHouse } from './AuctionHouse';
declare const Key: "UpdateAuctionHouseOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const updateAuctionHouseOperation: import("../../types").OperationConstructor<UpdateAuctionHouseOperation, "UpdateAuctionHouseOperation", UpdateAuctionHouseInput, UpdateAuctionHouseOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UpdateAuctionHouseOperation = Operation<typeof Key, UpdateAuctionHouseInput, UpdateAuctionHouseOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UpdateAuctionHouseInput = {
    auctionHouse: AuctionHouse;
    authority?: Signer;
    payer?: Signer;
    sellerFeeBasisPoints?: number | null;
    requiresSignOff?: boolean | null;
    canChangeSalePrice?: boolean | null;
    newAuthority?: PublicKey;
    feeWithdrawalDestination?: PublicKey;
    treasuryWithdrawalDestinationOwner?: PublicKey;
    auctioneerAuthority?: PublicKey;
    auctioneerScopes?: AuthorityScope[];
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type UpdateAuctionHouseOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const updateAuctionHouseOperationHandler: OperationHandler<UpdateAuctionHouseOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type UpdateAuctionHouseBuilderParams = Omit<UpdateAuctionHouseInput, 'confirmOptions'> & {
    instructionKey?: string;
    delegateAuctioneerInstructionKey?: string;
    updateAuctioneerInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const updateAuctionHouseBuilder: (metaplex: Metaplex, params: UpdateAuctionHouseBuilderParams) => TransactionBuilder;
export {};
