import type { Metaplex } from '../../Metaplex';
import { ApproveTokenDelegateAuthorityBuilderParams, CreateMintBuilderParams, CreateTokenBuilderParams, CreateTokenIfMissingBuilderParams, CreateTokenWithMintBuilderParams, FreezeTokensBuilderParams, MintTokensBuilderParams, RevokeTokenDelegateAuthorityBuilderParams, SendTokensBuilderParams, ThawTokensBuilderParams } from './operations';
/**
 * This client allows you to access the underlying Transaction Builders
 * for the write operations of the Token module.
 *
 * @see {@link TokenClient}
 * @group Module Builders
 * */
export declare class TokenBuildersClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /** {@inheritDoc createMintBuilder} */
    createMint(input: CreateMintBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateMintBuilderContext>>;
    /** {@inheritDoc createTokenBuilder} */
    createToken(input: CreateTokenBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateTokenBuilderContext>>;
    /** {@inheritDoc createTokenIfMissingBuilder} */
    createTokenIfMissing(input: CreateTokenIfMissingBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateTokenBuilderContext>>;
    /** {@inheritDoc createTokenWithMintBuilder} */
    createTokenWithMint(input: CreateTokenWithMintBuilderParams): Promise<import("../..").TransactionBuilder<import("./operations").CreateTokenWithMintBuilderContext>>;
    /** {@inheritDoc mintTokensBuilder} */
    mint(input: MintTokensBuilderParams): Promise<import("../..").TransactionBuilder<object>>;
    /** {@inheritDoc sendTokensBuilder} */
    send(input: SendTokensBuilderParams): Promise<import("../..").TransactionBuilder<object>>;
    /** {@inheritDoc freezeTokensBuilder} */
    freeze(input: FreezeTokensBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc thawTokensBuilder} */
    thaw(input: ThawTokensBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc approveTokenDelegateAuthorityBuilder} */
    approveDelegateAuthority(input: ApproveTokenDelegateAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
    /** {@inheritDoc revokeTokenDelegateAuthorityBuilder} */
    revokeDelegateAuthority(input: RevokeTokenDelegateAuthorityBuilderParams): import("../..").TransactionBuilder<object>;
}
