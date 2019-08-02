//using cookie library manage the cookies
//Cookies.remove('userTimeZones');
//Cookies.remove('userCities');
function getCookie(cname) {
    var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

var regions = ["Africa", "America", "Antarctica", "Arctic", "Asia", "Atlantic", "Australia", "Brazil", "Canada", "Chile", "Europe", "Indian", "Mexico", "Pacific", "US"];

var africa = ["Abidjan", "Accra", "Addis Ababa", "Algiers", "Asmara", "Asmera", "Bamako", "Bangui", "Banjul", "Bissau", "Blantyre", "Brazzaville", "Bujumbura", "Cairo", "Casablanca", "Ceuta",
			  "Conakry", "Dakar", "Dar es Salaam", "Djibouti", "Douala", "El Aaiun", "Freetown", "Gaborone", "Harare", "Johannesburg", "Juba", "Kampala", "Khartoum", "Kigali", "Kinshasa",
			  "Lagos", "Libreville", "Lome", "Luanda", "Lubumbashi", "Lusaka", "Malabo", "Maputo", "Maseru", "Mbabane", "Mogadishu", "Monrovia", "Nairobi", "Ndjamena", "Niamey", "Nouakchott",
			  "Ouagadougou", "Porto-Novo", "Sao Tome", "Timbuktu", "Tripoli", "Tunis", "Windhoek"];
var africaTZ = ["Africa/Abidjan", "Africa/Accra", "Africa/Addis_Ababa", "Africa/Algiers", "Africa/Asmara", "Africa/Asmera", "Africa/Bamako", "Africa/Bangui", "Africa/Banjul", "Africa/Bissau",
				"Africa/Blantyre", "Africa/Brazzaville", "Africa/Bujumbura", "Africa/Cairo", "Africa/Casablanca", "Africa/Ceuta", "Africa/Conakry", "Africa/Dakar", "Africa/Dar_es_Salaam",
				"Africa/Djibouti", "Africa/Douala", "Africa/El_Aaiun", "Africa/Freetown", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Juba", "Africa/Kampala", "Africa/Khartoum",
				"Africa/Kigali", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Lome", "Africa/Luanda", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Malabo", "Africa/Maputo",
				"Africa/Maseru", "Africa/Mbabane", "Africa/Mogadishu", "Africa/Monrovia", "Africa/Nairobi", "Africa/Ndjamena", "Africa/Niamey", "Africa/Nouakchott", "Africa/Ouagadougou",
				"Africa/Porto-Novo", "Africa/Sao_Tome", "Africa/Timbuktu", "Africa/Tripoli", "Africa/Tunis", "Africa/Windhoek"];
				
var america = ["Adak", "Anchorage", "Anguilla", "Antigua", "Araguaina", "Argentina Buenos Aires", "Argentina Catamarca", "Argentina ComodRivadavia", "Argentina Cordoba", "Argentina Jujuy", 
			   "Argentina La Rioja", "Argentina Mendoza", "Argentina Rio Gallegos", "Argentina Salta", "Argentina San Juan", "Argentina San Luis", "Argentina Tucuman", "Argentina Ushuaia",
			   "Aruba", "Asuncion", "Atikokan", "Atka", "Bahia", "Bahia Banderas", "Barbados", "Belem", "Belize", "Blanc-Sablon", "Boa Vista", "Bogota", "Boise", "Buenos Aires", "Cambridge Bay",
			   "Campo Grande", "Cancun", "Caracas", "Catamarca", "Cayenne", "Cayman", "Chicago", "Chihuahua", "Coral Harbour", "Cordoba", "Costa Rica", "Creston", "Cuiaba", "Curacao",
			   "Danmarkshavn", "Dawson", "Dawson Creek", "Denver", "Detroit", "Dominica", "Edmonton", "Eirunepe", "El Salvador", "Ensenada", "Fort Nelson", "Fort Wayne", "Fortaleza", "Glace Bay",
			   "Godthab", "Goose Bay", "Grand Turk", "Grenada", "Guadeloupe", "Guatemala", "Guayaquil", "Guyana", "Halifax", "Havana", "Hermosillo", "Indiana Indianapolis", "Indiana Knox",
			   "Indiana Marengo", "Indiana Petersburg", "Indiana Tell City", "Indiana Vevay", "Indiana Vincennes", "Indiana Winamac", "Indianapolis", "Inuvik", "Iqaluit", "Jamaica", "Jujuy", "Juneau",
			   "Kentucky Louisville", "Kentucky Monticello", "Knox IN", "Kralendijk", "La Paz", "Lima", "Los Angeles", "Louisville", "Lower Princes", "Maceio", "Managua", "Manaus", "Marigot",
			   "Martinique", "Matamoros", "Mazatlan", "Mendoza", "Menominee", "Merida", "Metlakatla", "Mexico City", "Miquelon", "Moncton", "Monterrey", "Montevideo", "Montreal", "Montserrat",
			   "Nassau", "New York", "Nipigon", "Nome", "Noronha", "North Dakota Beulah", "North Dakota Center", "North Dakota New Salem", "Ojinaga", "Panama", "Pangnirtung", "Paramaribo", "Phoenix",
			   "Port-au-Prince", "Port of Spain", "Porto Acre", "Porto Velho", "Puerto Rico", "Punta Arenas", "Rainy River", "Rankin Inlet", "Recife", "Regina", "Resolute", "Rio Branco", "Rosario",
			   "Santa Isabel", "Santarem", "Santiago", "Santo Domingo", "Sao Paulo", "Scoresbysund", "Shiprock", "Sitka", "St Barthelemy", "St Johns", "St Kitts", "St Lucia", "St Thomas", "St Vincent",
			   "Swift Current", "Tegucigalpa", "Thule", "Thunder Bay", "Tijuana", "Toronto", "Tortola", "Vancouver", "Virgin", "Whitehorse", "Winnipeg", "Yakutat", "Yellowknife"];
var americaTZ = ["America/Adak", "America/Anchorage", "America/Anguilla", "America/Antigua", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca",
				 "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", 
				 "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman",
				 "America/Argentina/Ushuaia", "America/Aruba", "America/Asuncion", "America/Atikokan", "America/Atka", "America/Bahia", "America/Bahia_Banderas", "America/Barbados",
				 "America/Belem", "America/Belize", "America/Blanc-Sablon", "America/Boa_Vista", "America/Bogota", "America/Boise", "America/Buenos_Aires", "America/Cambridge_Bay",
				 "America/Campo_Grande", "America/Cancun", "America/Caracas", "America/Catamarca", "America/Cayenne", "America/Cayman", "America/Chicago", "America/Chihuahua",
				 "America/Coral_Harbour", "America/Cordoba", "America/Costa_Rica", "America/Creston", "America/Cuiaba", "America/Curacao", "America/Danmarkshavn", "America/Dawson",
				 "America/Dawson_Creek", "America/Denver", "America/Detroit", "America/Dominica", "America/Edmonton", "America/Eirunepe", "America/El_Salvador", "America/Ensenada",
				 "America/Fort_Nelson", "America/Fort_Wayne", "America/Fortaleza", "America/Glace_Bay", "America/Godthab", "America/Goose_Bay", "America/Grand_Turk", "America/Grenada",
				 "America/Guadeloupe", "America/Guatemala", "America/Guayaquil", "America/Guyana", "America/Halifax", "America/Havana", "America/Hermosillo", "America/Indiana/Indianapolis",
				 "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes",
				 "America/Indiana/Winamac", "America/Indianapolis", "America/Inuvik", "America/Iqaluit", "America/Jamaica", "America/Jujuy", "America/Juneau", "America/Kentucky/Louisville",
				 "America/Kentucky/Monticello", "America/Knox_IN", "America/Kralendijk", "America/La_Paz", "America/Lima", "America/Los_Angeles", "America/Louisville",
				 "America/Lower_Princes", "America/Maceio", "America/Managua", "America/Manaus", "America/Marigot", "America/Martinique", "America/Matamoros", "America/Mazatlan",
				 "America/Mendoza", "America/Menominee", "America/Merida", "America/Metlakatla", "America/Mexico_City", "America/Miquelon", "America/Moncton", "America/Monterrey",
				 "America/Montevideo", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Nome", "America/Noronha",
				 "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Ojinaga", "America/Panama", "America/Pangnirtung",
				 "America/Paramaribo", "America/Phoenix", "America/Port-au-Prince", "America/Port_of_Spain", "America/Porto_Acre", "America/Porto_Velho", "America/Puerto_Rico",
				 "America/Punta_Arenas", "America/Rainy_River", "America/Rankin_Inlet", "America/Recife", "America/Regina", "America/Resolute", "America/Rio_Branco", "America/Rosario",
				 "America/Santa_Isabel", "America/Santarem", "America/Santiago", "America/Santo_Domingo", "America/Sao_Paulo", "America/Scoresbysund", "America/Shiprock",
				 "America/Sitka", "America/St_Barthelemy", "America/St_Johns", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Swift_Current",
				 "America/Tegucigalpa", "America/Thule", "America/Thunder_Bay", "America/Tijuana", "America/Toronto", "America/Tortola", "America/Vancouver", "America/Virgin",
				 "America/Whitehorse", "America/Winnipeg", "America/Yakutat", "America/Yellowknife"];

var antarctica = ["Casey", "Davis", "DumontDUrville", "Macquarie", "Mawson", "McMurdo", "Palmer", "Rothera", "South Pole", "Syowa", "Troll", "Vostok"];
var antarcticaTZ = ["Antarctica/Casey", "Antarctica/Davis", "Antarctica/DumontDUrville", "Antarctica/Macquarie", "Antarctica/Mawson", "Antarctica/McMurdo", "Antarctica/Palmer",
					"Antarctica/Rothera", "Antarctica/South_Pole", "Antarctica/Syowa", "Antarctica/Troll", "Antarctica/Vostok"];

var arctic = ["Longyearbyen"];
var arcticTZ = ["Arctic/Longyearbyen"];

var asia = ["Aden", "Almaty", "Amman", "Anadyr", "Aqtau", "Aqtobe", "Ashgabat", "Ashkhabad", "Atyrau", "Baghdad", "Bahrain", "Baku", "Bangkok", "Barnaul", "Beirut", "Bishkek", 
			"Brunei", "Calcutta", "Chita", "Choibalsan", "Chongqing", "Chungking", "Colombo", "Dacca", "Damascus", "Dhaka", "Dili", "Dubai", "Dushanbe", "Famagusta", "Gaza", 
			"Harbin", "Hebron", "Ho Chi Minh", "Hong Kong", "Hovd", "Irkutsk", "Istanbul", "Jakarta", "Jayapura", "Jerusalem", "Kabul", "Kamchatka", "Karachi", "Kashgar", "Kathmandu", 
			"Katmandu", "Khandyga", "Kolkata", "Krasnoyarsk", "Kuala Lumpur", "Kuching", "Kuwait", "Macao", "Macau", "Magadan", "Makassar", "Manila", "Muscat", "Nicosia", "Novokuznetsk",
			"Novosibirsk", "Omsk", "Oral", "Phnom Penh", "Pontianak", "Pyongyang", "Qatar", "Qyzylorda", "Rangoon", "Riyadh", "Saigon", "Sakhalin", "Samarkand", "Seoul", "Shanghai", 
			"Singapore", "Srednekolymsk", "Taipei", "Tashkent", "Tbilisi", "Tehran", "Tel Aviv", "Thimbu", "Thimphu", "Tokyo", "Tomsk", "Ujung Pandang", "Ulaanbaatar", "Ulan Bator",
			"Urumqi", "Ust-Nera", "Vientiane", "Vladivostok", "Yakutsk", "Yangon", "Yekaterinburg", "Yerevan"];
var asiaTZ = ["Asia/Aden", "Asia/Almaty", "Asia/Amman", "Asia/Anadyr", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Atyrau", "Asia/Baghdad", "Asia/Bahrain", 
			  "Asia/Baku", "Asia/Bangkok", "Asia/Barnaul", "Asia/Beirut", "Asia/Bishkek", "Asia/Brunei", "Asia/Calcutta", "Asia/Chita", "Asia/Choibalsan", "Asia/Chongqing", 
			  "Asia/Chungking", "Asia/Colombo", "Asia/Dacca", "Asia/Damascus", "Asia/Dhaka", "Asia/Dili", "Asia/Dubai", "Asia/Dushanbe", "Asia/Famagusta", "Asia/Gaza", "Asia/Harbin", 
			  "Asia/Hebron", "Asia/Ho_Chi_Minh", "Asia/Hong_Kong", "Asia/Hovd", "Asia/Irkutsk", "Asia/Istanbul", "Asia/Jakarta", "Asia/Jayapura", "Asia/Jerusalem", "Asia/Kabul", 
			  "Asia/Kamchatka", "Asia/Karachi", "Asia/Kashgar", "Asia/Kathmandu", "Asia/Katmandu", "Asia/Khandyga", "Asia/Kolkata", "Asia/Krasnoyarsk", "Asia/Kuala_Lumpur", "Asia/Kuching", 
			  "Asia/Kuwait", "Asia/Macao", "Asia/Macau", "Asia/Magadan", "Asia/Makassar", "Asia/Manila", "Asia/Muscat", "Asia/Nicosia", "Asia/Novokuznetsk", "Asia/Novosibirsk", 
			  "Asia/Omsk", "Asia/Oral", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Pyongyang", "Asia/Qatar", "Asia/Qyzylorda", "Asia/Rangoon", "Asia/Riyadh", "Asia/Saigon", "Asia/Sakhalin", 
			  "Asia/Samarkand", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Srednekolymsk", "Asia/Taipei", "Asia/Tashkent", "Asia/Tbilisi", "Asia/Tehran", "Asia/Tel_Aviv", 
			  "Asia/Thimbu", "Asia/Thimphu", "Asia/Tokyo", "Asia/Tomsk", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Asia/Urumqi", "Asia/Ust-Nera", "Asia/Vientiane", 
			  "Asia/Vladivostok", "Asia/Yakutsk", "Asia/Yangon", "Asia/Yekaterinburg", "Asia/Yerevan"];

var atlantic = ["Azores", "Bermuda", "Canary", "Cape Verde", "Faeroe", "Faroe", "Jan Mayen", "Madeira", "Reykjavik", "South Georgia", "St Helena", "Stanley"];
var atlanticTZ = ["Atlantic/Azores", "Atlantic/Bermuda", "Atlantic/Canary", "Atlantic/Cape_Verde", "Atlantic/Faeroe", "Atlantic/Faroe", "Atlantic/Jan_Mayen", "Atlantic/Madeira",
				  "Atlantic/Reykjavik", "Atlantic/South_Georgia", "Atlantic/St_Helena", "Atlantic/Stanley"];

var australia = ["ACT", "Adelaide", "Brisbane", "Broken Hill", "Canberra", "Currie", "Darwin", "Eucla", "Hobart", "LHI", "Lindeman", "Lord Howe", "Melbourne", "NSW", "North", 
				 "Perth", "Queensland", "South", "Sydney", "Tasmania", "Victoria", "West", "Yancowinna"];
var australiaTZ = ["Australia/ACT", "Australia/Adelaide", "Australia/Brisbane", "Australia/Broken_Hill", "Australia/Canberra", "Australia/Currie", "Australia/Darwin", "Australia/Eucla", 
				   "Australia/Hobart", "Australia/LHI", "Australia/Lindeman", "Australia/Lord_Howe", "Australia/Melbourne", "Australia/NSW", "Australia/North", "Australia/Perth", 
				   "Australia/Queensland", "Australia/South", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Australia/West", "Australia/Yancowinna"];

var brazil = ["Acre", "DeNoronha", "East", "West"];
var brazilTZ = ["Brazil/Acre", "Brazil/DeNoronha", "Brazil/East", "Brazil/West"];

var canada = ["Atlantic", "Central", "Eastern", "Mountain", "Newfoundland", "Pacific", "Saskatchewan", "Yukon"];
var canadaTZ = ["Canada/Atlantic", "Canada/Central", "Canada/Eastern", "Canada/Mountain", "Canada/Newfoundland", "Canada/Pacific", "Canada/Saskatchewan", "Canada/Yukon"];

var chile = ["Continental", "EasterIsland"];
var chileTZ = ["Chile/Continental", "Chile/EasterIsland"];

var europe = ["Amsterdam", "Andorra", "Astrakhan", "Athens", "Belfast", "Belgrade", "Berlin", "Bratislava", "Brussels", "Bucharest", "Budapest", "Busingen", "Chisinau", "Copenhagen", "Dublin", 
              "Gibraltar", "Guernsey", "Helsinki", "Isle of Man", "Istanbul", "Jersey", "Kaliningrad", "Kiev", "Kirov", "Lisbon", "Ljubljana", "London", "Luxembourg", "Madrid", "Malta", "Mariehamn", 
			  "Minsk", "Monaco", "Moscow", "Nicosia", "Oslo", "Paris", "Podgorica", "Prague", "Riga", "Rome", "Samara", "San Marino", "Sarajevo", "Saratov", "Simferopol", "Skopje", "Sofia", "Stockholm", 
			  "Tallinn", "Tirane", "Tiraspol", "Ulyanovsk", "Uzhgorod", "Vaduz", "Vatican", "Vienna", "Vilnius", "Volgograd", "Warsaw", "Zagreb", "Zaporozhye", "Zurich"];
var europeTZ = ["Europe/Amsterdam", "Europe/Andorra", "Europe/Astrakhan", "Europe/Athens", "Europe/Belfast", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Bucharest", 
				"Europe/Budapest", "Europe/Busingen", "Europe/Chisinau", "Europe/Copenhagen", "Europe/Dublin", "Europe/Gibraltar", "Europe/Guernsey", "Europe/Helsinki", "Europe/Isle_of_Man", "Europe/Istanbul", 
				"Europe/Jersey", "Europe/Kaliningrad", "Europe/Kiev", "Europe/Kirov", "Europe/Lisbon", "Europe/Ljubljana", "Europe/London", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", 
				"Europe/Mariehamn", "Europe/Minsk", "Europe/Monaco", "Europe/Moscow", "Europe/Nicosia", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Riga", "Europe/Rome", 
				"Europe/Samara", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Saratov", "Europe/Simferopol", "Europe/Skopje", "Europe/Sofia", "Europe/Stockholm", "Europe/Tallinn", "Europe/Tirane", 
				"Europe/Tiraspol", "Europe/Ulyanovsk", "Europe/Uzhgorod", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Vilnius", "Europe/Volgograd", "Europe/Warsaw", "Europe/Zagreb", 
				"Europe/Zaporozhye", "Europe/Zurich"];

var indian = ["Antananarivo", "Chagos", "Christmas", "Cocos", "Comoro", "Kerguelen", "Mahe", "Maldives", "Mauritius", "Mayotte", "Reunion"];
var indianTZ = ["Indian/Antananarivo", "Indian/Chagos", "Indian/Christmas", "Indian/Cocos", "Indian/Comoro", "Indian/Kerguelen", "Indian/Mahe", "Indian/Maldives", "Indian/Mauritius", "Indian/Mayotte", 
				"Indian/Reunion"]

var mexico = ["BajaNorte", "BajaSur", "General"];
var mexicoTZ = ["Mexico/BajaNorte", "Mexico/BajaSur", "Mexico/General"];

var pacific = ["Apia", "Auckland", "Bougainville", "Chatham", "Chuuk", "Easter", "Efate", "Enderbury", "Fakaofo", "Fiji", "Funafuti", "Galapagos", "Gambier", "Guadalcanal", "Guam", "Honolulu", "Johnston", 
			   "Kiritimati", "Kosrae", "Kwajalein", "Majuro", "Marquesas", "Midway", "Nauru", "Niue", "Norfolk", "Noumea", "Pago Pago", "Palau", "Pitcairn", "Pohnpei", "Ponape", "Port Moresby", 
			   "Rarotonga", "Saipan", "Samoa", "Tahiti", "Tarawa", "Tongatapu", "Truk", "Wake", "Wallis", "Yap"];
var pacificTZ = ["Pacific/Apia", "Pacific/Auckland", "Pacific/Bougainville", "Pacific/Chatham", "Pacific/Chuuk", "Pacific/Easter", "Pacific/Efate", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Fiji", 
				 "Pacific/Funafuti", "Pacific/Galapagos", "Pacific/Gambier", "Pacific/Guadalcanal", "Pacific/Guam", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Kiritimati", "Pacific/Kosrae", 
				 "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Marquesas", "Pacific/Midway", "Pacific/Nauru", "Pacific/Niue", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pago_Pago", "Pacific/Palau", 
				 "Pacific/Pitcairn", "Pacific/Pohnpei", "Pacific/Ponape", "Pacific/Port_Moresby", "Pacific/Rarotonga", "Pacific/Saipan", "Pacific/Samoa", "Pacific/Tahiti", "Pacific/Tarawa", 
				 "Pacific/Tongatapu", "Pacific/Truk", "Pacific/Wake", "Pacific/Wallis", "Pacific/Yap"];

var us = ["Alaska", "Aleutian", "Arizona", "Central", "East-Indiana", "Eastern", "Hawaii", "Indiana-Starke", "Michigan", "Mountain", "Pacific", "Pacific-New", "Samoa"];
var usTZ = ["US/Alaska", "US/Aleutian", "US/Arizona", "US/Central", "US/East-Indiana", "US/Eastern", "US/Hawaii", "US/Indiana-Starke", "US/Michigan", "US/Mountain", "US/Pacific", "US/Pacific-New", 
			"US/Samoa"];
			
var counter = 0;
var divID = "timerdiv";
var rtzID = "regionTZ";
var srtzID = "subregionTZ";

function addTimer() {
	var par = $(event.target).parent();
	var divid = par.parent().attr('id');
	par.remove();
	document.getElementById(divid).style.lineHeight = 0;
	populateSelectionMenu(divid);
}
function removeTimer() {
	var par = $(event.target).parent().parent();
	var divid = par.attr('id');
	var temp = parseInt(divid.charAt(divid.length-1));
	allTimeZones[temp] = "none";
	tzStrings[temp] = "none";
	Cookies.set('userTimeZones', allTimeZones.join('|'), {expires: 10});
	Cookies.set('userCities', tzStrings.join('|'), {expires: 10});
	document.getElementById(divid).innerHTML = "<button class=\"addbutton\" onclick=addTimer()><i class=\"fa fa-plus-circle fa-lg\" aria-hidden=\"true\" style=\"color: #FDA92C;\"></i></button>";
	document.getElementById(divid).style.backgroundColor="#333";
	document.getElementById(divid).style.lineHeight = 11;
}
function populateSelectionMenu(divid) {
	document.getElementById(divid).innerHTML = "<div id=\"" + divID + counter + "\">" + "<select class=\"" + rtzID + counter + "\" style=\"width: 100%; visibility: hidden;\" id=\"" + rtzID + counter + "\"></select><select class=\"" + srtzID + counter + "\" style=\"width: 100%; visibility: hidden;\" id=\"" + srtzID + counter + "\"></select></div>";
	populateMenu(divid, divID + counter, rtzID + counter, srtzID + counter);
	counter++;
}

function populateMenu(td, d, r, sr) {
	regionHTML = "<option></option>";
	for(var index = 0; index < regions.length; index++) {
		regionHTML += "<option value=\"" + regions[index] + "\">" + regions[index] + "</option>";
	}
	document.getElementById(r).innerHTML = regionHTML;
	$(document).ready(function() {
		$('.' + r).select2({
			theme: "classic"
		});
	});
	var subregion = "";
	$('#' + r).change(function(){ 
		subregion = $(this).val();
		subregionHTML = "<option></option>";
		if(subregion == "Africa"){
			for(var index = 0; index < africa.length; index++) {
				subregionHTML += "<option value=\"" + africa[index] + "\">" + africa[index] + "</option>";
			}
		}
		else if(subregion == "America"){
			for(var index = 0; index < america.length; index++) {
				subregionHTML += "<option value=\"" + america[index] + "\">" + america[index] + "</option>";
			}
		}
		else if(subregion == "Antarctica"){
			for(var index = 0; index < antarctica.length; index++) {
				subregionHTML += "<option value=\"" + antarctica[index] + "\">" + antarctica[index] + "</option>";
			}
		}
		else if(subregion == "Arctic"){
			for(var index = 0; index < arctic.length; index++) {
				subregionHTML += "<option value=\"" + arctic[index] + "\">" + arctic[index] + "</option>";
			}
		}
		else if(subregion == "Asia"){
			for(var index = 0; index < asia.length; index++) {
				subregionHTML += "<option value=\"" + asia[index] + "\">" + asia[index] + "</option>";
			}
		}
		else if(subregion == "Atlantic"){
			for(var index = 0; index < atlantic.length; index++) {
				subregionHTML += "<option value=\"" + atlantic[index] + "\">" + atlantic[index] + "</option>";
			}
		}
		else if(subregion == "Australia"){
			for(var index = 0; index < australia.length; index++) {
				subregionHTML += "<option value=\"" + australia[index] + "\">" + australia[index] + "</option>";
			}
		}
		else if(subregion == "Brazil"){
			for(var index = 0; index < brazil.length; index++) {
				subregionHTML += "<option value=\"" + brazil[index] + "\">" + brazil[index] + "</option>";
			}
		}
		else if(subregion == "Canada"){
			for(var index = 0; index < canada.length; index++) {
				subregionHTML += "<option value=\"" + canada[index] + "\">" + canada[index] + "</option>";
			}
		}
		else if(subregion == "Chile"){
			for(var index = 0; index < chile.length; index++) {
				subregionHTML += "<option value=\"" + chile[index] + "\">" + chile[index] + "</option>";
			}
		}
		else if(subregion == "Europe"){
			for(var index = 0; index < europe.length; index++) {
				subregionHTML += "<option value=\"" + europe[index] + "\">" + europe[index] + "</option>";
			}
		}
		else if(subregion == "Indian"){
			for(var index = 0; index < indian.length; index++) {
				subregionHTML += "<option value=\"" + indian[index] + "\">" + indian[index] + "</option>";
			}
		}
		else if(subregion == "Mexico"){
			for(var index = 0; index < mexico.length; index++) {
				subregionHTML += "<option value=\"" + mexico[index] + "\">" + mexico[index] + "</option>";
			}
		}
		else if(subregion == "Pacific"){
			for(var index = 0; index < pacific.length; index++) {
				subregionHTML += "<option value=\"" + pacific[index] + "\">" + pacific[index] + "</option>";
			}
		}
		else if(subregion == "US"){
			for(var index = 0; index < us.length; index++) {
				subregionHTML += "<option value=\"" + us[index] + "\">" + us[index] + "</option>";
			}
		}
		else {
			console.log("Error while parsing selected subregion");
		}
		document.getElementById(sr).innerHTML = subregionHTML;
		document.getElementById(sr).style.visibility = 'visible';
		$(document).ready(function() {
			$('.' + sr).select2({
				theme: "classic"
			});
		});
	});
	$('#' + sr).change(function(){
		if(subregion == "Africa") {
			var temp = $(this).val()
			var tz = africaTZ[africa.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}
		else if(subregion == "America") {
			var temp = $(this).val()
			var tz = americaTZ[america.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Antarctica") {
			var temp = $(this).val()
			var tz = antarcticaTZ[antarctica.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Arctic") {
			var temp = $(this).val()
			var tz = arcticTZ[arctic.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Asia") {
			var temp = $(this).val()
			var tz = asiaTZ[asia.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Atlantic") {
			var temp = $(this).val()
			var tz = atlanticTZ[atlantic.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Australia") {
			var temp = $(this).val()
			var tz = australiaTZ[australia.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Brazil") {
			var temp = $(this).val()
			var tz = brazilTZ[brazil.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}		
		else if(subregion == "Canada") {
			var temp = $(this).val()
			var tz = canadaTZ[canada.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Chile") {
			var temp = $(this).val()
			var tz = chileTZ[chile.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Europe") {
			var temp = $(this).val()
			var tz = europeTZ[europe.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Indian") {
			var temp = $(this).val()
			var tz = indianTZ[indian.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Mexico") {
			var temp = $(this).val()
			var tz = mexicoTZ[mexico.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "Pacific") {
			var temp = $(this).val()
			var tz = pacificTZ[pacific.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else if(subregion == "US") {
			var temp = $(this).val()
			var tz = usTZ[us.findIndex(x => x === temp)];
			document.getElementById(d).remove();
			updateDivTimer(td, tz, temp);
			document.getElementById(td).style.lineHeight = '30px';
		}	
		else {
			console.log("Error while passing selected subregion");
		}
	});
}

var allTimeZones = ["none", "none", "none", "none", "none", "none"];
var timerDivId = ["timer0", "timer1", "timer2", "timer3", "timer4", "timer5"];
var timerDivId0 = ["timer00", "timer10", "timer20", "timer30", "timer40", "timer50"];
var timerDivId1 = ["timer01", "timer11", "timer21", "timer31", "timer41", "timer51"];
var tzStrings = ["none", "none", "none", "none", "none", "none"];
var startTime = "2019-08-03 16:00:00";
var stopTime = "2019-08-03 19:00:00";
updateFromCookies();
function updateFromCookies() {
	var userTimeZones = Cookies.get('userTimeZones');
	var userCities = Cookies.get('userCities');
	if (userTimeZones != undefined) {
		allTimeZones = userTimeZones.split("|");
	}
	if (userCities != undefined) {
		tzStrings = userCities.split("|");
	}
	for (var index=0; index<allTimeZones.length; index++) {
		if(allTimeZones[index] != "none") {
			updateDivTimer("timer" + index.toString(), allTimeZones[index], tzStrings[index]);
			document.getElementById("timer" + index.toString()).style.lineHeight = '30px';
		}
	}
}
function updateDivTimer(td, tz, sr) {
	var temp = parseInt(td.charAt(td.length-1));
	allTimeZones[temp] = tz;
	tzStrings[temp] = sr;
	document.getElementById(td).innerHTML = "<button class=\"addbutton\" onclick=removeTimer() style=\"float: right;\"><i class=\"fa fa-window-close fa-lg\" aria-hidden=\"true\" style=\"color: #FF0000;\"></i></button><div id=\""+ timerDivId0[temp] + "\"></div><div id=\"" + timerDivId1[temp] + "\"></div>";
	var eventTime = moment.tz(startTime, allTimeZones[temp]);
	document.getElementById(timerDivId0[temp]).innerHTML = "<div>&nbsp;</div><strong>" + tzStrings[temp] + "</strong><br>Event starts at: " + eventTime.local().format("YYYY-MM-DD HH:mm:ss") + " " + moment.tz(moment.tz.guess()).zoneAbbr();
	Cookies.set('userTimeZones', allTimeZones.join('|'), {expires: 10});
	Cookies.set('userCities', tzStrings.join('|'), {expires: 10});
}
countdownTimer();
function countdownTimer() {
	var now = moment.utc();
	var distance = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	continueTimer();
	function continueTimer() {
		now = moment();
		for (var cnt = 0; cnt < allTimeZones.length; cnt++) {
			if(allTimeZones[cnt] != "none") {
				var eventStartTime = moment.tz(startTime, allTimeZones[cnt]);
				var eventStopTime = moment.tz(stopTime, allTimeZones[cnt]);
				distance = eventStartTime.unix() - now.unix();
				if (distance >= 0) {
					days = Math.floor(distance / (60 * 60 * 24));
					hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
					minutes = Math.floor((distance % (60 * 60)) / (60));
					seconds = Math.floor((distance % (60)) / 1);
					document.getElementById(timerDivId1[cnt]).innerHTML = "Event begins in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";		
				}
				if (distance < 0 && distance >= eventStartTime.unix() - eventStopTime.unix()) {
					document.getElementById(timerDivId[cnt]).style.backgroundColor="#68C6FF";
					distance = eventStopTime.unix() - now.unix();
					days = Math.floor(distance / (60 * 60 * 24));
					hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
					minutes = Math.floor((distance % (60 * 60)) / (60));
					seconds = Math.floor((distance % (60)) / 1);
					document.getElementById(timerDivId1[cnt]).innerHTML = "Event in progress<br> Event ends in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
				}
				if (distance < eventStartTime.unix() - eventStopTime.unix()) {
					document.getElementById(timerDivId[cnt]).style.backgroundColor="#DDDDDD";
					document.getElementById(timerDivId1[cnt]).innerHTML = "Event has ended";
				}
			}
		}
		setTimeout(continueTimer, 1000);
	}
}
