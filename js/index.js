"use strict";

const search = document.getElementById("search");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherDate(`${lat},${lon}`);
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}

search.addEventListener("input", async function () {
  const country = search.value;
  getWeatherDate(country);
});

async function getWeatherDate(country) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${country}&days=3&key=7671852ed97d4dc4b73161004240207`
  );
  let data = await res.json();
  displayTodayWeather(data);
  displayTomorrowWeather(data);
  theDayAfterTomorrow(data);
}

function displayTodayWeather(data) {
  // data of history
  let history = data.current.last_updated;
  let dataHistoryContent = new Date(history);
  let day = dataHistoryContent.getDate();
  let week = dataHistoryContent.toLocaleString("en-us", { weekday: "long" });
  let month = dataHistoryContent.toLocaleString("en-us", { month: "long" });
  DayOfWeek.innerHTML = week;
  dayOfMonth.innerHTML = day;
  monthOfYear.innerHTML = month;

  // Data of location
  let location = data.location.name;
  city.innerHTML = location;

  // Data of weather
  let temp = data.current.temp_c;
  let toDayCondition = data.current.condition.text;
  let ImgCondition = data.current.condition.icon;
  weatherIcon.innerHTML = temp;
  nowCondition.innerHTML = toDayCondition;
  imgIcon.setAttribute("src", ImgCondition);
}

function displayTomorrowWeather(date) {
  // data of history
  let tomorrow = date.forecast.forecastday[1].date;
  let tomorrowHistory = new Date(tomorrow);
  let week = tomorrowHistory.toLocaleString("en-us", { weekday: "long" });
  nextDay.innerHTML = week;
  console.log(week);
  // Data of weather
  let maxtemp = date.forecast.forecastday[1].day.maxtemp_c;
  let mintemp = date.forecast.forecastday[1].day.mintemp_c;
  let tomorrowImgCondition = date.forecast.forecastday[1].day.condition.icon;
  let tomorrowCondition = date.forecast.forecastday[1].day.condition.text;
  nextDayWeather.innerHTML = maxtemp;
  smalltemp.innerHTML = mintemp
  imgNextDay.setAttribute("src", tomorrowImgCondition);
  tomorrowConditionText.innerHTML = tomorrowCondition;
}

function theDayAfterTomorrow(data){
  // data of history
  let theDayAfterTomorrow = data.forecast.forecastday[2].date;
  let theDayAfterTomorrowHistory = new Date(theDayAfterTomorrow);
  let week = theDayAfterTomorrowHistory.toLocaleString("en-us", { weekday: "long"});
  nextDay2.innerHTML = week;
  // Data of weather
  let maxtemp = data.forecast.forecastday[2].day.maxtemp_c;
  let mintemp = data.forecast.forecastday[2].day.mintemp_c;
  let theDayAfterTomorrowImgCondition = data.forecast.forecastday[2].day.condition.icon;
  let theDayAfterTomorrowCondition = data.forecast.forecastday[2].day.condition.text
  nextDay2Weather.innerHTML = maxtemp;
  smalltemp2.innerHTML = mintemp;
  imgNextDay2.setAttribute("src", theDayAfterTomorrowImgCondition);
  tomorrowConditionText2.innerHTML = theDayAfterTomorrowCondition;
}

