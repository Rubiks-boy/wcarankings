export const currTime = () => new Date().getTime();

export const callFuncOnce = (func: () => void) => {
  let hasUsedCb = false;
  return () => {
    if (hasUsedCb) {
      return;
    }
    hasUsedCb = true;
    func();
  };
};
