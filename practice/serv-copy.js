const express = require('express');
const app = express();
const request = require('request');


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.use(express.static('project'));

const port = 2000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});


let dataArray = [];

app.post('/add', addEntry )

function addEntry (req, res){
  let newEntry = {
    city: req.body.uCity,
    feelings: req.body.uInput
  }
  let newCity = req.body.uCity;
  let dataEntry = cityLoc(newCity, (error, data) => {

    console.log(error + 'error')

    let tempToday = data.temp;
    let latestPost = {
      date: getDate(),
      temp: tempToday,
      thoughts: req.body.uInput
    }

    console.log(latestPost);
    dataArray.unshift(latestPost);
    res.send(latestPost);
    console.log(dataArray);

  })

}

const url = 'https://api.openweathermap.org/data/2.5/weather?q=london&appid=c9a71553491ecc658b5c6ebf80f4ab5a';
const cityLoc = (city, callback) => {
const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city) +  '&appid=c9a71553491ecc658b5c6ebf80f4ab5a';

  request({url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (response.body.cod == "404") {
      callback('Ups your city wasn\'t found, please try again!', undefined)
    } else {
      callback(undefined, {
        date: response.body.weather[0].description,
        temp:  response.body.main.temp,
        user: response.body.main.humidity
      })
    }
  })
}

function getDate() {
  let d = new Date();
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
  return newDate
}
