countdownTimer();
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

function globalConfetti() {
    // globals
    var canvas;
    var ctx;
    var W;
    var H;
    var mp = 150; //max particles
    var particles = [];
    var angle = 0;
    var tiltAngle = 0;
    var confettiActive = true;
    var animationComplete = true;
    var deactivationTimerHandler;
    var reactivationTimerHandler;
    var animationHandler;

    // objects
	
    var particleColors = {
        colorOptions: ["DodgerBlue", "OliveDrab", "Gold", "pink", "SlateBlue", "lightblue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"],
        colorIndex: 0,
        colorIncrementer: 0,
        colorThreshold: 10,
        getColor: function () {
            if (this.colorIncrementer >= 10) {
                this.colorIncrementer = 0;
                this.colorIndex++;
                if (this.colorIndex >= this.colorOptions.length) {
                    this.colorIndex = 0;
                }
            }
            this.colorIncrementer++;
            return this.colorOptions[this.colorIndex];
        }
    }

    function confettiParticle(color) {
        this.x = Math.random() * W; // x-coordinate
        this.y = (Math.random() * H) - H; //y-coordinate
        this.r = RandomFromTo(10, 30); //radius;
        this.d = (Math.random() * mp) + 10; //density;
        this.color = color;
        this.tilt = Math.floor(Math.random() * 10) - 10;
        this.tiltAngleIncremental = (Math.random() * 0.07) + .05;
        this.tiltAngle = 0;

        this.draw = function () {
            ctx.beginPath();
            ctx.lineWidth = this.r / 2;
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y);
            ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4));
            return ctx.stroke();
        }
    }

    $(document).ready(function () {
        SetGlobals();
        InitializeButton();
        InitializeConfetti();

        $(window).resize(function () {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        });

    });

    function InitializeButton() {
       setTimeout(DeactivateConfetti, 5000);
    }
	
    function SetGlobals() {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    }

    function InitializeConfetti() {
        particles = [];
        animationComplete = false;
        for (var i = 0; i < mp; i++) {
            var particleColor = particleColors.getColor();
            particles.push(new confettiParticle(particleColor));
        }
        StartConfetti();
    }

    function Draw() {
        ctx.clearRect(0, 0, W, H);
        var results = [];
        for (var i = 0; i < mp; i++) {
            (function (j) {
                results.push(particles[j].draw());
            })(i);
        }
        Update();

        return results;
    }

    function RandomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }


    function Update() {
        var remainingFlakes = 0;
        var particle;
        angle += 0.01;
        tiltAngle += 0.1;

        for (var i = 0; i < mp; i++) {
            particle = particles[i];
            if (animationComplete) return;

            if (!confettiActive && particle.y < -15) {
                particle.y = H + 100;
                continue;
            }

            stepParticle(particle, i);

            if (particle.y <= H) {
                remainingFlakes++;
            }
            CheckForReposition(particle, i);
        }

        if (remainingFlakes === 0) {
            StopConfetti();
        }
    }

    function CheckForReposition(particle, index) {
        if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
            if (index % 5 > 0 || index % 2 == 0) //66.67% of the flakes
            {
                repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 10);
            } else {
                if (Math.sin(angle) > 0) {
                    //Enter from the left
                    repositionParticle(particle, -5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
                } else {
                    //Enter from the right
                    repositionParticle(particle, W + 5, Math.random() * H, Math.floor(Math.random() * 10) - 10);
                }
            }
        }
    }
    function stepParticle(particle, particleIndex) {
        particle.tiltAngle += particle.tiltAngleIncremental;
        particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2;
        particle.x += Math.sin(angle);
        particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15;
    }

    function repositionParticle(particle, xCoordinate, yCoordinate, tilt) {
        particle.x = xCoordinate;
        particle.y = yCoordinate;
        particle.tilt = tilt;
    }

    function StartConfetti() {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        (function animloop() {
            if (animationComplete) return null;
            animationHandler = requestAnimFrame(animloop);
            return Draw();
        })();
    }

    function ClearTimers() {
        clearTimeout(reactivationTimerHandler);
        clearTimeout(animationHandler);
    }

    function DeactivateConfetti() {
        confettiActive = false;
        ClearTimers();
    }

    function StopConfetti() {
        animationComplete = true;
        if (ctx == undefined) return;
        ctx.clearRect(0, 0, W, H);
    }

    function RestartConfetti() {
        ClearTimers();
        StopConfetti();
        reactivationTimerHandler = setTimeout(function () {
            confettiActive = true;
            animationComplete = false;
            InitializeConfetti();
        }, 100);

    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();
}


