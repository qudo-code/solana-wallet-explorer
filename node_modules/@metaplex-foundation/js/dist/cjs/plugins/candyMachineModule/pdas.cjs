'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');
var program = require('./program.cjs');
var Pda = require('../../types/Pda.cjs');

/** @group Pdas */

const findCandyMachineCreatorPda = (candyMachine, programId = program.CandyMachineProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('candy_machine', 'utf8'), candyMachine.toBuffer()]);
};
/** @group Pdas */

const findCandyMachineCollectionPda = (candyMachine, programId = program.CandyMachineProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('collection', 'utf8'), candyMachine.toBuffer()]);
};

exports.findCandyMachineCollectionPda = findCandyMachineCollectionPda;
exports.findCandyMachineCreatorPda = findCandyMachineCreatorPda;
//# sourceMappingURL=pdas.cjs.map
