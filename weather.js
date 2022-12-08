let submit = document.querySelector("#submit");
let temperature = document.querySelector(".degrees-celsius");
submit.addEventListener("click", () => {
  let city = document.querySelector("#city-name").value;
  console.log(`Entered ${city}`);
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=98c13a7725d224f508da1c6f66e1423a"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //var tempValue = data["main"]["temp"];
      //var nameValue = data["name"];
      //var descValue = data["weather"][0]["description"];

      city = "";
    })

    //.catch((err) => alert("Wrong city name!"));
});
