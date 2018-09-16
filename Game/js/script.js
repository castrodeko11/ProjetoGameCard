(function(){
	var images = [];

	var flippedCards = [];

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
		flippedCards = [];
		images = randomSort(images);
		var frontFaces = document.getElementsByClassName("front")

		for(var i = 0; i < 16; i++){
			var card = document.querySelector("#card"+i);
			//console.log(i % 8)
			card.style.left = i % 8 === 0  ? 5 + "px" : i % 8 * 165 + 5 + "px";
			card.style.top =  i < 8 ? 5 + "px" : 250 + "px";

			card.addEventListener("click",flipCard,false);

			frontFaces[i].style.background = "url('"+images[i].src+"')";
			frontFaces[i].setAttribute("id",images[i].id);
			console.log(frontFaces[i].id);
		}
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
	}else{
		console.log(flippedCards);
		flippedCards[0].childNodes[1].classList.toggle("flipped");
		flippedCards[0].childNodes[3].classList.toggle("flipped");
		flippedCards[1].childNodes[1].classList.toggle("flipped");
		flippedCards[1].childNodes[3].classList.toggle("flipped");

		flippedCards = [];
	}

}
}());