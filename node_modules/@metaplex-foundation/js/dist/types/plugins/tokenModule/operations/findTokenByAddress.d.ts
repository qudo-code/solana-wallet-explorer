import { Operation, OperationHandler } from '../../../types';
import type { Commitment, PublicKey } from '@solana/web3.js';
import { Token } from '../models/Token';
declare const Key: "FindTokenByAddressOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const findTokenByAddressOperation: import("../../../types").OperationConstructor<FindTokenByAddressOperation, "FindTokenByAddressOperation", FindTokenByAddressInput, Token>;
/**
 * @group Operations
 * @category Types
 */
export declare type FindTokenByAddressOperation = Operation<typeof Key, FindTokenByAddressInput, Token>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type FindTokenByAddressInput = {
    address: PublicKey;
    commitment?: Commitment;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const findTokenByAddressOperationHandler: OperationHandler<FindTokenByAddressOperation>;
export {};
