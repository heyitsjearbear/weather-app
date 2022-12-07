let dateElement = document.getElementById("actualDate");
setInterval(function () {
  let currentTime = new Date();
  dateElement.innerHTML = "Local Info: " + currentTime;
}, 1000);
