countdownTimer();
function countdownTimer() {
	var now = moment();
	document.getElementById("displayMoment").innerHTML = moment.tz.guess() +"-" + moment.tz(moment.tz.guess()).zoneAbbr() + "<br>" + now.format("DD-MM-YYYY") + "<br>" + now.format("HH:mm:ss");
	setTimeout(countdownTimer, 1000);
}