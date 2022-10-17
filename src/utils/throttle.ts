let throttleTimer: boolean;
type Throttle = (callback: () => void, time: number) => void;

export const throttle: Throttle = (callback, time) => {
  if (throttleTimer) return;
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};
