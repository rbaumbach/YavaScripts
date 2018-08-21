module.exports.alf = {
  name: 'Gordon Shumway',
  'home-planet': 'Melmac',
  'fur-color': 'Brown',
  likes: ['cats', 'jokes', 'mischief'],
  eatCat: function(isAbleToCatchCat = isAbleToCatchCat(), timeOutter = setTimeout) {
    return new Promise(function(resolve, reject) {
      timeOutter(function () {
        if (isAbleToCatchCat) {
          resolve('Cat was eaten');
        } else {
          reject('Cat got away');
        }
      }, 1000);
    });
  }
}

function isAbleToCatchCat() {
  // returns either a 0 or 1

  return Math.floor(Math.random() * 2)
}
