<main class="container">
    <div class="row flex-center">
        <div class="col-12 col-lg-6 display-flex flex-column align-items-center">
            <div>
                <img src="sol.png" height="100" /> 
            </div>   
            <h2 class="text-center">Wallet Explorer</h2>
        </div>
    </div>
    {#if nfts.length}
        <div class="row">
            {#each nfts as nft}
                <div class="col-6 col-lg-4">
                    <NFT {nft} />
                </div>
            {/each}
        </div>
    {/if}
    <div class="row">
        <div class="col-12 col-lg-6">
            <input class="input mb-3" type="text" placeholder="Wallet" bind:value={address}>
            <button class="button button-green w-100 flex-center mb-2" on:click={load}>
                {#if isLoading}
                <Loader />
                {:else}
                Go
                {/if}
            </button>
            <i class="text-gold">{error}</i>
        </div>
    </div>
</main>

<script lang="ts">
    import { PublicKey } from "@solana/web3.js";

    import Loader from "src/components/loader.svelte";
    import NFT from "src/components/nft.svelte";

    let address = "";
    let error = "";
    let isLoading = false;

    let nfts = [];

    const load = async () => {
        error = "";
        isLoading = true;
        nfts = [];

        try {
            new PublicKey(address);
        } catch (err) {
            error = "Invalid address";

            isLoading = false;

            return;
        }

        try {
            const response = await fetch(`/api/solana/nfts/${address}`);

            const { data } = await response.json();

            nfts = data;
        } catch (err) {
            console.log(err);

            error = "Failed to load NFTs";
        }

        isLoading = false;
    }

    $: console.log("NFTs", {
        nfts,
    })
</script>