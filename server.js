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

app.post('/add', addEntry );

function addEntry (req, res){
  let newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    feelings: req.body.feelings
  }

    console.log(newEntry);
    dataArray.unshift(newEntry);
    res.send(dataArray[0]);
    console.log(dataArray);

}