function countdownTimer() {
	var startTime = [moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Perth"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Fiji"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Bangkok"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Bucharest"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Brisbane"),
					moment.tz("2019-03-23 15:30", "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/London"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Chicago"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Sydney"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Dhaka"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Paris"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/New_York"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Tokyo"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage")];
	var stopTime = [moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Perth"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Fiji"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Bangkok"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Bucharest"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage"),
					moment.tz("2019-03-23 16:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Brisbane"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/London"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Chicago"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Sydney"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Dhaka"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Paris"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/New_York"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu"),
					moment.tz("2019-03-23 17:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Tokyo"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo"),
					moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage")];
	var toLocalID = ["startAucklandToLocal1", "startPerthToLocal1", "startMoscowToLocal1", "startSaoPauloToLocal1", "startAnchorageToLocal1",
					 "startSuvaToLocal2", "startBangkokToLocal2", "startHelsinkiToLocal2", "startSaoPauloToLocal2", "startAnchorageToLocal2",
					 "startAucklandToLocal3", "startBrisbaneToLocal3", "startBangaloreToLocal3", "startLondonToLocal3", "startChicagoToLocal3", "startHonoluluToLocal3",
					 "startSydneyToLocal4", "startDhakaToLocal4", "startParisToLocal4", "startNewYorkToLocal4", "startHonoluluToLocal4",
					 "startAucklandToLocal5", "startTokyoToLocal5", "startMoscowToLocal5", "startSaoPauloToLocal5", "startAnchorageToLocal5"];
	var timerID = ["timerAuckland1", "timerPerth1", "timerMoscow1", "timerSaoPaulo1", "timerAnchorage1",
				   "timerSuva2", "timerBangkok2", "timerHelsinki2", "timerSaoPaulo2", "timerAnchorage2",
				   "timerAuckland3", "timerBrisbane3", "timerBangalore3", "timerLondon3", "timerChicago3", "timerHonolulu3",
				   "timerSydney4", "timerDhaka4", "timerParis4", "timerNewYork4", "timerHonolulu4",
				   "timerAuckland5", "timerTokyo5", "timerMoscow5", "timerSaoPaulo5", "timerAnchorage5"];
	var boxID = ["11", "12", "13", "14", "15", "21", "22", "23", "24", "25", "31", "32", "33", "34", "35", "36", "41", "42", "43", "44", "45", "51", "52", "53", "54", "55"];
	var now = moment.utc();
	var distance = 0;
	var days = 0;
	var hours = 0;
	var minutes = 0;
	var seconds = 0;
	for (var cnt = 0; cnt < startTime.length; cnt++) {
		document.getElementById(toLocalID[cnt]).innerHTML = "Event starts at: <br>" + startTime[cnt].local().format("YYYY-MM-DD HH:mm:ss") + " " + moment.tz(moment.tz.guess()).zoneAbbr();
	}
	continueTimer();
	function continueTimer() {
		now = moment();
		document.getElementById("displayMoment").innerHTML = moment.tz.guess() +"-" + moment.tz(moment.tz.guess()).zoneAbbr() + "<br>" + now.format("DD-MM-YYYY") + "<br>" + now.format("HH:mm:ss");
		for (var cnt = 0; cnt < startTime.length; cnt++) {
			distance = startTime[cnt].unix() - now.unix();
			if (distance >= 0) {
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(timerID[cnt]).innerHTML = "Event begins in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";		
			}
			if (distance == -1) {
				globalConfetti();
			}
			if (distance < 0 && distance >= startTime[cnt].unix() - stopTime[cnt].unix()) {
				document.getElementById(boxID[cnt]).style.backgroundColor="#34992A";
				distance = stopTime[cnt].unix() - now.unix();
				days = Math.floor(distance / (60 * 60 * 24));
				hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
				minutes = Math.floor((distance % (60 * 60)) / (60));
				seconds = Math.floor((distance % (60)) / 1);
				document.getElementById(timerID[cnt]).innerHTML = "Event in progress<br> Event ends in: " + ("0" + days).slice(-2) + "d " + ("0" + hours).slice(-2) + "h " + ("0" + minutes).slice(-2) + "m " + ("0" + seconds).slice(-2) + "s ";
			}
			if (distance < startTime[cnt].unix() - stopTime[cnt].unix()) {
				document.getElementById(boxID[cnt]).style.backgroundColor="#6D6D6D";
				document.getElementById(timerID[cnt]).innerHTML = "Event has ended";
			}
		}
		setTimeout(continueTimer, 1000);
	}
}
