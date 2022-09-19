<style lang="scss">
    .nft-card {
        position: relative;
        padding-bottom: 100%;
        background-size: cover;
        background-position: center;
    }

    .msg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>

<script>
    import { onMount } from "svelte";
    import Loader from "src/components/loader.svelte";

    export let nft = {
        data: {
            uri: "",
        },
        mint: ""
    };

    let metada = {
        image: "",
    };

    let failed = false;

    onMount(async () => {
        try {
            const response = await fetch(nft.data.uri);
    
            metada = await response.json();
        } catch (error) {
            failed = true;
        }
    })
</script>

<a
    class="nft-card border-radius flex-center link no-decoration"
    style="background-image: url('{metada.image}')"
    href="https://solscan.io/token/{nft.mint}"
    target="_blank"
>
    <div class="msg">
        {#if failed}
            <div class="text-micro opacity-50">
                Failed
            </div>
        {:else if !metada.image}
            <Loader />
        {/if}
    </div>
</a>