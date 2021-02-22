
const gen = document.getElementById('generate');
const uCity = document.getElementById('userCity');
const uInput = document.getElementById('feelings');

gen.addEventListener('click', function (event){
  event.preventDefault();
  getValue();
});

function getValue(){
  let uCity = document.getElementById('userCity').value;
  let uInput = document.getElementById('feelings').value;
  return uCity + uInput
};

getValue();
