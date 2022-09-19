'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');
var program = require('./program.cjs');
var Pda = require('../../types/Pda.cjs');
var BigNumber = require('../../types/BigNumber.cjs');

/** @group Pdas */

const findMetadataPda = (mint, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer()]);
};
/** @group Pdas */

const findMasterEditionV2Pda = (mint, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), buffer.Buffer.from('edition', 'utf8')]);
};
/** @group Pdas */

const findEditionPda = (mint, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), buffer.Buffer.from('edition', 'utf8')]);
};
/** @group Pdas */

const findEditionMarkerPda = (mint, edition, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), buffer.Buffer.from('edition', 'utf8'), buffer.Buffer.from(edition.div(BigNumber.toBigNumber(248)).toString())]);
};
/** @group Pdas */

const findCollectionAuthorityRecordPda = (mint, collectionAuthority, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), buffer.Buffer.from('collection_authority', 'utf8'), collectionAuthority.toBuffer()]);
};
/** @group Pdas */

const findUseAuthorityRecordPda = (mint, useAuthority, programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), buffer.Buffer.from('user', 'utf8'), useAuthority.toBuffer()]);
};
/** @group Pdas */

const findProgramAsBurnerPda = (programId = program.TokenMetadataProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('metadata', 'utf8'), programId.toBuffer(), buffer.Buffer.from('burn', 'utf8')]);
};

exports.findCollectionAuthorityRecordPda = findCollectionAuthorityRecordPda;
exports.findEditionMarkerPda = findEditionMarkerPda;
exports.findEditionPda = findEditionPda;
exports.findMasterEditionV2Pda = findMasterEditionV2Pda;
exports.findMetadataPda = findMetadataPda;
exports.findProgramAsBurnerPda = findProgramAsBurnerPda;
exports.findUseAuthorityRecordPda = findUseAuthorityRecordPda;
//# sourceMappingURL=pdas.cjs.map
