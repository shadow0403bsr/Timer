function submitFunction() {
	try {
		var latlng = document.getElementById("input_coordinate").value.split(",");
		var timeZone = tzlookup(latlng[0].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, ''), latlng[1].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, ''));
		var endTime = "2019-08-03 19:00:00";
		var eventEndTime = moment.tz(endTime, timeZone);
		var result = "";
		var now = moment();
		var distance = 0;
		var days = 0;
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		distance = eventEndTime.unix() - now.unix();
		if(distance > 10800) {
			result = "The event hasn't started here yet."
		}
		else if(distance >= 0) {
			days = Math.floor(distance / (60 * 60 * 24));
			hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
			minutes = Math.floor((distance % (60 * 60)) / (60));
			seconds = Math.floor((distance % (60)) / 1);
			result = "Event ends in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
		}
		else {
			result = "The event has already ended here."
		}
		document.getElementById("tzguessResult").style.color = "#FDA92C";
		document.getElementById("tzguessResult").innerHTML = "<div>&nbsp;</div>The time zone here is " + timeZone + " UTC " + eventEndTime.utcOffset()/60 + "<br>" + result;
	}
	catch(err) {
		document.getElementById("tzguessResult").style.color = "red";
		document.getElementById("tzguessResult").innerHTML = "<div>&nbsp;</div>Please check your co-ordinates again.";
	}
}

function clearFunction() {
	document.getElementById("input_coordinate").value = "";
	document.getElementById("tzguessResult").innerHTML = "";
}