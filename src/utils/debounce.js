export function debounce(callback, delay = 500) {
  let timerId;

  const debouncedFunction = (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timerId);
  };

  return debouncedFunction;
}