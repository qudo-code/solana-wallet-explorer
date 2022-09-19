import { PublicKey } from '@solana/web3.js';
import { CandyMachineData, EndSettingType, WhitelistMintMode } from '@metaplex-foundation/mpl-candy-machine';
import { Amount, BigNumber, DateTime, UnparsedAccount } from '../../../types';
import { Option } from '../../../utils';
import { CandyMachineAccount, MaybeCandyMachineCollectionAccount } from '../accounts';
import { Creator } from '../../../types';
/** @group Models */
export declare type CandyMachine = {
    readonly model: 'candyMachine';
    readonly address: PublicKey;
    readonly programAddress: PublicKey;
    readonly version: 1 | 2;
    readonly authorityAddress: PublicKey;
    readonly walletAddress: PublicKey;
    readonly tokenMintAddress: Option<PublicKey>;
    readonly collectionMintAddress: Option<PublicKey>;
    readonly uuid: string;
    readonly price: Amount;
    readonly symbol: string;
    readonly sellerFeeBasisPoints: number;
    readonly isMutable: boolean;
    readonly retainAuthority: boolean;
    readonly goLiveDate: Option<DateTime>;
    readonly maxEditionSupply: BigNumber;
    readonly items: CandyMachineItem[];
    readonly itemsAvailable: BigNumber;
    readonly itemsMinted: BigNumber;
    readonly itemsRemaining: BigNumber;
    readonly itemsLoaded: BigNumber;
    readonly isFullyLoaded: boolean;
    readonly endSettings: Option<CandyMachineEndSettings>;
    readonly hiddenSettings: Option<CandyMachineHiddenSettings>;
    readonly whitelistMintSettings: Option<CandyMachineWhitelistMintSettings>;
    readonly gatekeeper: Option<CandyMachineGatekeeper>;
    readonly creators: Creator[];
};
/** @group Models */
export declare type CandyMachineItem = {
    readonly name: string;
    readonly uri: string;
};
/** @group Models */
export declare type CandyMachineEndSettings = {
    readonly endSettingType: EndSettingType.Amount;
    readonly number: BigNumber;
} | {
    readonly endSettingType: EndSettingType.Date;
    readonly date: DateTime;
};
/** @group Models */
export declare type CandyMachineHiddenSettings = {
    readonly name: string;
    readonly uri: string;
    readonly hash: number[];
};
/** @group Models */
export declare type CandyMachineWhitelistMintSettings = {
    readonly mode: WhitelistMintMode;
    readonly mint: PublicKey;
    readonly presale: boolean;
    readonly discountPrice: Option<Amount>;
};
/** @group Models */
export declare type CandyMachineGatekeeper = {
    readonly network: PublicKey;
    readonly expireOnUse: boolean;
};
/** @group Model Helpers */
export declare const isCandyMachine: (value: any) => value is CandyMachine;
/** @group Model Helpers */
export declare function assertCandyMachine(value: any): asserts value is CandyMachine;
/** @group Model Helpers */
export declare const toCandyMachine: (account: CandyMachineAccount, unparsedAccount: UnparsedAccount, collectionAccount: MaybeCandyMachineCollectionAccount | null) => CandyMachine;
/** @group Models */
export declare type CandyMachineConfigs = {
    wallet: PublicKey;
    tokenMint: Option<PublicKey>;
    price: Amount;
    sellerFeeBasisPoints: number;
    itemsAvailable: BigNumber;
    symbol: string;
    maxEditionSupply: BigNumber;
    isMutable: boolean;
    retainAuthority: boolean;
    goLiveDate: Option<DateTime>;
    endSettings: Option<CandyMachineEndSettings>;
    hiddenSettings: Option<CandyMachineHiddenSettings>;
    whitelistMintSettings: Option<CandyMachineWhitelistMintSettings>;
    gatekeeper: Option<CandyMachineGatekeeper>;
    creators: Creator[];
};
/** @group Model Helpers */
export declare const toCandyMachineConfigs: (candyMachine: CandyMachine) => CandyMachineConfigs;
/** @group Models */
export declare type CandyMachineInstructionData = {
    wallet: PublicKey;
    tokenMint: Option<PublicKey>;
    data: CandyMachineData;
};
/** @group Model Helpers */
export declare const toCandyMachineInstructionData: (address: PublicKey, configs: CandyMachineConfigs) => CandyMachineInstructionData;
