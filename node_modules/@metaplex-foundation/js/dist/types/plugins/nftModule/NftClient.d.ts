import type { Metaplex } from '../../Metaplex';
import { PartialKeys, Task } from '../../utils';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import { PublicKey } from '@solana/web3.js';
import { SendTokensInput } from '../tokenModule';
import { Nft, NftWithToken, Sft, SftWithToken } from './models';
import { NftBuildersClient } from './NftBuildersClient';
import { ApproveNftCollectionAuthorityInput, ApproveNftUseAuthorityInput, CreateNftInput, CreateSftInput, DeleteNftInput, FindNftByMetadataInput, FindNftByMintInput, FindNftByTokenInput, FindNftsByCreatorInput, FindNftsByMintListInput, FindNftsByOwnerInput, FindNftsByUpdateAuthorityInput, FreezeDelegatedNftInput, LoadMetadataInput, MigrateToSizedCollectionNftInput, PrintNewEditionInput, RevokeNftCollectionAuthorityInput, RevokeNftUseAuthorityInput, ThawDelegatedNftInput, UnverifyNftCollectionInput, UnverifyNftCreatorInput, UpdateNftInput, UploadMetadataInput, UseNftInput, VerifyNftCollectionInput, VerifyNftCreatorInput } from './operations';
/**
 * @group Modules
 */
export declare class NftClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    builders(): NftBuildersClient;
    /** {@inheritDoc findNftByMintOperation} */
    findByMint(input: FindNftByMintInput): Task<Sft | SftWithToken | Nft | NftWithToken, []>;
    /** {@inheritDoc findNftByMetadataOperation} */
    findByMetadata(input: FindNftByMetadataInput): Task<Sft | SftWithToken | Nft | NftWithToken, []>;
    /** {@inheritDoc findNftByTokenOperation} */
    findByToken(input: FindNftByTokenInput): Task<SftWithToken | NftWithToken, []>;
    /** {@inheritDoc findNftsByCreatorOperation} */
    findAllByCreator(input: FindNftsByCreatorInput): Task<import("./operations").FindNftsByCreatorOutput, []>;
    /** {@inheritDoc findNftsByMintListOperation} */
    findAllByMintList(input: FindNftsByMintListInput): Task<import("./operations").FindNftsByMintListOutput, []>;
    /** {@inheritDoc findNftsByOwnerOperation} */
    findAllByOwner(input: FindNftsByOwnerInput): Task<import("./operations").FindNftsByOwnerOutput, []>;
    /** {@inheritDoc findNftsByUpdateAuthorityOperation} */
    findAllByUpdateAuthority(input: FindNftsByUpdateAuthorityInput): Task<import("./operations").FindNftsByUpdateAuthorityOutput, []>;
    /** {@inheritDoc loadMetadataOperation} */
    load(input: LoadMetadataInput): Task<Sft | SftWithToken | Nft | NftWithToken, []>;
    /**
     * Helper method that refetches a given model
     * and returns an instance of the same type.
     */
    refresh<T extends Nft | Sft | NftWithToken | SftWithToken | Metadata | PublicKey>(model: T, input?: Omit<FindNftByMintInput, 'mintAddress' | 'tokenAddres' | 'tokenOwner'>): Task<T extends Metadata | PublicKey ? Nft | Sft : T>;
    /** {@inheritDoc createNftOperation} */
    create(input: CreateNftInput): Task<import("./operations").CreateNftOutput, []>;
    /** {@inheritDoc createSftOperation} */
    createSft(input: CreateSftInput): Task<import("./operations").CreateSftOutput, []>;
    /** {@inheritDoc printNewEditionOperation} */
    printNewEdition(input: PrintNewEditionInput): Task<import("./operations").PrintNewEditionOutput, []>;
    /** {@inheritDoc uploadMetadataOperation} */
    uploadMetadata(input: UploadMetadataInput): Task<import("./operations").UploadMetadataOutput, []>;
    /** {@inheritDoc updateNftOperation} */
    update(input: UpdateNftInput): Task<import("./operations").UpdateNftOutput, []>;
    /** {@inheritDoc deleteNftOperation} */
    delete(input: DeleteNftInput): Task<import("./operations").DeleteNftOutput, []>;
    /** {@inheritDoc useNftOperation} */
    use(input: UseNftInput): Task<import("./operations").UseNftOutput, []>;
    /** {@inheritDoc approveNftUseAuthorityOperation} */
    approveUseAuthority(input: ApproveNftUseAuthorityInput): Task<import("./operations").ApproveNftUseAuthorityOutput, []>;
    /** {@inheritDoc revokeNftUseAuthorityOperation} */
    revokeUseAuthority(input: RevokeNftUseAuthorityInput): Task<import("./operations").RevokeNftUseAuthorityOutput, []>;
    /** {@inheritDoc verifyNftCreatorOperation} */
    verifyCreator(input: VerifyNftCreatorInput): Task<import("./operations").VerifyNftCreatorOutput, []>;
    /** {@inheritDoc unverifyNftCreatorOperation} */
    unverifyCreator(input: UnverifyNftCreatorInput): Task<import("./operations").UnverifyNftCreatorOutput, []>;
    /** {@inheritDoc verifyNftCollectionOperation} */
    verifyCollection(input: VerifyNftCollectionInput): Task<import("./operations").VerifyNftCollectionOutput, []>;
    /** {@inheritDoc unverifyNftCollectionOperation} */
    unverifyCollection(input: UnverifyNftCollectionInput): Task<import("./operations").UnverifyNftCollectionOutput, []>;
    /** {@inheritDoc approveNftCollectionAuthorityOperation} */
    approveCollectionAuthority(input: ApproveNftCollectionAuthorityInput): Task<import("./operations").ApproveNftCollectionAuthorityOutput, []>;
    /** {@inheritDoc revokeNftCollectionAuthorityOperation} */
    revokeCollectionAuthority(input: RevokeNftCollectionAuthorityInput): Task<import("./operations").RevokeNftCollectionAuthorityOutput, []>;
    /** {@inheritDoc migrateToSizedCollectionNftOperation} */
    migrateToSizedCollection(input: MigrateToSizedCollectionNftInput): Task<import("./operations").MigrateToSizedCollectionNftOutput, []>;
    /** {@inheritDoc freezeDelegatedNftOperation} */
    freezeDelegatedNft(input: FreezeDelegatedNftInput): Task<import("./operations").FreezeDelegatedNftOutput, []>;
    /** {@inheritDoc thawDelegatedNftOperation} */
    thawDelegatedNft(input: ThawDelegatedNftInput): Task<import("./operations").ThawDelegatedNftOutput, []>;
    /** {@inheritDoc sendTokensOperation} */
    send(input: PartialKeys<SendTokensInput, 'amount'>): Task<import("../tokenModule").SendTokensOutput, []>;
}
