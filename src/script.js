const API_KEY = 'ff443ec09c8845ecb4df38d8b5c818bf';

const state = {
  data: [],
}

const weatherDataContainer = document.querySelector('.weather__data')

const getWeatherData = async function() {
  try {
    const request = fetch(`https://api.weatherbit.io/v2.0/current?&postal_code=45039&country=US&key=${API_KEY}&include=minutely`)
    const res = await request;
    const data = await res.json();

    // if (res.ok) console.log('ok')
    state.data = data.data[0]
    console.log(state.data)

    renderWeatherData(state.data)

  } catch (error) {
    console.error(error)
  }
}

const renderWeatherData = async function(data) {
  const html = `
    <div class="weather__data__location">
      <p class="weather__data__location__city">${data.city_name}, ${data.state_code}</p>
      <p class="weather__data__loations__time">${data.datetime} ${data.timezone}</p>
    </div>
    <div class="weather__data__current">
      <p class="weather__data__current__icon"><img src="src/icons/${data.weather.icon}.png" alt=""></p>
      <p class="weather__data__current__description">${data.weather.description}</p>
    </div>
    <div class="weather__data__clouds">
      <p class="weather__data__clouds__coverage">${data.clouds}% Clouds</p>
    </div>
    <div class="weather__data__temp">
      <p class="weather__data__temp__actual">${data.temp}°</p>
      <p class="weather__data__temp__feels-like">Feels like ${data.app_temp}°</p>
    </div>
    <div class="weather__data__additional-info">
      <p class="weather__data_additional-info__humidity">Humidity ${data.rh}%</p>
      <p class="weather__data_additional-info__wind">Wind ${data.wind_spd} ${data.wind_cdir_full}</p>
      <p class="weather__data_additional-info__precipitation">Chances of Precipitation ${data.precip}%</p>
      <p class="weather__data_additional-info__air-quality">Air Quality ${data.aqi}</p>
    </div>
    <div class="weather__data__sun">
      <p class="weather__data__sun-rise">Sunrise ${data.sunrise}</p>
      <p class="weather__data__sun-set">Sunset ${data.sunset}</p>
    </div>
  `
  weatherDataContainer.insertAdjacentHTML('beforeend', html)
}

getWeatherData()
