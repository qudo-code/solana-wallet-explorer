import { Metaplex } from '../../../Metaplex';
import { BigNumber, CreatorInput, Operation, OperationHandler, Signer } from '../../../types';
import { Option, TransactionBuilder } from '../../../utils';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
import { ConfirmOptions, PublicKey } from '@solana/web3.js';
import { SendAndConfirmTransactionResponse } from '../../rpcModule';
import { NftWithToken } from '../models';
declare const Key: "CreateNftOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const createNftOperation: import("../../../types").OperationConstructor<CreateNftOperation, "CreateNftOperation", CreateNftInput, CreateNftOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type CreateNftOperation = Operation<typeof Key, CreateNftInput, CreateNftOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type CreateNftInput = {
    payer?: Signer;
    updateAuthority?: Signer;
    mintAuthority?: Signer;
    useNewMint?: Signer;
    useExistingMint?: PublicKey;
    tokenOwner?: PublicKey;
    tokenAddress?: PublicKey | Signer;
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
export declare type CreateNftOutput = {
    response: SendAndConfirmTransactionResponse;
    nft: NftWithToken;
    mintAddress: PublicKey;
    metadataAddress: PublicKey;
    masterEditionAddress: PublicKey;
    tokenAddress: PublicKey;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const createNftOperationHandler: OperationHandler<CreateNftOperation>;
/**
 * @group Transaction Builders
 * @category Inputs
 */
export declare type CreateNftBuilderParams = Omit<CreateNftInput, 'confirmOptions'> & {
    tokenExists?: boolean;
    createMintAccountInstructionKey?: string;
    initializeMintInstructionKey?: string;
    createAssociatedTokenAccountInstructionKey?: string;
    createTokenAccountInstructionKey?: string;
    initializeTokenInstructionKey?: string;
    mintTokensInstructionKey?: string;
    createMetadataInstructionKey?: string;
    createMasterEditionInstructionKey?: string;
};
/**
 * @group Transaction Builders
 * @category Contexts
 */
export declare type CreateNftBuilderContext = Omit<CreateNftOutput, 'response' | 'nft'>;
/**
 * @group Transaction Builders
 * @category Constructors
 */
export declare const createNftBuilder: (metaplex: Metaplex, params: CreateNftBuilderParams) => Promise<TransactionBuilder<CreateNftBuilderContext>>;
export {};
