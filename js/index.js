$(document).ready(function(){

	let channel = 1;
	let power = false;
	let powerUp = false;
	let id;
	let videos = []; //Put local address of videos in this array.
	let desArr = []; //Put video descriptions here.
	let timeArr = [];
	const crtOn = new Audio("http://www.jarrodyellets.com/sounds/CRTOn.mp3");
	const crtOff = new Audio("http://www.jarrodyellets.com/sounds/CRTOff.mp3");
	const chSound = new Audio("http://www.jarrodyellets.com/sounds/chSound.mp3");

	$(".power").on("click", function(){
		power = !power;
		$(".power").toggleClass("powerOn");
		if(power){
			crtOn.play();
			powerUp = true;
			videoArr = [];
			$(".channelScreen").append("**");
			$(".screen").addClass("crt");
			startUp();
		} else if(!power){
			crtOn.pause();
      crtOn.currentTime = 0;
			crtOff.play();
			setTimeout(function(){
				turnOff();
			}, 300);
			$(".channelScreen").empty();
			channel = 1;
			timeArr.forEach(function(time){
				clearTimeout(time);
			});
		}
	});

	$("#upButton").on("click", function(){
		chSound.play();
		if(channel < videos.length + 1 && power && !powerUp){
			channel++;
			clearDiv(".channelScreen", channel);
			playVideo();
			console.log()
		}
	});

	$("#downButton").on("click", function(){
		chSound.play();
		if(channel > 1 && power && !powerUp){
			channel--;
			clearDiv(".channelScreen", channel);
			playVideo();
		}
	});

	function startUp(){
		let startImage = "<div class='startImage onScreen'></div>";
		$(".screen").append(startImage);
		timeArr.push(
			setTimeout(function(){
				playVideo();
			}, 6000));
	}

	function playVideo(){
		powerUp = false;
		clearDiv(".channelScreen", channel);
		let now = new Date();
		var time = now.toLocaleTimeString();
		let divString = "";
		if(channel == 1){
			$(".screen").empty();
			for (var j = 0; j < videos.length; j++){
				let channelNum = j + 2;
				divString += "<div class='channelLine'><div class='channelNumber'>"+ channelNum + ". </div><div class='description'>" + desArr[j] + "...</div></div>"
			}
			$(".screen").append("<div class='channelList onScreen'><h4>Channel Guide</h4><div class='channelNumber'>1. Channel Guide</div><div class='time'>" + now.toDateString() + " | " + time +"</div>" + divString);
			$(".screen").append("<div class='channels'>" + channel + ". Channel Guide</div>");
		} else if(channel > 1){
				let iFrame = "<video autoplay class='movie onScreen' src="+ videos[channel - 2] + "></video>";
				$(".screen").empty();
				$(".screen").append(iFrame);
				$(".screen").append("<div class='channels'>" + channel + "</div>");
		}
	}

	function turnOff(){
		$(".onScreen").addClass("turnOff");
		setTimeout(function(){
			$(".screen").empty();
			$(".screen").removeClass("crt");
		}, 275);
	}

	function clearDiv(div, content){
		$(div).empty();
		$(div).append(content);
	}

});