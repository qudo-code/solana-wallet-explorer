'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @group Operations
 * @category Constructors
 */
const useOperation = key => {
  const constructor = input => {
    return {
      key,
      input
    };
  };

  constructor.key = key;
  return constructor;
};

exports.useOperation = useOperation;
//# sourceMappingURL=Operation.cjs.map
