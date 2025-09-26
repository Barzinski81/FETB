async function retryPromise(promiseFunc, retries = 3) {
  let failedAttempts = 0;

  while (failedAttempts < retries) {
    try {
      const result = await promiseFunc();
      return result;
    } catch (error) {
      failedAttempts++;
      if (failedAttempts === retries) {
        throw error;
      }
    }
  }
}

function randomPromise() {
  const randomNumber = Math.random();
  return new Promise((resolve, reject) => {
    if (randomNumber >= 0.75) {
      resolve("Success!");
    } else {
      reject("Failure!");
    }
  });
}

function startRetry() {
  retryPromise(randomPromise)
    .then(result => console.log(`Result: ${result}`))
    .catch(error => console.error(`Error: ${error}`));
}

startRetry();
