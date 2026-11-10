
const gridSize = 10;
const gridArray = [];
const wordList = ["dreamland", "tourist", "perfect", "digital", "bizarre", "touch", "canned"];
let directions = ["NORTH", "NORTHEAST", "EAST", "SOUTHEAST", "SOUTH", "SOUTHWEST", "WEST", "NORTHWEST"];

/////////////////////////////////////////////////////////////////////////////
class GridLetter{
	constructor(letter, isSolution, isOverlap){
		this.letter = letter;
		this.isSolution = isSolution;
		this.isOverlap = isOverlap;
	}
}
/////////////////////////////////////////////////////////////////////////////


initGridArray();
loopWordList();
writeGridHTML();
writeWordBankHTML();


function initGridArray(){
	for (let x = 0; x < gridSize; x++){
		gridArray[x] = [];
		for (let y = 0; y < gridSize; y++){
			gridArray[x][y] = new GridLetter(null, false, false);
		}
	}
}

//TODO handle condition where word is never able to be placed
function loopWordList(){
	for(let w = 0; w < wordList.length; w++){
		let successTF = false;

		while(!successTF){
			//get random starting spot
			let initialX = getRandomInt(0, gridSize - 1);
			let initialY = getRandomInt(0, gridSize - 1);
			
			//shuffle directions array to get random order of directions 
			directions = shuffleArray(directions);
			
			for(let d = 0; d < directions.length; d++){
				successTF = placeWord(wordList[w], initialX, initialY, directions[d]);
				if(successTF) break;
			}
		}
	}
}

function placeWord(word, startX, startY, direction){
	//console.log("calling placeWord with: " + word + " starting at x: " + startX + " y: " + startY + " going " + direction);
	
	let x = startX;
	let y = startY;
	
	let c = 0;
	let validTF = true;
	
	while(c < word.length){
		if(x < 0 || x > gridSize - 1){validTF = false; break;}
		else if(y < 0 || y > gridSize - 1){validTF = false; break;}
		
		let gridLetter = gridArray[x][y];
		
		if(gridLetter.letter !== null && gridLetter.letter !== word.charAt(c)){
			validTF = false; 
			break;
		}
		else if(gridLetter.letter !== null && gridLetter.letter === word.charAt(c)){
			//mark this slot as an overlap letter, don't break
			gridLetter.isOverlap = true;
			//console.log("overlap condition. current word: " + word + " current letter: " + word.charAt(c));
		}
		else{
			//success, place letter
			gridLetter.letter = word.charAt(c).toUpperCase();
			gridLetter.isSolution = true;
			gridLetter.isOverlap = false;
		} 
		
		//move in FORWARD direction
		if(direction === "NORTH") {y--;}
		else if(direction === "NORTHEAST") {x++; y--;}
		else if(direction === "EAST") {x++;}
		else if(direction === "SOUTHEAST") {x++; y++;}
		else if(direction === "SOUTH") {y++;}
		else if(direction === "SOUTHWEST") {x--; y++;}
		else if(direction === "WEST") {x--;}
		else if(direction === "NORTHWEST") {x--; y--; }
		
		//increment letter
		c++;
	}
	
	if(!validTF){
		while(c > 0){
			//move in BACKWARD direction
			if(direction === "NORTH") {y++;}
			else if(direction === "NORTHEAST") {x--; y++;}
			else if(direction === "EAST") {x--;}
			else if(direction === "SOUTHEAST") {x--; y--;}
			else if(direction === "SOUTH") {y--;}
			else if(direction === "SOUTHWEST") {x++; y--;}
			else if(direction === "WEST") {x++;}
			else if(direction === "NORTHWEST") {x++; y++; }
			
			//remove letter from grid if it's NOT marked as an overlap letter 
			letterToRemove = gridArray[x][y];
			if(!letterToRemove.isOverlap)
				letterToRemove.letter = null;
			
			//decrement letter
			c--;
		}
		return false;
	}
	
	//console.log(word + " was successfully placed starting at x: " + startX + " y: " + startY + " going " + direction);
	return true;
}

//write letter grid to DOM
function writeGridHTML(){
	let grid = document.getElementById("grid");
	let newInnerHTML = "";

	for (y = 0; y < gridSize; y++) {
		newInnerHTML = newInnerHTML + '<div class="gridRowContainer">\n';
		for (x = 0; x < gridSize; x++) {
			let gridLetter = gridArray[x][y];
			newInnerHTML = newInnerHTML + '<div class="slot" id="' + x + "-" + y + '">';
			
			if(gridLetter.letter !== null)
				newInnerHTML += gridLetter.letter; //place actual letter
			else
				newInnerHTML += "-"; //getRandomLetter()//.toUpperCase(); //place random letter
			
			newInnerHTML+= '</div>\n';
		}//inner for
		newInnerHTML = newInnerHTML + "</div>\n";
	}
	grid.innerHTML = newInnerHTML;
}

//write list of words to DOM
function writeWordBankHTML(){
	let wordBank = document.getElementById("wordBank");
	let newInnerHTML = "";
	
	for(w = 0; w < wordList.length; w++){
		newInnerHTML += '<div>' + wordList[w] + '</div>';
	}
	
	wordBank.innerHTML = newInnerHTML;

}



/////////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLetter(){
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
	//console.log(randomLetter); // e.g., "k"
	return randomLetter;
}

function shuffleArray(array) {
	// Create a copy to avoid mutating the original array
	const arr = [...array];

	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	
	return arr;
}   

