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
          reject('Cat got away');
        }
      }, 1000);
    });
  },
  getTodoList: (axios) => {
    return axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((axiosResponse) => {
        return thinAxiosTodoResponse(axiosResponse);
      })
      .catch((error) => {
        return error;
      });
  }
};

function isAbleToCatchCat() {
  return Math.floor(Math.random() * 2);
}

function thinAxiosTodoResponse(axiosResponse) {
  return axiosResponse.data.map((todo) => {
    const localTodo = todo;

    localTodo.priority = 1

    delete localTodo.id;
    delete localTodo.userId;
    delete localTodo.completed;

    return localTodo;
  });
}
