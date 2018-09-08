const axios = require('axios');
const { alf } = require('../src/alf.js');

console.log(alf.name);

alf.getTodoList(axios)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
