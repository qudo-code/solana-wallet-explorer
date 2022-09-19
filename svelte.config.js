import adapter from '@sveltejs/adapter-vercel';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess : preprocess({
        styles : {
            default : "scss",
        },
    }),

    kit : {
        adapter : adapter(),

        alias : {
            src : "./src",
        },
        env : {
            publicPrefix : "MATR_",
        },
    },
};

export default config;
