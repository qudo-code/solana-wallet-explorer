import type { Metaplex } from '../../Metaplex';
import { ApproveTokenDelegateAuthorityInput, CreateMintInput, CreateTokenInput, CreateTokenWithMintInput, FindMintByAddressInput, FindTokenByAddressInput, FindTokenWithMintByAddressInput, FindTokenWithMintByMintInput, FreezeTokensInput, MintTokensInput, RevokeTokenDelegateAuthorityInput, SendTokensInput, ThawTokensInput } from './operations';
import { TokenBuildersClient } from './TokenBuildersClient';
/**
 * This is a client for the Token module.
 *
 * It enables us to interact with the SPL Token program in order to
 * create, send, freeze, thaw, and mint tokens.
 *
 * You may access this client via the `tokens()` method of your `Metaplex` instance.
 *
 * ```ts
 * const tokenClient = metaplex.tokens();
 * ```
 *
 * @example
 * You can create a new mint account with an associated token account like so.
 * The owner of this token account will, by default, be the current identity
 * of the metaplex instance.
 *
 * ```ts
 * const { token } = await metaplex.tokens().createTokenWithMint();
 * ```
 *
 * @group Modules
 */
export declare class TokenClient {
    protected readonly metaplex: Metaplex;
    constructor(metaplex: Metaplex);
    /**
     * You may use the `builders()` client to access the
     * underlying Transaction Builders of this module.
     */
    builders(): TokenBuildersClient;
    /** {@inheritDoc findMintByAddressOperation} */
    findMintByAddress(input: FindMintByAddressInput): import("../..").Task<import("./models").Mint, []>;
    /** {@inheritDoc findTokenByAddressOperation} */
    findTokenByAddress(input: FindTokenByAddressInput): import("../..").Task<import("./models").Token, []>;
    /** {@inheritDoc findTokenWithMintByAddressOperation} */
    findTokenWithMintByAddress(input: FindTokenWithMintByAddressInput): import("../..").Task<import("./models").TokenWithMint, []>;
    /** {@inheritDoc findTokenWithMintByMintOperation} */
    findTokenWithMintByMint(input: FindTokenWithMintByMintInput): import("../..").Task<import("./models").TokenWithMint, []>;
    /** {@inheritDoc createMintOperation} */
    createMint(input?: CreateMintInput): import("../..").Task<import("./operations").CreateMintOutput, []>;
    /**
     * Create a new Token account from the provided input
     * and returns the newly created `Token` model.
     */
    /** {@inheritDoc createTokenOperation} */
    createToken(input: CreateTokenInput): import("../..").Task<import("./operations").CreateTokenOutput, []>;
    /** {@inheritDoc createTokenWithMintOperation} */
    createTokenWithMint(input?: CreateTokenWithMintInput): import("../..").Task<import("./operations").CreateTokenWithMintOutput, []>;
    /** {@inheritDoc mintTokensOperation} */
    mint(input: MintTokensInput): import("../..").Task<import("./operations").MintTokensOutput, []>;
    /** {@inheritDoc sendTokensOperation} */
    send(input: SendTokensInput): import("../..").Task<import("./operations").SendTokensOutput, []>;
    /** {@inheritDoc freezeTokensOperation} */
    freeze(input: FreezeTokensInput): import("../..").Task<import("./operations").FreezeTokensOutput, []>;
    /** {@inheritDoc thawTokensOperation} */
    thaw(input: ThawTokensInput): import("../..").Task<import("./operations").ThawTokensOutput, []>;
    /** {@inheritDoc approveTokenDelegateAuthorityOperation} */
    approveDelegateAuthority(input: ApproveTokenDelegateAuthorityInput): import("../..").Task<import("./operations").ApproveTokenDelegateAuthorityOutput, []>;
    /** {@inheritDoc revokeTokenDelegateAuthorityOperation} */
    revokeDelegateAuthority(input: RevokeTokenDelegateAuthorityInput): import("../..").Task<import("./operations").RevokeTokenDelegateAuthorityOutput, []>;
}
