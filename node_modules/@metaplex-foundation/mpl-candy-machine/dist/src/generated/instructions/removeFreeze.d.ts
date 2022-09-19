import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare const removeFreezeStruct: beet.BeetArgsStruct<{
    instructionDiscriminator: number[];
}>;
export declare type RemoveFreezeInstructionAccounts = {
    candyMachine: web3.PublicKey;
    authority: web3.PublicKey;
    freezePda: web3.PublicKey;
};
export declare const removeFreezeInstructionDiscriminator: number[];
export declare function createRemoveFreezeInstruction(accounts: RemoveFreezeInstructionAccounts, programId?: web3.PublicKey): web3.TransactionInstruction;
