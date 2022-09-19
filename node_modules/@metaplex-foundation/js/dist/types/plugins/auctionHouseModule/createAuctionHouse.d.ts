import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { AuthorityScope } from '@metaplex-foundation/mpl-auction-house';
import type { Metaplex } from '../../Metaplex';
import { Operation, Signer, OperationHandler, Pda } from '../../types';
import { TransactionBuilder } from '../../utils';
import { SendAndConfirmTransactionResponse } from '../rpcModule';
declare const Key: "CreateAuctionHouseOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createAuctionHouseOperation: import("../../types").OperationConstructor<CreateAuctionHouseOperation, "CreateAuctionHouseOperation", CreateAuctionHouseInput, CreateAuctionHouseOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateAuctionHouseOperation = Operation<typeof Key, CreateAuctionHouseInput, CreateAuctionHouseOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateAuctionHouseInput = {
    sellerFeeBasisPoints: number;
    requiresSignOff?: boolean;
    canChangeSalePrice?: boolean;
    auctioneerScopes?: AuthorityScope[];
    treasuryMint?: PublicKey;
    payer?: Signer;
    authority?: PublicKey | Signer;
    feeWithdrawalDestination?: PublicKey;
    treasuryWithdrawalDestinationOwner?: PublicKey;
    auctioneerAuthority?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateAuctionHouseOutput = {
    response: SendAndConfirmTransactionResponse;
    auctionHouseAddress: Pda;
    auctionHouseFeeAccountAddress: Pda;
    auctionHouseTreasuryAddress: Pda;
    treasuryWithdrawalDestinationAddress: PublicKey;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createAuctionHouseOperationHandler: OperationHandler<CreateAuctionHouseOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateAuctionHouseBuilderParams = Omit<CreateAuctionHouseInput, 'confirmOptions'> & {
    instructionKey?: string;
    delegateAuctioneerInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateAuctionHouseBuilderContext = Omit<CreateAuctionHouseOutput, 'response'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createAuctionHouseBuilder: (metaplex: Metaplex, params: CreateAuctionHouseBuilderParams) => TransactionBuilder<CreateAuctionHouseBuilderContext>;
export {};
