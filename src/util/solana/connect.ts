import { Connection } from "@solana/web3.js";

export default () => new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
);
