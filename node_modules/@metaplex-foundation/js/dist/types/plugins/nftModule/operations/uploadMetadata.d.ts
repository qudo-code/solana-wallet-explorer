import { Operation, OperationHandler } from '../../../types';
import { MetaplexFile } from '../../storageModule';
import { JsonMetadata } from '../models';
declare const Key: "UploadMetadataOperation";
/**
 * @group Operations
 * @category Constructors
 */
export declare const uploadMetadataOperation: import("../../../types").OperationConstructor<UploadMetadataOperation, "UploadMetadataOperation", UploadMetadataInput, UploadMetadataOutput>;
/**
 * @group Operations
 * @category Types
 */
export declare type UploadMetadataOperation = Operation<typeof Key, UploadMetadataInput, UploadMetadataOutput>;
/**
 * @group Operations
 * @category Inputs
 */
export declare type UploadMetadataInput = JsonMetadata<MetaplexFile | string>;
/**
 * @group Operations
 * @category Outputs
 */
export declare type UploadMetadataOutput = {
    metadata: JsonMetadata;
    assetUris: string[];
    uri: string;
};
/**
 * @group Operations
 * @category Handlers
 */
export declare const uploadMetadataOperationHandler: OperationHandler<UploadMetadataOperation>;
export declare const getAssetsFromJsonMetadata: (input: UploadMetadataInput) => MetaplexFile[];
export declare const replaceAssetsWithUris: (input: UploadMetadataInput, replacements: string[]) => JsonMetadata;
export {};
