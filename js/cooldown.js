function distance() {
	try {
		var coord1 = document.getElementById("input_coordinate1").value.split(",");
		var coord2 = document.getElementById("input_coordinate2").value.split(",");
		var lat1 = coord1[0].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, '');
		var lon1 = coord1[1].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, '');
		var lat2 = coord2[0].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, '');
		var lon2 = coord2[1].replace(/(^[ '\^\$\*#&]+)|([ '\^\$\*#&]+$)/g, '');
		var dist;
		var time;
		var result;
		if ((lat1 == lat2) && (lon1 == lon2)) {
			dist = 0;
			result = "The distance between " + coord1 + " and " + coord2 + " is " + dist + " km";
		}
		else {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta/180;
			dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist);
			dist = dist * 180/Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			result = "The distance between " + coord1 + " and " + coord2 + " is " + Math.round(dist*100) /100 + " km";
			dist = Math.round(dist);
		}
		console.log(dist);
		if (dist <= 1) {
			console.log(dist);
			time = 1;
		}
		else if (1 < dist && dist <= 2) {
			time = 2;
		}
		else if (2 < dist && dist <= 4) {
			time = 3;
		}
		else if (4 < dist && dist <= 5) {
			time = 4;
		}
		else if (5 < dist && dist <= 8) {
			time = 5;
		}
		else if (8 < dist && dist <= 10) {
			time = 7;
		}
		else if (10 < dist && dist <= 15) {
			time = 9;
		}
		else if (15 < dist && dist <= 20) {
			time = 12;
		}
		else if (20 < dist && dist <= 25) {
			time = 15;
		}
		else if (25 < dist && dist <= 30) {
			time = 17;
		}
		else if (30 < dist && dist <= 35) {
			time = 18;
		}
		else if (35 < dist && dist <= 45) {
			time = 19;
		}
		else if (45 < dist && dist <= 50) {
			time = 20;
		}
		else if (50 < dist && dist <= 60) {
			time = 21;
		}
		else if (60 < dist && dist <= 70) {
			time = 23;
		}
		else if (70 < dist && dist <= 80) {
			time = 24;
		}
		else if (80 < dist && dist <= 90) {
			time = 25;
		}
		else if (90 < dist && dist <= 100) {
			time = 26;
		}
		else if (100 < dist && dist <= 125) {
			time = 29;
		}
		else if (125 < dist && dist <= 150) {
			time = 32;
		}
		else if (150 < dist && dist <= 175) {
			time = 34;
		}
		else if (175 < dist && dist <= 200) {
			time = 37;
		}
		else if (200 < dist && dist <= 250) {
			time = 41;
		}
		else if (250 < dist && dist <= 300) {
			time = 46;
		}
		else if (300 < dist && dist <= 325) {
			time = 48;
		}
		else if (325 < dist && dist <= 350) {
			time = 50;
		}
		else if (350 < dist && dist <= 400) {
			time = 54;
		}
		else if (400 < dist && dist <= 450) {
			time = 58;
		}
		else if (450 < dist && dist <= 500) {
			time = 62;
		}
		else if (500 < dist && dist <= 550) {
			time = 66;
		}
		else if (550 < dist && dist <= 600) {
			time = 70;
		}
		else if (600 < dist && dist <= 650) {
			time = 74;
		}
		else if (650 < dist && dist <= 700) {
			time = 77;
		}
		else if (700 < dist && dist <= 750) {
			time = 82;
		}
		else if (750 < dist && dist <= 800) {
			time = 84;
		}
		else if (800 < dist && dist <= 825) {
			time = 88;
		}
		else if (825 < dist && dist <= 850) {
			time = 90;
		}
		else if (850 < dist && dist <= 900) {
			time = 91;
		}
		else if (900 < dist && dist <= 950) {
			time = 95;
		}
		else if (950 < dist && dist <= 1007) {
			time = 98;
		}
		else if (1007 < dist && dist <= 1020) {
			time = 102;
		}
		else if (1020 < dist && dist <= 1100) {
			time = 104;
		}
		else if (1100 < dist && dist <= 1180) {
			time = 109;
		}
		else if (1180 < dist && dist <= 1220) {
			time = 111;
		}
		else if (1220 < dist && dist <= 1300) {
			time = 117;
		}
		else {
			time = 120; 
		}
		console.log(time);
		var hours;
		var minutes;
		hours = Math.floor((time % (60 * 24)) / (60));
		minutes = Math.floor((time % (60)) / 1);
		result += " and the cooldown is " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m";
		document.getElementById("cooldownResult").style.color = "#5EB750";
		document.getElementById("cooldownResult").innerHTML = result;
	}
	catch (err) {
		document.getElementById("cooldownResult").style.color = "red";
		document.getElementById("cooldownResult").innerHTML = "<div>&nbsp;</div>Please check your co-ordinates again." + err;
	}
}

function clearFunction() {
	document.getElementById("input_coordinate1").value = "";
	document.getElementById("input_coordinate2").value = "";
	document.getElementById("cooldownResult").innerHTML = "";
}