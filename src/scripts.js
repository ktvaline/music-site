var audio = new Audio('audio/ground-speed.mp4');

var audioState = false;

function playMusic() {

	if (!audioState) {
		audio.play();
		audioState = true;
		document.getElementById("play-button").src = "images/pause.png";
		document.getElementById("now-playing").innerHTML = "Ground Speed";
		
		
	} else {
		audio.pause();
		audioState = false;
		document.getElementById("play-button").src = "images/play.png";
		document.getElementById("now-playing").innerHTML = "Press Play...";
	}	
	
	audio.onended = function() {
		audioState = false;
		document.getElementById("play-button").src = "images/play.png";
		document.getElementById("now-playing").innerHTML = "Press Play...";
	};
	
	
    
	
}
