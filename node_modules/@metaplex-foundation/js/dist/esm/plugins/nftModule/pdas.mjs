import { Buffer } from 'buffer';
import { TokenMetadataProgram } from './program.mjs';
import { Pda } from '../../types/Pda.mjs';
import { toBigNumber } from '../../types/BigNumber.mjs';

/** @group Pdas */

const findMetadataPda = (mint, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer()]);
};
/** @group Pdas */

const findMasterEditionV2Pda = (mint, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), Buffer.from('edition', 'utf8')]);
};
/** @group Pdas */

const findEditionPda = (mint, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), Buffer.from('edition', 'utf8')]);
};
/** @group Pdas */

const findEditionMarkerPda = (mint, edition, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), Buffer.from('edition', 'utf8'), Buffer.from(edition.div(toBigNumber(248)).toString())]);
};
/** @group Pdas */

const findCollectionAuthorityRecordPda = (mint, collectionAuthority, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), Buffer.from('collection_authority', 'utf8'), collectionAuthority.toBuffer()]);
};
/** @group Pdas */

const findUseAuthorityRecordPda = (mint, useAuthority, programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), mint.toBuffer(), Buffer.from('user', 'utf8'), useAuthority.toBuffer()]);
};
/** @group Pdas */

const findProgramAsBurnerPda = (programId = TokenMetadataProgram.publicKey) => {
  return Pda.find(programId, [Buffer.from('metadata', 'utf8'), programId.toBuffer(), Buffer.from('burn', 'utf8')]);
};

export { findCollectionAuthorityRecordPda, findEditionMarkerPda, findEditionPda, findMasterEditionV2Pda, findMetadataPda, findProgramAsBurnerPda, findUseAuthorityRecordPda };
//# sourceMappingURL=pdas.mjs.map
