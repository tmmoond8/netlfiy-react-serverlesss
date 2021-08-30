const axios = require('axios');

exports.handler = async function(event, context) {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}