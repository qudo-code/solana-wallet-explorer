import { Metadata, Edition, Key, MasterEditionV1, MasterEditionV2 } from '@metaplex-foundation/mpl-token-metadata';
import { getAccountParsingFunction, getAccountParsingAndAssertingFunction } from '../../types/Account.mjs';

/** @group Accounts */

/** @group Account Helpers */
const parseMetadataAccount = getAccountParsingFunction(Metadata);
/** @group Account Helpers */

const toMetadataAccount = getAccountParsingAndAssertingFunction(Metadata);
/** @group Accounts */

const originalOrPrintEditionAccountParser = {
  name: 'MasterEditionV1 | MasterEditionV2 | Edition',
  deserialize: (data, offset = 0) => {
    if ((data === null || data === void 0 ? void 0 : data[0]) === Key.MasterEditionV1) {
      return MasterEditionV1.deserialize(data, offset);
    } else if ((data === null || data === void 0 ? void 0 : data[0]) === Key.MasterEditionV2) {
      return MasterEditionV2.deserialize(data, offset);
    } else {
      return Edition.deserialize(data, offset);
    }
  }
};
/** @group Account Helpers */

const parseOriginalOrPrintEditionAccount = getAccountParsingFunction(originalOrPrintEditionAccountParser);
/** @group Account Helpers */

const toOriginalOrPrintEditionAccount = getAccountParsingAndAssertingFunction(originalOrPrintEditionAccountParser);
/** @group Account Helpers */

const isOriginalEditionAccount = account => {
  return 'maxSupply' in account.data;
};
/** @group Account Helpers */

const isPrintEditionAccount = account => {
  return !isOriginalEditionAccount(account);
};
/** @group Accounts */

const originalEditionAccountParser = {
  name: 'MasterEditionV1 | MasterEditionV2',
  deserialize: (data, offset = 0) => {
    if ((data === null || data === void 0 ? void 0 : data[0]) === Key.MasterEditionV1) {
      return MasterEditionV1.deserialize(data, offset);
    } else {
      return MasterEditionV2.deserialize(data, offset);
    }
  }
};
/** @group Account Helpers */

const parseOriginalEditionAccount = getAccountParsingFunction(originalEditionAccountParser);
/** @group Account Helpers */

const toOriginalEditionAccount = getAccountParsingAndAssertingFunction(originalEditionAccountParser);
/** @group Accounts */

/** @group Account Helpers */
const parsePrintEditionAccount = getAccountParsingFunction(Edition);
/** @group Account Helpers */

const toPrintEditionAccount = getAccountParsingAndAssertingFunction(Edition);

export { isOriginalEditionAccount, isPrintEditionAccount, parseMetadataAccount, parseOriginalEditionAccount, parseOriginalOrPrintEditionAccount, parsePrintEditionAccount, toMetadataAccount, toOriginalEditionAccount, toOriginalOrPrintEditionAccount, toPrintEditionAccount };
//# sourceMappingURL=accounts.mjs.map
