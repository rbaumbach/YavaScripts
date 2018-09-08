module.exports.oldSchoolTimer = (completionHandler) => {
  setTimeout(() => {
    console.log('Timer 1 fired');

    setTimeout(() => {
      console.log('Timer 2 fired');

      setTimeout(() => {
        console.log('Timer 3 fired');

        completionHandler();
      }, 3000);
    }, 2000);
  }, 1000);
};

// timer wrapper

const timerPromise = (time) => {
  return new Promise(((resolve) => {
    setTimeout(resolve, time);
  }));
};

module.exports.midSchoolTimer = () => {
  return timerPromise(1000).then(() => {
    console.log('Promise timer 1 fired');

    return timerPromise(2000);
  }).then(() => {
    console.log('Promise timer 2 fired');

    return timerPromise(3000);
  }).then(() => {
    console.log('Promise timer 3 fired');
  });
};

module.exports.newSchoolTimer = async () => {
  await timerPromise(1000);
  console.log('Async/await timer 1 fired');

  await timerPromise(2000);
  console.log('Async/await timer 2 fired');

  await timerPromise(3000);
  console.log('Async/await timer 3 fired');
};
