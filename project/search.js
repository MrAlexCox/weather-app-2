
const gen = document.getElementById('generate');
const uCity = document.getElementById('userCity');
const uInput = document.getElementById('feelings');
const webUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=c9a71553491ecc658b5c6ebf80f4ab5a&units=metric';

gen.addEventListener('click', function (event){
  event.preventDefault();
  console.log('click');
  let uCity = document.getElementById('userCity').value;
  let uInput = document.getElementById('feelings').value;
  getTemp(webUrl,uCity,apiKey)


  .then(function (uWeather) {
    console.log(uWeather)
    if (uWeather.cod == "404") {
      alert('There was an error with your spelling! Try again or try another city...');
    } else {
    let weather = uWeather.main.temp;
    console.log(weather);
    postData('/add', { date: getDate(), temp: weather, feelings: uInput });
  }
  // .then(function (newData) {
  //   updateUI()
  // })
})
});


//function to get temp from API
const getTemp = async (baseURL, city, key)=>{

    const res = await fetch(baseURL+city+key)
    try {

      const uWeather = await res.json();
      console.log(uWeather)
      return uWeather;
    }  catch(error) {
      console.log("error", error);
      alert('There was an error: ', error)

    }
    }



//function to post body to server
const postData =  async (url = '', data = {})=>{

    const response = await fetch (url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    try {
      let newData = await response.json();
      console.log(newData);
      updateUI(newData);

    } catch(error){
      console.log("error", error);

  }
}

//code to update user entry in UI
function updateUI(object) {
  console.log(object);
  document.getElementById('date').innerHTML = '<span>Today is: ' + object.date + '</span>';
  document.getElementById('temp').innerHTML = '<span>It is ' + object.temp + ' degrees outside</span>';
  document.getElementById('content').innerHTML = '<span>' + object.feelings + '</span>';

}

// function to get the date
function getDate() {
  let d = new Date();
  let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
  return newDate
}
