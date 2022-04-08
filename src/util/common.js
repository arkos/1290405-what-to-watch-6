import dayjs from "dayjs";

export const formatDate = (date, template) => {
  return dayjs(date).format(template);
};

export const makeCancellable = (promise) => {
  let isCancelled = false;

  const wrappedPromise = new Promise(async () => {
    try {
      const value = await promise;
      if (!isCancelled) {
        return value;
      }
    } catch (err) {
      if (!isCancelled) {
        throw new Error(err);
      }
    }
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCancelled = true;
    },
  };
};
