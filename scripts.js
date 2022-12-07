function getMonth(month) {
  switch (month) {
      case 1:
          return "January";
      case 2:
          return "February";
      case 3:
          return "March";
    case 4:
      return "April";
    case 5:
      return "May";
      case 6:
          return "June";
      case 7:
          return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
}

let timeElement = document.getElementById("actualTime");
let dateElement = document.getElementById("actualDate");
setInterval(function () {
  let currentTime = new Date();
  let month = currentTime.getMonth();
  let day = currentTime.getDay();
  let year = currentTime.getFullYear();
  dateElement.innerHTML = getMonth(month) + " " + day + ", " + year;
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let time = hours + ":" + minutes + ":" + seconds + " ";
  if (hours > 11) {
    time += "PM";
  } else {
    time += "AM";
  }
  timeElement.innerHTML = "Current Local Time: " + time;
}, 1000);
