var audio = new Audio('audio/ground-speed.mp4');

var audioState = false;

var audioIndex = 0;

var songs = [
	
	{"file": "ground-speed.mp4", "name": "Ground Speed"},
	{"file": "the-chase-continues.mp4", "name": "The Chase Continues"},
	{"file": "dizzy-fingers.m4a", "name": "Dizzy Fingers"}
]

var navElements = [
	{"name": "Bio", "index":0},
	{"name": "Dates", "index":1},
	{"name": "Photos", "index":2},
	{"name": "Contact", "index":3}
]

var listElements = [];
var navItems = [];

function drawList() {
	
	/// Set up music player 
	///
	///
	///
	
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
	
	
	/// Set up navigation and bio stuff
	///
	///
	///
	
	for (i = 0; i < navElements.length; i++) {
		
		var navBar = document.getElementById("social-links");
		
		var span = document.createElement("span");
		span.className = "social-link";
		span.appendChild(document.createTextNode(navElements[i]["name"]));
		
		if (i == 0) {
			
			span.style.backgroundColor = "#ddddde";
			
		}
		
		navItems.push(span);
		
		span.onclick = function() { 
			
			for (i = 0; i < navElements.length; i++) {
				
				if (navElements[i]["name"] == this.textContent) {
					this.style.backgroundColor = "#ddddde";
					
					var content = document.getElementById("content");
					
					if (i == 0) {
						getText("/bio.html", function(text) {
							content.innerHTML = text;
						});
						
					} else if (i == 1) {
						getText("/dates.html", function(text) {
							content.innerHTML = text;
						});
						
					} else if (i == 2) {
						getText("/photos.html", function(text) {
							content.innerHTML = text;
						});
						
						
					} else if (i == 3) {
						getText("/teaching.html", function(text) {
							content.innerHTML = text;
						});
						
					} else {
						getText("/error.html", function(text) {
							content.innerHTML = text;
						});
					}
				} else {
					navItems[i].style.backgroundColor = null;
				}
			}		
		};
			
		navBar.appendChild(span);
		
	}
}

function getText(file, fn){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', window.location.href + file , true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            
            
            if (type.indexOf("text") !== 1) {
				fn(request.responseText);
                return request.responseText;
            }
        }
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

function sendMail() {
	
	post(window.location.href + "sendmail/", {"name": document.getElementById("name-input").value, "email": document.getElementById("email-input").value, "message": document.getElementById("message-input").value});
	
}

function post(path, params) {
var http = new XMLHttpRequest();

var xhr = new XMLHttpRequest();
xhr.open("POST", path, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    value: params
}));

xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
		
		var node = document.createElement("span");                

		node.innerHTML = "Message Sent Successfully :)"
		
		document.getElementById("success-mail").appendChild(node);
		
		document.getElementById("send").remove();

    }
}

}




