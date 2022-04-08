import dayjs from "dayjs";

export const formatDate = (date, template) => {
  return dayjs(date).format(template);
};

// export const makeCancellable = (promise) => {
//   let isCancelled = false;

//   const wrappedPromise = new Promise(async () => {
//     try {
//       const value = await promise;

//       if (isCancelled) {
//         throw new Error({ isCancelled });
//       }

//       return value;
//     } catch (err) {
//       if (isCancelled) {
//         throw new Error({ isCancelled });
//       }

//       throw new Error(err);
//     }
//   });

//   return {
//     promise: wrappedPromise,
//     cancel: () => {
//       isCancelled = true;
//     },
//   };
// };

export function makeCancelable(promise) {
  let isCanceled = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    // Suppress resolution and rejection if canceled
    promise
      // .then((val) => !isCanceled && resolve(val))
      // .catch((error) => !isCanceled && reject(error));
      .then((val) => {
        if (isCanceled) {
          console.log(`Promise already cancelled (succeeded): `, promise);
        } else {
          resolve(val);
        }
      })
      .catch((err) => {
        if (isCanceled) {
          console.log(`Promise already cancelled (error): `, promise);
          reject(err);
        }
      });
  });
  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
}
