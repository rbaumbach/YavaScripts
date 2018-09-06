const alf = require('../src/alf.js').alf
const axios = require('axios')

console.log(alf.name);

alf.getTodoList(axios)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
