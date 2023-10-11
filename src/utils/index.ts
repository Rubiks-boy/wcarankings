export const currTime = () => new Date().getTime();

export const callFuncOnce = (func: () => void) => {
  let hasUsedCb = false;
  return () => {
    console.log("func", hasUsedCb);
    if (hasUsedCb) {
      return;
    }
    hasUsedCb = true;
    func();
  };
};
