const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('project'));

const port = 2000;

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});




const request = require('request');

const url = 'https://api.openweathermap.org/data/2.5/weather?q=London&appid=c9a71553491ecc658b5c6ebf80f4ab5a';
// const apiKey = ;
// let zip = xyz;


// const weather = request({ url: url, json: true }, (error, response) => {
//
//   if (error) {
//     console.log('There was a problem')
//   } else if (response.body.cod == "404") {
//
//     console.log('Unable to find location....')
//   } else {
//     let x = response.body.weather[0].description;
//     let y = response.body.main.temp;
//     let z = response.body.main.humidity;
//
//   // console.log(response.body.weather[0].description);
//   // console.log(response.body.main.temp);
//   // console.log(response.body.main.humidity);
//
//   console.log(y);
//
//   return {
//     first: x,
//     second: y,
//     third: z,
//
//   }
// }});
//
// let d = weather;
// let first = d.first;
// let second = d.second;
// let third = d.third;
//
// console.log(first + second + third);

const gen = document.getElementById('generate');
const uCity = document.getElementById('userCity');
const uInput = document.getElementById('feelings');
const cityLoc = (city, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) +  '&appid=c9a71553491ecc658b5c6ebf80f4ab5a';

  request({url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (response.body.cod == "404") {
      callback('Ups your city wasn\'t found, please try again!', undefined)
    } else {
      callback(undefined, {
        description: response.body.weather[0].description,
        temp:  response.body.main.temp,
        humidity: response.body.main.humidity
      })
    }
  })
}

gen.addEventListener('click', function (event){
  event.preventDefault();
  getValue();
  cityLoc('London', (error, data) => {
    console.log(error)
    console.log(data)
  })


});





// const input = document.querySelector('userCity');
// const button = document.querySelector('generate');
//
// let
