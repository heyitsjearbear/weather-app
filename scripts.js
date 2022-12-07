var timeElement = document.getElementById('actualTime');
setInterval(function() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var time = hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        time += "PM";
    } else {
        time += "AM";
    }
    timeElement.innerHTML = "Current Local Time" + time;
}, 1000);