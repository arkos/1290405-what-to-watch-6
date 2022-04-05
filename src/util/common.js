import dayjs from "dayjs";

export const formatDate = (date, template) => {
  return dayjs(date).format(template);
};

export const makeCancellable = (promise) => {
  let isCancelled = false;

  const wrappedPromise = new Promise(async () => {
    try {
      const value = await promise;

      if (isCancelled) {
        throw new Error({ isCancelled });
      }

      return value;
    } catch (error) {
      if (isCancelled) {
        throw new Error({ isCancelled });
      }

      throw new Error(error);
    }
  });

  return {
    promise: wrappedPromise,
    cancel: () => {
      isCancelled = true;
    },
  };
};
