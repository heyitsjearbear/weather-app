let dateElement = document.getElementById("actualDate");
setInterval(function () {
  let currentTime = new Date();
  let month = currentTime.getMonth();
  let day = currentTime.getDay();
  let year = currentTime.getFullYear();
  dateElement.innerHTML = currentTime;
}, 1000);
