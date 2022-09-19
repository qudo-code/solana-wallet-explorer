import { Metaplex } from '../../../Metaplex';
import { BigNumber, CreatorInput, Operation, OperationHandler, Signer, SplTokenAmount } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { Sft, SftWithToken } from '../models';
declare const Key: "CreateSftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createSftOperation: import("../../../types").OperationConstructor<CreateSftOperation, "CreateSftOperation", CreateSftInput, CreateSftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateSftOperation = Operation<typeof Key, CreateSftInput, CreateSftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateSftInput = {
    payer?: Signer;
    updateAuthority?: Signer;
    mintAuthority?: Signer;
    freezeAuthority?: Option<PublicKey>;
    useNewMint?: Signer;
    useExistingMint?: PublicKey;
    tokenAddress?: PublicKey | Signer;
    tokenOwner?: PublicKey;
    tokenAmount?: SplTokenAmount;
    decimals?: number;
    uri: string;
    name: string;
    sellerFeeBasisPoints: number;
    symbol?: string;
    creators?: CreatorInput[];
    isMutable?: boolean;
    maxSupply?: Option<BigNumber>;
    uses?: Option<Uses>;
    isCollection?: boolean;
    collection?: Option<PublicKey>;
    collectionAuthority?: Option<Signer>;
    collectionAuthorityIsDelegated?: boolean;
    collectionIsSized?: boolean;
    tokenProgram?: PublicKey;
    associatedTokenProgram?: PublicKey;
    confirmOptions?: ConfirmOptions;
};
/**
 * @group Operations
 * @category Outputs
 */
export declare type CreateSftOutput = {
    response: SendAndConfirmTransactionResponse;
    sft: Sft | SftWithToken;
    mintAddress: PublicKey;
    metadataAddress: PublicKey;
    tokenAddress: PublicKey | null;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createSftOperationHandler: OperationHandler<CreateSftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateSftBuilderParams = Omit<CreateSftInput, 'confirmOptions'> & {
    tokenExists?: boolean;
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
    createMetadataInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateSftBuilderContext = Omit<CreateSftOutput, 'response' | 'sft'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createSftBuilder: (metaplex: Metaplex, params: CreateSftBuilderParams) => Promise<TransactionBuilder<CreateSftBuilderContext>>;
export {};
