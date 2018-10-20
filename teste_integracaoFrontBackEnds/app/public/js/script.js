
	// Cronometro

	// variables
	var display = document.getElementById("display"),
	start = document.getElementById("start"),
	interval = null,
	status = "stop",
	seconds = 60,
	minutes = 0,
	hours = 0;
 	const _tempo = seconds;
 	var state = false;
  	var seg = 60;
  	var xhttp = new XMLHttpRequest();
  	var matches = 0;

  function resetWatch() {
	window.clearInterval(interval);
	(seconds = 0), (minutes = 0), (hours = 0);
	display.innerHTML = "00:00:00";
	start.innerHTML = "Start";
  }

(function(){
	

	var images = [];

	var flippedCards = [];

	var modalGameOver = document.querySelector("#modalGameOver")

	var imgMatchSign = document.querySelector("#imgMatchSign")

	var status =  " ";
	//document.getElementById("vencer").getAttribute("value");


	for(var i = 0;i < 16; i++){
		var img = {
			src:"img/"+ i +".jpg",
			id: i%8
		};

		images.push(img);
	}
	//console.log(images);
	//console.log(images[0]);
	startGame();
	
	

	function startGame(){

		matches = 0;

		flippedCards = [];

		images = randomSort(images);

		var frontFaces = document.getElementsByClassName("front");
		var backFaces = document.getElementsByClassName("back")

		for(var i = 0; i < 16; i++){
			frontFaces[i].classList.remove("flipped","match");
			backFaces[i].classList.remove("flipped","match");
			var card = document.querySelector("#card"+i);
			//console.log(i % 8)
			card.style.left = i % 8 === 0  ? 5 + "px" : i % 8 * 165 + 5 + "px";
			card.style.top =  i < 8 ? 5 + "px" : 250 + "px";

			card.addEventListener("click",flipCard,false);

			frontFaces[i].style.background = "url('"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
			console.log(frontFaces[i].id);
		}
		modalGameOver.style.zIndex= -2;
		modalGameOver.removeEventListener("click",startGame,false);
		//alert(status.getAttribute("value").toString());
		
		
	}

	function randomSort(oldArray){
		//console.log(Math.floor(Math.random()*11));
		//var arrTeste = ["banana","morango","maça"];
		//console.log(arrTeste.indexOf("banana"));
		var newArray = [];

		while(newArray.length !== oldArray.length){
			var i = Math.floor(Math.random()*oldArray.length);

			if(newArray.indexOf(oldArray[i]) < 0){
				newArray.push(oldArray[i]);

			}

		}

		return newArray;

	}
	
	let time =0;
	function flipCard(){
		
		if(flippedCards.length < 2){
			
			var faces = this.getElementsByClassName("face");

			if (faces[0].classList.length > 2){
				return;
				

			}
		//console.log(faces[0]);
		faces[0].classList.toggle("flipped")
		faces[1].classList.toggle("flipped")
		//console.log(faces[0].classList)
		flippedCards.push(this);

		if(flippedCards.length === 2){
			if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id  ){
				flippedCards[0].childNodes[1].classList.toggle("match");
				flippedCards[0].childNodes[3].classList.toggle("match");
				flippedCards[1].childNodes[1].classList.toggle("match");
				flippedCards[1].childNodes[3].classList.toggle("match");

				matchCardSign();

				matches++;

				flippedCards = [];
				var elapsed = '';
				if((seconds > 0) && (matches === 8)){
					status = "Venceu";
					elapsed = 60-seconds;
					xhttp.open("PUT", "/jogo", true);
					xhttp.setRequestHeader("Content-type", "application/json");
					xhttp.send(JSON.stringify({resultado:status, tempo:elapsed}));
					gameOver();
					
						
				}
				
					if((matches!==8) && (seconds==0)){
						elapsed = 60-seconds;
						status = "Perdeu";
						xhttp.open("PUT", "/jogo", true);
						xhttp.setRequestHeader("Content-type", "application/json");
						xhttp.send(JSON.stringify({resultado:status, tempo:elapsed}));
						gameOver();
						
					}
				
				
						
			}
			

		}

	}else{
		console.log(flippedCards);
		flippedCards[0].childNodes[1].classList.toggle("flipped");
		flippedCards[0].childNodes[3].classList.toggle("flipped");
		flippedCards[1].childNodes[1].classList.toggle("flipped");
		flippedCards[1].childNodes[3].classList.toggle("flipped");

		flippedCards = [];
	}
	
		if(time==0)
		{	time++;
			startWatch();
		
		}
		
		

}

// Usar para Limitaro tempo do usuário na página
//window.setTimeout(function(){
//	gameOver();

//},1000);

function gameOver(){
	modalGameOver.style.zIndex = 10;
	modalGameOver.addEventListener("click",startGame,false);

}

function matchCardSign(){
	imgMatchSign.style.zIndex = 100;
	imgMatchSign.style.top = 150+"px";
	imgMatchSign.style.opacity = 0;


	setTimeout(function(){
	imgMatchSign.style.zIndex = -1;
	imgMatchSign.style.top = 250+"px";
	imgMatchSign.style.opacity = 1;


	},10000);
}

// increments stopwatch and displays it



}());

// Cronometro

// variables


  
function stopWatch() {
	if(state==false){
		if((seconds > 0)){
			if(matches==8){
				resetWatch();
			}
			
			seconds--;
			
		}else{
			//window.alert(tempo);
			resetWatch();
			state = true;
			
		}
		if (seconds >= 60) {
			seconds = 0;
			minutes--;
			if (minutes >= 0) {
			minutes = 60;
			hours--;
			}
			
	
		}
		
		// Display stopwatch
		display.innerHTML =
	
			(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
			":" +
			(seconds > 9 ? seconds : "0" + seconds);
	}	
	
	

}



// inicio stopwatch
function startWatch() {
	
	if (status === "stop") {
		interval = window.setInterval(stopWatch, 1000);
		start.innerHTML = "Pause";
		status = "start";
	} else {
		window.clearInterval(interval);
		start.innerHTML = "Start";
		status = "stop";
	}
	
}
// increments stopwatch and displays it
