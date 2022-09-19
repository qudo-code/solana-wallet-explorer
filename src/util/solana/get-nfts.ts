import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

import connect from "src/util/solana/connect";

export default async (address:string) => {

    const connection = connect();

    const nftsmetadata = await Metadata.findDataByOwner(connection, address);
    
    console.log({address})
    return nftsmetadata;
}