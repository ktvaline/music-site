var audio = new Audio('audio/ground-speed.mp4');

var audioState = false;

var audioIndex = 0;

var songs = [
	
	{"file": "ground-speed.mp4", "name": "Ground Speed"},
	{"file": "the-chase-continues.mp4", "name": "The Chase Continues"},
	{"file": "dizzy-fingers.m4a", "name": "Dizzy Fingers"}
]

var listElements = [];

function drawList() {
	
	var play = document.getElementById("play-button")
	play.onmouseover =  function() { 
       this.style.opacity="0.9"; 
	};
		
	play.onmouseout =  function() { 
       this.style.opacity="1"; 
	};
		

	for (i = 0; i < songs.length; i++) {
	
		var ul = document.getElementById("ul-music-list")
		var li = document.createElement("li");
		var div = document.createElement("div");
		
		div.id = "list-element";
		
		listElements.push(li);
		
		div.appendChild(document.createTextNode(songs[i]["name"]));
		li.appendChild(div);
		
		if (i == 0) {
			li.style.backgroundColor = "#ddddde"
			
		}
		
		li.onclick = function() { 
			
			
			for (i = 0; i < songs.length; i++) {
					
				if (songs[i]["name"] == this.textContent) {
					this.style.backgroundColor = "#ddddde"
					//alert("audio/" + songs[i]["file"]);
					audio.src = "audio/" + songs[i]["file"];
					audio.load();
					audio.play();
					
					audio.onended = function() {
						audioState = false;
						document.getElementById("play-button").src = "images/play.png";
						document.getElementById("now-playing").innerHTML = "Now wasn't that awesome?";
					};
					audioState = true;
					document.getElementById("play-button").src = "images/pause.png";
					document.getElementById("now-playing").innerHTML = songs[i]["name"];
					audioIndex = i;
				} else {
					listElements[i].style.backgroundColor = null;
				}
			}
		};
		
		li.onmouseover =  function() { 

          this.style.opacity="0.5"; 
		};
		
		li.onmouseout =  function() { 

           this.style.opacity="1"; 
		};
		
		ul.appendChild(li);
		
	}
}

function playMusic() {

	if (!audioState) {
		audio.play();
		audioState = true;
		document.getElementById("play-button").src = "images/pause.png";
		document.getElementById("now-playing").innerHTML = songs[audioIndex]["name"];
		
		
	} else {
		audio.pause();
		audioState = false;
		document.getElementById("play-button").src = "images/play.png";

	}	
	
	audio.onended = function() {
		audioState = false;
		document.getElementById("play-button").src = "images/play.png";
		document.getElementById("now-playing").innerHTML = "Now wasn't that awesome?";
	};
	
}
