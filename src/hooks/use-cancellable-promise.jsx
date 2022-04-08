import { useEffect, useRef } from "react";
import { makeCancellable } from "../util/common";

const useCancellablePromise = () => {
  const promises = useRef();

  useEffect(() => {
    promises.current = promises.current || [];

    return () => {
      promises.current.forEach((promise) => promise.cancel());
      promises.current = [];
    };
  });

  const cancellablePromise = (promise) => {
    const cancellablePromise = makeCancellable(promise);
    promises.current.push(cancellablePromise);
    return cancellablePromise.promise;
  };

  return { cancellablePromise };
};

export { useCancellablePromise };
