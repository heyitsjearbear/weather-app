function unixTimeConverter(unixTimestamp) {
  let date = new Date(unix_timestamp * 1000);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${month+1}/${day}/${year}`;


}
function getDayName(dateStr)
{
    var date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: 'long' });        
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

//retrieve submit button
let submit = document.querySelector("#submit");
//retrieve city name
let cityName = document.querySelector(".location-title");
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
      console.log(data);
      cityName.innerHTML = capitalizeCity(city);
      //var tempValue = data["main"]["temp"];
      //var nameValue = data["name"];
      //var descValue = data["weather"][0]["description"];

      city = "";
    })
    .catch((err) => alert("Invalid city Name! Try Again."));
});
