import { ConfirmOptions } from '@solana/web3.js';
import { TransactionBuilder } from '../../utils';
import { Operation, OperationHandler, Signer } from '../../types';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
import { AuctionHouse } from './AuctionHouse';
import { Listing } from './Listing';
declare const Key: "CancelListingOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const cancelListingOperation: import("../../types").OperationConstructor<CancelListingOperation, "CancelListingOperation", CancelListingInput, CancelListingOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CancelListingOperation = Operation<typeof Key, CancelListingInput, CancelListingOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CancelListingInput = {
    auctionHouse: AuctionHouse;
    auctioneerAuthority?: Signer;
    listing: Listing;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CancelListingOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const cancelListingOperationHandler: OperationHandler<CancelListingOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CancelListingBuilderParams = Omit<CancelListingInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CancelListingBuilderContext = Omit<CancelListingOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const cancelListingBuilder: (params: CancelListingBuilderParams) => TransactionBuilder<CancelListingBuilderContext>;
export {};
