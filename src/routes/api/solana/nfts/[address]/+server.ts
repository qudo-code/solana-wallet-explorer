import type { RequestEvent } from "@sveltejs/kit";
import getNfts from "src/util/solana/get-nfts"

export async function GET({ params, locals, request }: RequestEvent) {
    const nfts = await getNfts(params.address);
   
    return new Response(JSON.stringify({
        data: nfts || []
    }))
}