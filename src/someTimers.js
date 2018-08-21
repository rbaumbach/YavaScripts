module.exports.oldSchoolTimer = function(completionHandler) {
  setTimeout(function() {
    console.log('Timer 1 fired')

    setTimeout(function() {
      console.log('Timer 2 fired')

      setTimeout(function() {
        console.log('Timer 3 fired')

        completionHandler()
      }, 3000);
    }, 2000);
  }, 1000);
}

module.exports.midSchoolTimer = function() {
  return timerPromise(1000).then(function() {
    console.log('Promise timer 1 fired')

    return timerPromise(2000)
  }).then(function() {
    console.log('Promise timer 2 fired')

    return timerPromise(3000)
  }).then(function() {
    console.log('Promise timer 3 fired')
  });
}

module.exports.newSchoolTimer = async function() {
  let timer1 = await timerPromise(1000)
  console.log('Async/await timer 1 fired')

  let timer2 = await timerPromise(2000)
  console.log('Async/await timer 2 fired')

  let timer3 = await timerPromise(3000)
  console.log('Async/await timer 3 fired')
}

// timer wrapper

const timerPromise = function(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}
