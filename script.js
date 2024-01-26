// Global Variables
const apiKey = 'c675fe167dd24bf6a0d141131242501';

// Grab elements
const city = document.getElementById('city')
const temp = document.getElementById('temp')
const condition = document.getElementById('condition')
const icon = document.getElementById('icon')
const date = document.getElementById('date')
const editCityBtn = document.getElementById('edit-city')
const enterCityBtn = document.getElementById('enter-city')
const input = document.getElementById('city-input')



// default city is London
addEventListener('load', getAllData())

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const cityInput = document.querySelector('input').value;
    getAllData(cityInput);
    // console.log('key pressed')
  }
})

enterCityBtn.addEventListener('click', () => {
  const cityInput = document.querySelector('input').value;
  getAllData(cityInput);
  // console.log(cityInput)
})

// Get weather data when enter a city name
async function getAllData(city='london') {
  try {
    const cityInput = document.querySelector('input').value;
    let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=c675fe167dd24bf6a0d141131242501&q=${city}&aqi=no`)

    let weekResponse = await axios.get(`
    http://api.weatherapi.com/v1/forecast.json?key=c675fe167dd24bf6a0d141131242501&q=bankok&days=7&aqi=no&alerts=no`)

    getLocation(response)
    getTemp(response)
    getCondition(response)
    console.log('main function', cityInput)
    getDate(weekResponse)

  } catch(error) {
    console.error('it is an error', error)
  }
}

// Functions
function getLocation(response) {
  let cityName = response.data.location.name;
  let countryName = response.data.location.country
  city.innerHTML = `<p>${cityName}, ${countryName}</p>`
  // console.log(cityName)
}



function getTemp(response) {
  let cityTemp = response.data.current.temp_c
  temp.innerHTML = `<p>${cityTemp}</p>`
  console.log(cityTemp)
}

function getCondition(response) {
  let cityCondition = response.data.current.condition.text
  let cityConditionIcon = response.data.current.condition.icon
  condition.innerHTML = `<p>${cityCondition}</p>`;
  icon.innerHTML = `<img src="${cityConditionIcon}">`
  // console.log(cityConditionIcon)
  console.log(cityCondition)
}


function getDate(weekResponse) {
  let weekArr = weekResponse.data.forecast
  console.log(weekArr)
  // let today = 
}
