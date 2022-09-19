import type { Metaplex } from '../../Metaplex';
import { ApproveNftCollectionAuthorityBuilderParams, ApproveNftUseAuthorityBuilderParams, CreateNftBuilderParams, CreateSftBuilderParams, DeleteNftBuilderParams, FreezeDelegatedNftBuilderParams, MigrateToSizedCollectionNftBuilderParams, PrintNewEditionBuilderParams, RevokeNftCollectionAuthorityBuilderParams, RevokeNftUseAuthorityBuilderParams, ThawDelegatedNftBuilderParams, UnverifyNftCollectionBuilderParams, UnverifyNftCreatorBuilderParams, UpdateNftBuilderParams, UseNftBuilderParams, VerifyNftCollectionBuilderParams, VerifyNftCreatorBuilderParams } from './operations';
/**
 * @group Module Builders
 */
export declare class NftBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /** {@inheritDoc createNftBuilder} */
    create(input: CreateNftBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateNftBuilderContext>>;
    /** {@inheritDoc createSftBuilder} */
    createSft(input: CreateSftBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateSftBuilderContext>>;
    /** {@inheritDoc printNewEditionBuilder} */
    printNewEdition(input: PrintNewEditionBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").PrintNewEditionBuilderContext>>;
    /** {@inheritDoc updateNftBuilder} */
    update(input: UpdateNftBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc deleteNftBuilder} */
    delete(input: DeleteNftBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc useNftBuilder} */
    use(input: UseNftBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc approveNftUseAuthorityBuilder} */
    approveUseAuthority(input: ApproveNftUseAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc revokeNftUseAuthorityBuilder} */
    revokeUseAuthority(input: RevokeNftUseAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc verifyNftCreatorBuilder} */
    verifyCreator(input: VerifyNftCreatorBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc unverifyNftCreatorBuilder} */
    unverifyCreator(input: UnverifyNftCreatorBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc verifyNftCollectionBuilder} */
    verifyCollection(input: VerifyNftCollectionBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc unverifyNftCollectionBuilder} */
    unverifyCollection(input: UnverifyNftCollectionBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc approveNftCollectionAuthorityBuilder} */
    approveCollectionAuthority(input: ApproveNftCollectionAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc revokeNftCollectionAuthorityBuilder} */
    revokeCollectionAuthority(input: RevokeNftCollectionAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc migrateToSizedCollectionNftBuilder} */
    migrateToSizedCollection(input: MigrateToSizedCollectionNftBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc freezeDelegatedNftBuilder} */
    freezeDelegatedNft(input: FreezeDelegatedNftBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc thawDelegatedNftBuilder} */
    thawDelegatedNft(input: ThawDelegatedNftBuilderParams): import("../..").TransactionBuilder<object>;
}
