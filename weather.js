//function returns time UTC
function getTime(dt_text1) {
  let time1 = dt_text1.split(" ").pop();
  hour1 = time1.substr(0, time1.indexOf(":"));
  console.log(hour1);
  return hour1 + ":00UTC";
  
}



//function returns sunrise/sunset time as string
function getSunriseSunset(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour > 12) {
    if(min<10) return `${hour - 12}:0${min}PM`;
    return `${hour - 12}:${min}PM`;
  }
  if(min<10) return `${hour}:0${min}AM`;
  return `${hour}:${min}AM`;
}

//returns day from unix UTX
function getDay(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let day = date.getDay();
  return day; //returns 0,1,2,3,4,5,6 representing weekdays, sunday is 0, monday is 1...
}
//returns date from unix UTX
function unixTimeConverter(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${month + 1}/${day}/${year}`; //returns MM/DD/YYY
}
//returns weekday from date
function getDayName(dateStr) {
  var date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

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
//function returns weekday in string form based off of parameter
function getWeekDay(num) {
  switch (num) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
  
    
  }
}

let driver = document.querySelector('.main');
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
let pressureLBL = document.querySelector('#pressure');
let humidityLBL = document.querySelector('#humidity');

//submit button event
submit.addEventListener("click", () => {
  let city = document.querySelector("#city-name").value;
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=98c13a7725d224f508da1c6f66e1423a&units=imperial"
  )
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then((data) => {
      driver.style.opacity = 0;
      setTimeout(() => {
        console.log(data);
      let currTempVal = Math.round(data["list"]["0"]["main"]["temp"]) + "°F";
      //here we don't have data in JSON to determine high/low
      //so we have to iterate over 8 hour time period to figure out low,
      ///might be off a little bit but thats okay :)
      let currTempHigh = Math.round(data["list"]["0"]["main"]["temp"]);
      for (let i = 1; i < 8; i++) {
        currTempHigh = Math.max(currTempHigh, Math.round(data["list"][`${i}`]["main"]["temp"]));
      }
      currTempHigh += "°F";
      let currTempLow = Math.round(data["list"]["0"]["main"]["temp"]);
      for (let i = 1; i < 8; i++) {
        currTempLow = Math.min(currTempLow, Math.round(data["list"][`${i}`]["main"]["temp"]));
      }
      currTempLow += "°F";

      //here update the rest of the statistics
      let currentDescription = data["list"]["0"]["weather"]["0"]["description"];
      let currentRainPercentage = Math.round((data["list"]["0"]["pop"] * 100)) + "%";
      let pressure = data["list"]["0"]["main"]["pressure"] + "hPa";
      let humidity = Math.round(data["list"]["0"]["main"]["humidity"]) + "%";
      let windSpeed = (data["list"]["0"]["wind"]["speed"]) + "mph";
      let mainWeatherIcon = data["list"]["0"]["weather"]["0"]["icon"];
      let mainWeatherIconUrl = `http://openweathermap.org/img/wn/${mainWeatherIcon}.png`;
      //change name of weekday for 5-day forecast
      //first grab date of today we are checking current
      let currentDayCode = data["list"]["0"]["dt"];
      let currentWeekday = getDayName(unixTimeConverter(currentDayCode));
      console.log(currentWeekday);
      for(let i = 1; i <= 5; i++){
        document.querySelector(`.day-${i}`).innerHTML = getTime(data["list"][`${i}`]["dt_txt"]);
        document.querySelector(`.degrees-${i}`).innerHTML = Math.round(data["list"][`${i}`]["main"]["temp"]) + "°F";
        let icon = data["list"][`${i}`]["weather"]["0"]["icon"];
        let iconURL = `http://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(`.image-${i}`).innerHTML = `<img src="${iconURL}" />`;
      }
      //UPDATE DOM HERE
      mainWeatherIMG.innerHTML = `<img src= ${mainWeatherIconUrl} />`;
      cityName.innerHTML = capitalizeCity(city);
      mainTemp.innerHTML = currTempVal;
      generalization.innerHTML = currentDescription;
      high.innerHTML = currTempHigh;
      low.innerHTML = currTempLow;
      wind.innerHTML = windSpeed;
      rain.innerHTML = currentRainPercentage;
      pressureLBL.innerHTML = pressure;
      humidityLBL.innerHTML = humidity;
      driver.style.opacity = 100;
      }, "500");
    })
    .catch((err) => alert("Invalid city Name! Try Again."));
});
