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

export { useOperation };
//# sourceMappingURL=Operation.mjs.map
