import { CandyMachine, CollectionPDA } from '@metaplex-foundation/mpl-candy-machine';
import { Account, MaybeAccount } from '../../types';
/** @group Accounts */
export declare type CandyMachineAccount = Account<CandyMachine>;
/** @group Account Helpers */
export declare const parseCandyMachineAccount: import("../../types").AccountParsingFunction<CandyMachine>;
/** @group Account Helpers */
export declare const toCandyMachineAccount: import("../../types").AccountParsingAndAssertingFunction<CandyMachine>;
/** @group Accounts */
export declare type CandyMachineCollectionAccount = Account<CollectionPDA>;
/** @group Accounts */
export declare type MaybeCandyMachineCollectionAccount = MaybeAccount<CollectionPDA>;
/** @group Account Helpers */
export declare const parseCandyMachineCollectionAccount: import("../../types").AccountParsingFunction<CollectionPDA>;
/** @group Account Helpers */
export declare const toCandyMachineCollectionAccount: import("../../types").AccountParsingAndAssertingFunction<CollectionPDA>;
