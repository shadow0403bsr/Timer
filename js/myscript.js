
 timerinit();
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
function timerinit()
{
  // instantiate a moment object
  //gray after expiration 6D6D6D and green during event progress 34992A for css style
  var NowMoment = moment();
	
  // display value of moment object in #displayMoment div
  var now = moment();
  function time() {
  var now = moment();
  document.getElementById("displayMoment").innerHTML = moment.tz.guess() +"-" + moment.tz(moment.tz.guess()).zoneAbbr() + "<br>" + now.format("DD-MM-YYYY") + "<br>" + now.format("HH:mm:ss");
  setTimeout(time, 1000);
  }
  time();  

  var startAuckland = moment.tz("2019-03-21 06:30", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland");
  var stopAuckland1 = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland");
  var stopAuckland3 = moment.tz("2019-03-23 16:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland");
  var stopAuckland5 = moment.tz("2019-03-23 17:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Auckland");
  document.getElementById("startAucklandToLocal1").innerHTML = "Event starts at: <br>" + startAuckland.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startAucklandToLocal3").innerHTML = "Event starts at: <br>" + startAuckland.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startAucklandToLocal5").innerHTML = "Event starts at: <br>" + startAuckland.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterAuckland() {
  var now = moment.utc();
  var distance1 = startAuckland.unix() - now.unix();
  var distance3 = startAuckland.unix() - now.unix();
  var distance5 = startAuckland.unix() - now.unix();
  if (distance1 >= 0) {
    var days = Math.floor(distance1 / (60 * 60 * 24));
    var hours = Math.floor((distance1 % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance1 % (60 * 60)) / (60));
    var seconds = Math.floor((distance1 % (60)) / 1);
    document.getElementById("timerAuckland1").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterAuckland, 1000);
  }
  if (distance1==-1) {
	  console.log(1);
    globalConfetti();
  }
  if (distance1 < 0 && distance1 >= startAuckland.unix() - stopAuckland1.unix()) {
    var div = document.getElementById("11");
    div.style.backgroundColor="#34992A";
	distance1 = stopAuckland1.unix() - now.unix();
	var days = Math.floor(distance1 / (60 * 60 * 24));
    var hours = Math.floor((distance1 % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance1 % (60 * 60)) / (60));
    var seconds = Math.floor((distance1 % (60)) / 1);
	document.getElementById("timerAuckland1").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterAuckland, 1000);
  }
  if (distance1 < startAuckland.unix() - stopAuckland1.unix()) {
    var div = document.getElementById("11");
    div.style.backgroundColor="#6D6D6D";
	document.getElementById("timerAuckland1").innerHTML = "Event has ended";
  }
  if (distance3 >= 0) {
	    var days = Math.floor(distance3 / (60 * 60 * 24));
	    var hours = Math.floor((distance3 % (60 * 60 * 24)) / (60 * 60));
	    var minutes = Math.floor((distance3 % (60 * 60)) / (60));
	    var seconds = Math.floor((distance3 % (60)) / 1);
	    document.getElementById("timerAuckland3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
		setTimeout(counterAuckland, 1000);
	  }
	  if (distance3==-1) {
	    globalConfetti();
	  }
	  if (distance3 < 0 && distance3 >= startAuckland.unix() - stopAuckland3.unix()) {
		var div = document.getElementById("31");
	    div.style.backgroundColor="#34992A";
		distance3 = stopAuckland3.unix() - now.unix();
		var days = Math.floor(distance3 / (60 * 60 * 24));
	    var hours = Math.floor((distance3 % (60 * 60 * 24)) / (60 * 60));
	    var minutes = Math.floor((distance3 % (60 * 60)) / (60));
	    var seconds = Math.floor((distance3 % (60)) / 1);
		document.getElementById("timerAuckland3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
		setTimeout(counterAuckland, 1000);
	  }
	  if (distance3 < startAuckland.unix() - stopAuckland3.unix()) {
		var div = document.getElementById("31");
	    div.style.backgroundColor="#6D6D6D";
		document.getElementById("timerAuckland3").innerHTML = "Event has ended";
	  }
	  if (distance5 >= 0) {
		    var days = Math.floor(distance5 / (60 * 60 * 24));
		    var hours = Math.floor((distance5 % (60 * 60 * 24)) / (60 * 60));
		    var minutes = Math.floor((distance5 % (60 * 60)) / (60));
		    var seconds = Math.floor((distance5 % (60)) / 1);
		    document.getElementById("timerAuckland5").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
			setTimeout(counterAuckland, 1000);
		  }
		  if (distance5==-1) {
		    globalConfetti();
		  }
		  if (distance5 < 0 && distance5 >= startAuckland.unix() - stopAuckland5.unix()) {
			var div = document.getElementById("51");
		    div.style.backgroundColor="#34992A";
			distance5 = stopAuckland5.unix() - now.unix();
			var days = Math.floor(distance5 / (60 * 60 * 24));
		    var hours = Math.floor((distance5 % (60 * 60 * 24)) / (60 * 60));
		    var minutes = Math.floor((distance5 % (60 * 60)) / (60));
		    var seconds = Math.floor((distance5 % (60)) / 1);
			document.getElementById("timerAuckland5").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
			setTimeout(counterAuckland, 1000);
		  }
		  if (distance5 < startAuckland.unix() - stopAuckland5.unix()) {
			var div = document.getElementById("51");
		    div.style.backgroundColor="#6D6D6D";
			document.getElementById("timerAuckland5").innerHTML = "Event has ended";
		  }
}
  counterAuckland();  
  
  var startPerth = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Perth");
  var stopPerth = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Perth");
  document.getElementById("startPerthToLocal1").innerHTML = "Event starts at: <br>" + startPerth.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterPerth() {
  var now = moment.utc();
  var distance = startPerth.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerPerth1").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterPerth, 1000);
  }
  if (distance < 0 && distance >= startPerth.unix() - stopPerth.unix()) {
    var div = document.getElementById("1");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerPerth1").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterPerth, 1000);
  }
  if (distance < startPerth.unix() - stopPerth.unix()) {
	var div = document.getElementById("1");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerPerth1").innerHTML = "Event has ended";
  }
}
  counterPerth(); 
  
  var startMoscow = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow");
  var stopMoscow = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Moscow");
  document.getElementById("startMoscowToLocal1").innerHTML = "Event starts at: <br>" + startMoscow.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startMoscowToLocal5").innerHTML = "Event starts at: <br>" + startMoscow.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterMoscow() {
  var now = moment.utc();
  var distance = startMoscow.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerMoscow1").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerMoscow5").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterMoscow, 1000);
  }
  if (distance < 0 && distance >= startMoscow.unix() - stopMoscow.unix()) {
	var div = document.getElementById("13");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("53");
    div.style.backgroundColor="#34992A";
	distance = stopMoscow.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerMoscow1").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerMoscow5").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterMoscow, 1000);
  }
  if (distance < startMoscow.unix() - stopMoscow.unix()) {
	var div = document.getElementById("13");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("53");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerMoscow1").innerHTML = "Event has ended";
	document.getElementById("timerMoscow5").innerHTML = "Event has ended";
  }
}
  counterMoscow();  
  
  var startSaoPaulo = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo");
  var stopSaoPaulo = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Sao_Paulo");
  document.getElementById("startSaoPauloToLocal1").innerHTML = "Event starts at: <br>" + startSaoPaulo.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startSaoPauloToLocal2").innerHTML = "Event starts at: <br>" + startSaoPaulo.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startSaoPauloToLocal5").innerHTML = "Event starts at: <br>" + startSaoPaulo.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterSaoPaulo() {
  var now = moment.utc();
  var distance = startSaoPaulo.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerSaoPaulo1").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerSaoPaulo2").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerSaoPaulo5").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSaoPaulo, 1000);
  }
  if (distance < 0 && distance >= startSaoPaulo.unix() - stopSaoPaulo.unix()) {
	var div = document.getElementById("14");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("24");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("54");
    div.style.backgroundColor="#34992A";
	distance = stopSaoPaulo.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerSaoPaulo1").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerSaoPaulo2").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerSaoPaulo5").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSaoPaulo, 1000);
  }
  if (distance < startSaoPaulo.unix() - stopSaoPaulo.unix()) {
	var div = document.getElementById("14");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("24");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("54");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerSaoPaulo1").innerHTML = "Event has ended";
	document.getElementById("timerSaoPaulo2").innerHTML = "Event has ended";
	document.getElementById("timerSaoPaulo5").innerHTML = "Event has ended";
  }
}
  counterSaoPaulo();  
  
  var startAnchorage = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage");
  var stopAnchorage = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Anchorage");
  document.getElementById("startAnchorageToLocal1").innerHTML = "Event starts at: <br>" + startAnchorage.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startAnchorageToLocal2").innerHTML = "Event starts at: <br>" + startAnchorage.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startAnchorageToLocal5").innerHTML = "Event starts at: <br>" + startAnchorage.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterAnchorage() {
  var now = moment.utc();
  var distance = startAnchorage.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerAnchorage1").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerAnchorage2").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerAnchorage5").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterAnchorage, 1000);
  }
  if (distance < 0 && distance >= startAnchorage.unix() - stopAnchorage.unix()) {
	var div = document.getElementById("15");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("25");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("55");
    div.style.backgroundColor="#34992A";
	distance = stopAnchorage.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerAnchoarge1").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerAnchoarge2").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerAnchoarge5").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterAnchorage, 1000);
  }
  if (distance < startAnchorage.unix() - stopAnchorage.unix()) {
	var div = document.getElementById("15");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("25");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("55");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerAnchorage1").innerHTML = "Event has ended";
	document.getElementById("timerAnchorage2").innerHTML = "Event has ended";
	document.getElementById("timerAnchorage5").innerHTML = "Event has ended";	
  }
}
  counterAnchorage(); 
  
  var startSuva = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Fiji");
  var stopSuva = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Fiji");
  document.getElementById("startSuvaToLocal2").innerHTML = "Event starts at: <br>" + startSuva.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterSuva() {
  var now = moment.utc();
  var distance = startSuva.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerSuva2").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSuva, 1000);
  }
  if (distance < 0 && distance >= startSuva.unix() - stopSuva.unix()) {
    var div = document.getElementById("21");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerSuva2").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSuva, 1000);
  }
  if (distance < startSuva.unix() - stopSuva.unix()) {
	var div = document.getElementById("21");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerSuva2").innerHTML = "Event has ended";
  }
}
  counterSuva(); 
  
  var startBangkok = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Bangkok");
  var stopBangkok = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Bangkok");
  document.getElementById("startBangkokToLocal2").innerHTML = "Event starts at: <br>" + startBangkok.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterBangkok() {
  var now = moment.utc();
  var distance = startBangkok.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerBangkok2").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBangkok, 1000);
  }
  if (distance < 0 && distance >= startBangkok.unix() - stopBangkok.unix()) {
    var div = document.getElementById("22");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerBangkok2").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBangkok, 1000);
  }
  if (distance < startBangkok.unix() - stopBangkok.unix()) {
	var div = document.getElementById("22");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerBangkok2").innerHTML = "Event has ended";
  }
}
  counterBangkok();
  
  var startHelsinki = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Bucharest");
  var stopHelsinki = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Bucharest");
  document.getElementById("startHelsinkiToLocal2").innerHTML = "Event starts at: <br>" + startHelsinki.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterHelsinki() {
  var now = moment.utc();
  var distance = startHelsinki.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerHelsinki2").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterHelsinki, 1000);
  }
  if (distance < 0 && distance >= startHelsinki.unix() - stopHelsinki.unix()) {
    var div = document.getElementById("23");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerHelsinki2").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterHelsinki, 1000);
  }
  if (distance < startHelsinki.unix() - stopHelsinki.unix()) {
	var div = document.getElementById("23");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerHelsinki2").innerHTML = "Event has ended";
  }
}
  counterHelsinki();
  
  var startBrisbane = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Brisbane");
  var stopBrisbane = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Brisbane");
  document.getElementById("startBrisbaneToLocal3").innerHTML = "Event starts at: <br>" + startBrisbane.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterBrisbane() {
  var now = moment.utc();
  var distance = startBrisbane.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerBrisbane3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBrisbane, 1000);
  }
  if (distance < 0 && distance >= startBrisbane.unix() - stopBrisbane.unix()) {
    var div = document.getElementById("32");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerBrisbane3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBrisbane, 1000);
  }
  if (distance < startBrisbane.unix() - stopBrisbane.unix()) {
	var div = document.getElementById("32");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerBrisbane3").innerHTML = "Event has ended";
  }
}
  counterBrisbane();
  
  var startBangalore = moment.tz("2019-03-23 15:30", "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata");
  var stopBangalore = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Kolkata");
  document.getElementById("startBangaloreToLocal3").innerHTML = "Event starts at: <br>" + startBangalore.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterBangalore() {
  var now = moment.utc();
  var distance = startBangalore.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerBangalore3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBangalore, 1000);
  }
  if (distance < 0 && distance >= startBangalore.unix() - stopBangalore.unix()) {
    var div = document.getElementById("33");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerBangalore3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterBangalore, 1000);
  }
  if (distance < startBangalore.unix() - stopBangalore.unix()) {
	var div = document.getElementById("33");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerBangalore3").innerHTML = "Event has ended";
  }
}
  counterBangalore();
  
  var startLondon = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/London");
  var stopLondon = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/London");
  document.getElementById("startLondonToLocal3").innerHTML = "Event starts at: <br>" + startLondon.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterLondon() {
  var now = moment.utc();
  var distance = startLondon.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerLondon3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterLondon, 1000);
  }
  if (distance < 0 && distance >= startLondon.unix() - stopLondon.unix()) {
    var div = document.getElementById("34");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerLondon3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterLondon, 1000);
  }
  if (distance < startLondon.unix() - stopLondon.unix()) {
	var div = document.getElementById("34");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerLondon3").innerHTML = "Event has ended";
  }
}
  counterLondon();
  
  var startChicago = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/Chicago");
  var stopChicago = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/Chicago");
  document.getElementById("startChicagoToLocal3").innerHTML = "Event starts at: <br>" + startChicago.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterChicago() {
  var now = moment.utc();
  var distance = startChicago.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerChicago3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterChicago, 1000);
  }
  if (distance < 0 && distance >= startChicago.unix() - stopChicago.unix()) {
    var div = document.getElementById("35");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerChicago3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterChicago, 1000);
  }
  if (distance < startChicago.unix() - stopChicago.unix()) {
	var div = document.getElementById("35");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerChicago3").innerHTML = "Event has ended";
  }
}
  counterChicago();
  
  var startHonolulu = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu");
  var stopHonolulu = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Pacific/Honolulu");
  document.getElementById("startHonoluluToLocal3").innerHTML = "Event starts at: <br>" + startHonolulu.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  document.getElementById("startHonoluluToLocal4").innerHTML = "Event starts at: <br>" + startHonolulu.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterHonolulu() {
  var now = moment.utc();
  var distance = startHonolulu.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerHonolulu3").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerHonolulu4").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterHonolulu, 1000);
  }
  if (distance < 0 && distance >= startHonolulu.unix() - stopHonolulu.unix()) {
    var div = document.getElementById("36");
    div.style.backgroundColor="#34992A";
	var div = document.getElementById("45");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerHonolulu3").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	document.getElementById("timerHonolulu4").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterHonolulu, 1000);
  }
  if (distance < startHonolulu.unix() - stopHonolulu.unix()) {
	var div = document.getElementById("36");
    div.style.backgroundColor="#6D6D6D";
	var div = document.getElementById("45");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerHonolulu3").innerHTML = "Event has ended";
	document.getElementById("timerHonolulu4").innerHTML = "Event has ended";
  }
}
  counterHonolulu();
  
  var startSydney = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Australia/Sydney");
  var stopSydney = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Australia/Sydney");
  document.getElementById("startSydneyToLocal4").innerHTML = "Event starts at: <br>" + startSydney.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterSydney() {
  var now = moment.utc();
  var distance = startSydney.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerSydney4").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSydney, 1000);
  }
  if (distance < 0 && distance >= startSydney.unix() - stopSydney.unix()) {
    var div = document.getElementById("41");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerSydney4").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterSydney, 1000);
  }
  if (distance < startSydney.unix() - stopSydney.unix()) {
	var div = document.getElementById("41");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerSydney4").innerHTML = "Event has ended";
  }
}
  counterSydney();
  
  var startDhaka = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Dhaka");
  var stopDhaka = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Dhaka");
  document.getElementById("startDhakaToLocal4").innerHTML = "Event starts at: <br>" + startDhaka.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterDhaka() {
  var now = moment.utc();
  var distance = startDhaka.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerDhaka4").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterDhaka, 1000);
  }
  if (distance < 0 && distance >= startDhaka.unix() - stopDhaka.unix()) {
    var div = document.getElementById("42");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerDhaka4").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterDhaka, 1000);
  }
  if (distance < startDhaka.unix() - stopDhaka.unix()) {
	var div = document.getElementById("42");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerDhaka4").innerHTML = "Event has ended";
  }
}
  counterDhaka();
  
  var startParis = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Europe/Paris");
  var stopParis = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Europe/Paris");
  document.getElementById("startParisToLocal4").innerHTML = "Event starts at: <br>" + startParis.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterParis() {
  var now = moment.utc();
  var distance = startParis.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerParis4").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterParis, 1000);
  }
  if (distance < 0 && distance >= startParis.unix() - stopParis.unix()) {
    var div = document.getElementById("43");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerParis4").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterParis, 1000);
  }
  if (distance < startParis.unix() - stopParis.unix()) {
	var div = document.getElementById("43");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerParis4").innerHTML = "Event has ended";
  }
}
  counterParis();
  
  var startNewYork = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "America/New_York");
  var stopNewYork = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "America/New_York");
  document.getElementById("startNewYorkToLocal4").innerHTML = "Event starts at: <br>" + startNewYork.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterNewYork() {
  var now = moment.utc();
  var distance = startNewYork.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerNewYork4").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterNewYork, 1000);
  }
  if (distance < 0 && distance >= startNewYork.unix() - stopNewYork.unix()) {
    var div = document.getElementById("44");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerNewYork4").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterNewYork, 1000);
  }
  if (distance < startNewYork.unix() - stopNewYork.unix()) {
	var div = document.getElementById("44");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerNewYork4").innerHTML = "Event has ended";
  }
}
  counterNewYork();
  
  var startTokyo = moment.tz("2019-03-23 15:00", "YYYY-MM-DD HH:mm:ss", "Asia/Tokyo");
  var stopTokyo = moment.tz("2019-03-23 18:00", "YYYY-MM-DD HH:mm:ss", "Asia/Tokyo");
  document.getElementById("startTokyoToLocal5").innerHTML = "Event starts at: <br>" + startTokyo.local().format("YYYY-MM-DD HH:mm:ss") + " (Local Time)<br><br>";
  function counterTokyo() {
  var now = moment.utc();
  var distance = startTokyo.unix() - now.unix();
  if (distance >= 0) {
    var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
    document.getElementById("timerTokyo5").innerHTML = "Event begins in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterTokyo, 1000);
  }
  if (distance < 0 && distance >= startTokyo.unix() - stopTokyo.unix()) {
    var div = document.getElementById("52");
    div.style.backgroundColor="#34992A";
	distance = stopPerth.unix() - now.unix();
	var days = Math.floor(distance / (60 * 60 * 24));
    var hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    var minutes = Math.floor((distance % (60 * 60)) / (60));
    var seconds = Math.floor((distance % (60)) / 1);
	document.getElementById("timerTokyo5").innerHTML = "Event in progress<br> Event ends in: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
	setTimeout(counterTokyo, 1000);
  }
  if (distance < startTokyo.unix() - stopTokyo.unix()) {
	var div = document.getElementById("52");
    div.style.backgroundColor="#6D6D6D";
    document.getElementById("timerTokyo5").innerHTML = "Event has ended";
  }
}
  counterTokyo();
  
}