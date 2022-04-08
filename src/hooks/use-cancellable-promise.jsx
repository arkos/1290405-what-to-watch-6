import { useEffect, useRef } from "react";
import { makeCancelable } from "../util/common";

// const useCancellablePromise = () => {
//   const promises = useRef();

//   useEffect(() => {
//     promises.current = promises.current || [];

//     return () => {
//       promises.current.forEach((promise) => promise.cancel());
//       promises.current = [];
//     };
//   });

//   const cancellablePromise = (promise) => {
//     const cancellablePromise = makeCancellable(promise);
//     promises.current.push(cancellablePromise);
//     return cancellablePromise.promise;
//   };

//   return { cancellablePromise };
// };

// export { useCancellablePromise };

export function useCancellablePromise() {
  // think of useRef as member variables inside a hook
  // you cannot define promises here as an array because
  // they will get initialized at every render refresh
  const promises = useRef();
  // useEffect initializes the promises array
  // and cleans up by calling cancel on every stored
  // promise.
  // Empty array as input to useEffect ensures that the hook is
  // called once during mount and the cancel() function called
  // once during unmount
  useEffect(() => {
    promises.current = promises.current || [];
    return function cancel() {
      promises.current.forEach((p) => p.cancel());
      promises.current = [];
    };
  }, []);

  // cancelablePromise remembers the promises that you
  // have called so far. It returns a wrapped cancelable
  // promise
  function cancellablePromise(p) {
    const cPromise = makeCancelable(p);
    promises.current.push(cPromise);
    return cPromise.promise;
  }
  return { cancellablePromise };
}
