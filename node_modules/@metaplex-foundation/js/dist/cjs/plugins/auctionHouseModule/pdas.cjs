'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var buffer = require('buffer');
var program = require('./program.cjs');
var Pda = require('../../types/Pda.cjs');

/** @group Pdas */

const findAuctionHousePda = (creator, treasuryMint, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), creator.toBuffer(), treasuryMint.toBuffer()]);
};
/** @group Pdas */

const findAuctioneerPda = (auctionHouse, auctioneerAuthority, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auctioneer', 'utf8'), auctionHouse.toBuffer(), auctioneerAuthority.toBuffer()]);
};
/** @group Pdas */

const findAuctionHouseProgramAsSignerPda = (programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), buffer.Buffer.from('signer', 'utf8')]);
};
/** @group Pdas */

const findAuctionHouseFeePda = (auctionHouse, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), buffer.Buffer.from('fee_payer', 'utf8')]);
};
/** @group Pdas */

const findAuctionHouseTreasuryPda = (auctionHouse, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), buffer.Buffer.from('treasury', 'utf8')]);
};
/** @group Pdas */

const findAuctionHouseBuyerEscrowPda = (auctionHouse, buyer, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), auctionHouse.toBuffer(), buyer.toBuffer()]);
};
/** @group Pdas */

const findAuctionHouseTradeStatePda = (auctionHouse, wallet, treasuryMint, tokenMint, buyPrice, tokenSize, tokenAccount, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('auction_house', 'utf8'), wallet.toBuffer(), auctionHouse.toBuffer(), ...(tokenAccount ? [tokenAccount.toBuffer()] : []), treasuryMint.toBuffer(), tokenMint.toBuffer(), buyPrice.toArrayLike(buffer.Buffer, 'le', 8), tokenSize.toArrayLike(buffer.Buffer, 'le', 8)]);
};
/** @group Pdas */

const findListingReceiptPda = (tradeState, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('listing_receipt', 'utf8'), tradeState.toBuffer()]);
};
/** @group Pdas */

const findBidReceiptPda = (tradeState, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('bid_receipt', 'utf8'), tradeState.toBuffer()]);
};
/** @group Pdas */

const findPurchaseReceiptPda = (sellerTradeState, buyerTradeState, programId = program.AuctionHouseProgram.publicKey) => {
  return Pda.Pda.find(programId, [buffer.Buffer.from('purchase_receipt', 'utf8'), sellerTradeState.toBuffer(), buyerTradeState.toBuffer()]);
};

exports.findAuctionHouseBuyerEscrowPda = findAuctionHouseBuyerEscrowPda;
exports.findAuctionHouseFeePda = findAuctionHouseFeePda;
exports.findAuctionHousePda = findAuctionHousePda;
exports.findAuctionHouseProgramAsSignerPda = findAuctionHouseProgramAsSignerPda;
exports.findAuctionHouseTradeStatePda = findAuctionHouseTradeStatePda;
exports.findAuctionHouseTreasuryPda = findAuctionHouseTreasuryPda;
exports.findAuctioneerPda = findAuctioneerPda;
exports.findBidReceiptPda = findBidReceiptPda;
exports.findListingReceiptPda = findListingReceiptPda;
exports.findPurchaseReceiptPda = findPurchaseReceiptPda;
//# sourceMappingURL=pdas.cjs.map
