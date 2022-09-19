import { BigNumber } from '../../../types';
import { Option } from '../../../utils';
import { PublicKey } from '@solana/web3.js';
import { OriginalEditionAccount, OriginalOrPrintEditionAccount, PrintEditionAccount } from '../accounts';
/** @group Models */
export declare type NftEdition = NftOriginalEdition | NftPrintEdition;
/** @group Model Helpers */
export declare const isNftEdition: (value: any) => value is NftEdition;
/** @group Model Helpers */
export declare function assertNftEdition(value: any): asserts value is NftEdition;
/** @group Model Helpers */
export declare const toNftEdition: (account: OriginalOrPrintEditionAccount) => NftEdition;
/** @group Models */
export declare type NftOriginalEdition = {
    readonly model: 'nftEdition';
    readonly isOriginal: true;
    readonly address: PublicKey;
    readonly supply: BigNumber;
    readonly maxSupply: Option<BigNumber>;
};
/** @group Model Helpers */
export declare const isNftOriginalEdition: (value: any) => value is NftOriginalEdition;
/** @group Model Helpers */
export declare function assertNftOriginalEdition(value: any): asserts value is NftOriginalEdition;
/** @group Model Helpers */
export declare const toNftOriginalEdition: (account: OriginalEditionAccount) => NftOriginalEdition;
/** @group Models */
export declare type NftPrintEdition = {
    readonly model: 'nftEdition';
    readonly isOriginal: false;
    readonly address: PublicKey;
    readonly parent: PublicKey;
    readonly number: BigNumber;
};
/** @group Model Helpers */
export declare const isNftPrintEdition: (value: any) => value is NftPrintEdition;
/** @group Model Helpers */
export declare function assertNftPrintEdition(value: any): asserts value is NftPrintEdition;
/** @group Model Helpers */
export declare const toNftPrintEdition: (account: PrintEditionAccount) => NftPrintEdition;
