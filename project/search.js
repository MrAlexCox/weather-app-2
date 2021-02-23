
const gen = document.getElementById('generate');
const uCity = document.getElementById('userCity');
const uInput = document.getElementById('feelings');

gen.addEventListener('click', function (event){
  event.preventDefault();
  console.log('click');
  getValue();
});

const postData =  async (url = '', data = {})=>{
  console.log(data);
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch(error){
    console.log("error", error);
  }
}

// postData('/add', {answer:42});

function getValue(){
  let uCity = document.getElementById('userCity').value;
  let uInput = document.getElementById('feelings').value;
  postData('/add', {uCity, uInput })
  .then((object) => {
    updateUI(object)
  )}
};

function updateUI(){
  const latestEntry = new Object()
}
