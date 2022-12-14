//function returns sunrise/sunset time as string
function getSunriseSunset(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour > 12) {
    return `${hour - 12}:${min}PM`;
  }
  return `${hour}:${min}AM`;
}



//returns date from unix UTX
function unixTimeConverter(unixTimestamp) {
  let date = new Date(unix_timestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${month + 1}/${day}/${year}`;
}
//returns weekday from date
function getDayName(dateStr) {
  var date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

//function returns inputted kelvin to fahrenheit
const kelvinToFahrenheit = (kelvin) => 1.8 * (kelvin - 273) + 32;

//function returns a string that capitalizes each word of a
//paramter string
function capitalizeCity(city) {
  const wordsArr = city.split(" ");
  for (let i = 0; i < wordsArr.length; i++) {
    wordsArr[i] = wordsArr[i][0].toUpperCase() + wordsArr[i].substr(1);
  }
  const withSpace = wordsArr.join(" ");
  return withSpace;
}

//retrieve submit button
let submit = document.querySelector("#submit");
//retrieve city name
let cityName = document.querySelector(".location-title");
//retrieve weather img
let mainWeatherIMG = document.querySelector(".weather-image");
//retrieve currentTemp
let mainTemp = document.querySelector(".deg");
//retrieve generalization
let generalization = document.querySelector(".generalization");
let high = document.querySelector('#high');
let low = document.querySelector('#low');
let wind = document.querySelector('#wind');
let rain = document.querySelector('#rain');
let sunrise = document.querySelector('#sunrise');
let sunset = document.querySelector('#sunset');

//submit button event
submit.addEventListener("click", () => {
  let city = document.querySelector("#city-name").value;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=98c13a7725d224f508da1c6f66e1423a"
  )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      //function changes weather image based on description
      // function changeWeatherIMG(description) {
        
      // }
      console.log(data);
      let currTempVal = kelvinToFahrenheit(Math.round(data["list"]["0"]["main"]["temp"])) + "°F";
      //here we don't have data in JSON to determine high/low
      //so we have to iterate over 8 hour time period to figure out low,
      ///might be off a little bit but thats okay :)
      let currTempHigh = Math.round(data["list"]["0"]["main"]["temp"]);
      for (let i = 1; i < 8; i++){
        currTempHigh = Math.max(currTempHigh,Math.round(data["list"][`${i}`]["main"]["temp"]));
      }
      currTempHigh = kelvinToFahrenheit(currTempHigh) + "°F";
      let currTempLow = Math.round(data["list"]["0"]["main"]["temp"]);
      for (let i = 1; i < 8; i++){
        currTempLow = Math.min(currTempLow,Math.round(data["list"][`${i}`]["main"]["temp"]));
      }
      currTempLow = kelvinToFahrenheit(currTempLow) + "°F";

      //here update the rest of the statistics
      let currentDescription = data["list"]["0"]["weather"]["0"]["description"];
      let currentRainPercentage = (data["list"]["0"]["pop"] * 100) + "%";
      let sunriseTime = getSunriseSunset(data["city"]["sunrise"]);
      let sunsetTime = getSunriseSunset(data["city"]["sunset"]);
      let windSpeed = (data["list"]["0"]["wind"]["speed"]) + "m/s";
      let mainWeatherIcon = data["list"]["0"]["weather"]["0"]["icon"];
      let mainWeatherIconUrl = `http://openweathermap.org/img/wn/${mainWeatherIcon}.png`;
      //UPDATE DOM HERE
      mainWeatherIMG.innerHTML = `<img src= ${mainWeatherIconUrl} />`;
      cityName.innerHTML = capitalizeCity(city);
      mainTemp.innerHTML = currTempVal;
      generalization.innerHTML = currentDescription;
      high.innerHTML = currTempHigh;
      low.innerHTML = currTempLow;
      wind.innerHTML = windSpeed;
      rain.innerHTML = currentRainPercentage;
      sunrise.innerHTML = sunriseTime;
      sunset.innerHTML = sunsetTime;
      city = "";
    })
    .catch((err) => alert("Invalid city Name! Try Again."));
});
