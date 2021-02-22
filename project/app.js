const request = require('request');

const url = 'api.openweathermap.org/data/2.5/weather?id={2960}&appid={c9a71553491ecc658b5c6ebf80f4ab5a
}';

request({ url: url }, (error, response) => {
  



  console.log(response)
});
