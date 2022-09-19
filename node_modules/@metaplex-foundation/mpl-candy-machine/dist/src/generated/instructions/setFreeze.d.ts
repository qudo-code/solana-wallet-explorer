import * as beet from '@metaplex-foundation/beet';
import * as web3 from '@solana/web3.js';
export declare type SetFreezeInstructionArgs = {
    freezeTime: beet.bignum;
};
export declare const setFreezeStruct: beet.BeetArgsStruct<SetFreezeInstructionArgs & {
    instructionDiscriminator: number[];
}>;
export declare type SetFreezeInstructionAccounts = {
    candyMachine: web3.PublicKey;
    authority: web3.PublicKey;
    freezePda: web3.PublicKey;
    systemProgram?: web3.PublicKey;
};
export declare const setFreezeInstructionDiscriminator: number[];
export declare function createSetFreezeInstruction(accounts: SetFreezeInstructionAccounts, args: SetFreezeInstructionArgs, programId?: web3.PublicKey): web3.TransactionInstruction;
