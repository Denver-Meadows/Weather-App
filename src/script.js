const API_KEY = 'ff443ec09c8845ecb4df38d8b5c818bf';

const state = {
  data: [],
}

const weatherDataContainer = document.querySelector('.weather__data')

const getWeatherData = async function() {
  try {
    const request = fetch(`https://api.weatherbit.io/v2.0/current?&postal_code=45039&country=US&key=${API_KEY}&units=I&include=minutely`)
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
      <p class="weather__data__location__city">Weather Today <br>${data.city_name}, ${data.state_code}</p>
      <p class="weather__data__location__time">${data.ob_time}</p>
    </div>
    <div class="weather__data__current">
      <p class="weather__data__current__icon"><img src="src/icons/${data.weather.icon}.png" alt=""></p>
      <p class="weather__data__current__description">${data.weather.description}</p>
    </div>
    <div class="weather__data__temp">
      <p class="weather__data__temp__actual">${data.temp}°</p>
      <p class="weather__data__temp__feels-like">Feels like <span class="number">${Math.round(data.app_temp)}°</span></p>
    </div>
    <div class="weather__data__additional-info">
      <p class="weather__data__additional-info__humidity">Humidity:   <span class="number">${data.rh}%</span></p>
      <p class="weather__data__additional-info__wind">Wind:  <span class="number">${data.wind_spd}</span>mph ${data.wind_cdir}</p>
      <p class="weather__data__additional-info__air-quality">Air Quality:  <span class="number">${data.aqi}</span></p>
      <p class="weather__data__additional-info__dewpt">Dew Point:   <span class="number">${data.dewpt}°</span></p>
    </div>
    <div class="weather__data__sun">
      <p class="weather__data__sun-rise">Sunrise:   ${data.sunrise}</p>
      <p class="weather__data__sun-set">Sunset:   ${data.sunset}</p>
    </div>
  `
  weatherDataContainer.insertAdjacentHTML('beforeend', html)
}

getWeatherData()
