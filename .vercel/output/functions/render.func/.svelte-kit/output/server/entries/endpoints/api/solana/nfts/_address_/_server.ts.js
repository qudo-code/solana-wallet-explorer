import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Connection } from "@solana/web3.js";
const connect = () => new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);
const getNfts = async (address) => {
  const connection = connect();
  const nftsmetadata = await Metadata.findDataByOwner(connection, address);
  console.log({ address });
  return nftsmetadata;
};
async function GET({ params, locals, request }) {
  const nfts = await getNfts(params.address);
  return new Response(JSON.stringify({
    data: nfts || []
  }));
}
export {
  GET
};
