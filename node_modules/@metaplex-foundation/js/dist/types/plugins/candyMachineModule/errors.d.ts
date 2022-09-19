import { MetaplexError, MetaplexErrorInputWithoutSource, MetaplexErrorOptions } from '../../errors';
import { CandyMachineItem, CandyMachineEndSettings } from './models';
import { BigNumber, DateTime } from '../../types';
import { Option } from '../../utils';
/** @group Errors */
export declare class CandyMachineError extends MetaplexError {
    constructor(input: MetaplexErrorInputWithoutSource);
}
/** @group Errors */
export declare class CandyMachineIsFullError extends CandyMachineError {
    constructor(assetIndex: BigNumber, itemsAvailable: BigNumber, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineIsEmptyError extends CandyMachineError {
    constructor(itemsAvailable: BigNumber, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineCannotAddAmountError extends CandyMachineError {
    constructor(index: BigNumber, amount: number, itemsAvailable: BigNumber, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineAddItemConstraintsViolatedError extends CandyMachineError {
    constructor(index: BigNumber, item: CandyMachineItem, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineNotLiveError extends CandyMachineError {
    constructor(goLiveDate: Option<DateTime>, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineEndedError extends CandyMachineError {
    constructor(endSetting: CandyMachineEndSettings, options?: MetaplexErrorOptions);
}
/** @group Errors */
export declare class CandyMachineBotTaxError extends CandyMachineError {
    constructor(explorerLink: string, cause: Error, options?: Omit<MetaplexErrorOptions, 'cause'>);
}
