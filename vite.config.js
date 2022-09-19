import { sveltekit } from "@sveltejs/kit/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
    return {
        plugins : [
            sveltekit(),
            // basicSsl(),
        ],

        build : {
            target: "es2020"
        },
        
        optimizeDeps : {
            esbuildOptions : {
                target: "es2020"
            }
        },
    };
});
