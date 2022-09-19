import { ConfirmOptions } from '@solana/web3.js';
import { TransactionBuilder } from '../../utils';
import { Operation, OperationHandler, Signer } from '../../types';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
import { AuctionHouse } from './AuctionHouse';
import { Bid } from './Bid';
declare const Key: "CancelBidOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const cancelBidOperation: import("../../types").OperationConstructor<CancelBidOperation, "CancelBidOperation", CancelBidInput, CancelBidOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CancelBidOperation = Operation<typeof Key, CancelBidInput, CancelBidOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CancelBidInput = {
    auctionHouse: AuctionHouse;
    auctioneerAuthority?: Signer;
    bid: Bid;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CancelBidOutput = {
    response: SendAndConfirmTransactionResponse;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const cancelBidOperationHandler: OperationHandler<CancelBidOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CancelBidBuilderParams = Omit<CancelBidInput, 'confirmOptions'> & {
    instructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CancelBidBuilderContext = Omit<CancelBidOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const cancelBidBuilder: (params: CancelBidBuilderParams) => TransactionBuilder<CancelBidBuilderContext>;
export {};
