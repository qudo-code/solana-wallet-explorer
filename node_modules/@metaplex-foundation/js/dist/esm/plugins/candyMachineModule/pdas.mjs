import { Buffer } from 'buffer';
import { CandyMachineProgram } from './program.mjs';
import { Pda } from '../../types/Pda.mjs';

/** @group Pdas */

const findCandyMachineCreatorPda = (candyMachine, programId = CandyMachineProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('candy_machine', 'utf8'), candyMachine.toBuffer()]);
};
/** @group Pdas */

const findCandyMachineCollectionPda = (candyMachine, programId = CandyMachineProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('collection', 'utf8'), candyMachine.toBuffer()]);
};

export { findCandyMachineCollectionPda, findCandyMachineCreatorPda };
//# sourceMappingURL=pdas.mjs.map
