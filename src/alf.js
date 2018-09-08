module.exports.alf = {
  name: 'Gordon Shumway',
  'home-planet': 'Melmac',
  'fur-color': 'Brown',
  likes: ['cats', 'jokes', 'mischief'],
  eatCat: (isAbleToCatchCat = isAbleToCatchCat(), timeOutter = setTimeout) => {
    return new Promise((resolve, reject) => {
      timeOutter(() => {
        if (isAbleToCatchCat) {
          resolve('Cat was eaten');
        } else {
          reject('Cat got away'); // update to use an new Error("Cat got away")
        }
      }, 1000);
    });
  },
  getTodoList: (axios) => {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
  },
};

function isAbleToCatchCat() {
  return Math.floor(Math.random() * 2);
}
