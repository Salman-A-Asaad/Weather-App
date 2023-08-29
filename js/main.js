let inputCity = document.getElementById("input-city");
let search = document.getElementById("search");
let cityName = document.getElementById("city-name");
let today = document.getElementById("today");
let temperature = document.getElementById("temperature");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let imageToday = document.getElementById("image-now");
let dayOne = document.getElementById("day-one");
let imgOne = document.getElementById("img-one");
let tempOne = document.getElementById("temp-one");
let windOne = document.getElementById("wind-one");
let humidityOne = document.getElementById("humidity-one");
let dayTwo = document.getElementById("day-two");
let imgTwo = document.getElementById("img-two");
let tempTwo = document.getElementById("temp-two");
let windTwo = document.getElementById("wind-two");
let humidityTwo = document.getElementById("humidity-two");
let dayThree = document.getElementById("day-three");
let imgThree = document.getElementById("img-three");
let tempThree = document.getElementById("temp-three");
let windThree = document.getElementById("wind-three");
let humidityThree = document.getElementById("humidity-three");
let dayFour = document.getElementById("day-four");
let imgFour = document.getElementById("img-four");
let tempFour = document.getElementById("temp-four");
let windFour = document.getElementById("wind-four");
let humidityFour = document.getElementById("humidity-four");
search.addEventListener("click", () => {
  if (inputCity.value !== "") {
    getLanLon();
  }
});

function getLanLon() {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${inputCity.value}&limit=1&appid=9a85057ceb2c53e34fecbfbace9eb2fa`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      let { name, lat, lon } = data[0];
      cityName.innerHTML = name;
      getData(lat, lon);
    });
}

function getData(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9a85057ceb2c53e34fecbfbace9eb2fa`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      const uniqueForecastDays = [];
      const fourDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      changeData(fourDaysForecast);
    });
}

function changeData(data) {
  today.innerHTML = `(${data[0].dt_txt.split(" ")[0]})`;
  humidity.innerHTML = `${data[0].main.humidity}%`;
  temperature.innerHTML = `${(data[0].main.temp - 273).toFixed(2)}C`;
  wind.innerHTML = `${data[0].wind.speed}M/S`;
  imageToday.src = `https://openweathermap.org/img/wn/${data[0].weather[0].icon}@4x.png`;
  dayOne.innerHTML = `(${data[1].dt_txt.split(" ")[0]})`;
  humidityOne.innerHTML = `${data[1].main.humidity}%`;
  tempOne.innerHTML = `${(data[1].main.temp - 273).toFixed(2)}C`;
  windOne.innerHTML = `${data[1].wind.speed}M/S`;
  imgOne.src = `https://openweathermap.org/img/wn/${data[1].weather[0].icon}@4x.png`;
  dayTwo.innerHTML = `(${data[2].dt_txt.split(" ")[0]})`;
  humidityTwo.innerHTML = `${data[2].main.humidity}%`;
  tempTwo.innerHTML = `${(data[2].main.temp - 273).toFixed(2)}C`;
  windTwo.innerHTML = `${data[2].wind.speed}M/S`;
  imgTwo.src = `https://openweathermap.org/img/wn/${data[2].weather[0].icon}@4x.png`;
  dayThree.innerHTML = `(${data[3].dt_txt.split(" ")[0]})`;
  humidityThree.innerHTML = `${data[3].main.humidity}%`;
  tempThree.innerHTML = `${(data[3].main.temp - 273).toFixed(2)}C`;
  windThree.innerHTML = `${data[3].wind.speed}M/S`;
  imgThree.src = `https://openweathermap.org/img/wn/${data[3].weather[0].icon}@4x.png`;
  dayFour.innerHTML = `(${data[4].dt_txt.split(" ")[0]})`;
  humidityFour.innerHTML = `${data[4].main.humidity}%`;
  tempFour.innerHTML = `${(data[4].main.temp - 273).toFixed(2)}C`;
  windFour.innerHTML = `${data[4].wind.speed}M/S`;
  imgFour.src = `https://openweathermap.org/img/wn/${data[4].weather[0].icon}@4x.png`;
}
