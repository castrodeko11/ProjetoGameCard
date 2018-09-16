(function(){
	var matches = 0;

	var images = [];

	var flippedCards = [];

	var modalGameOver = document.querySelector("#modalGameOver")

	var imgMatchSign = document.querySelector("#imgMatchSign")


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

				if(matches ===8){

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

}());