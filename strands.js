
const wordList = ["dreamland", "tourist", "perfect", "digital", "bizarre", "touch", "canned"];
let linkedListArray = [];

//dynamically write the grid (grid size: 6x8)
createGrid();





//////////////////////////////////////////////

function createGrid(){
	let colMax = 6; //x, left to right
	let rowMax = 8; //y, top to bottom

	let grid = document.getElementById("grid");
	let newInnerHTML = "";

	for (y = 0; y < rowMax; y++) {
	  newInnerHTML = newInnerHTML + '<div class="rowContainer">\n';
	  for (x = 0; x < colMax; x++) {
		newInnerHTML =
		  newInnerHTML +
		  '<div class="slot" data-occupied="f" id="' + x + "-" + y + '">&nbsp;</div>\n';
	  }
	  newInnerHTML = newInnerHTML + "</div>\n";
	}
	grid.innerHTML = newInnerHTML;
}

function getNeighborCoords(xCoord, yCoord){
	let coordsN = [xCoord, yCoord - 1];
	let coordsNE = [xCoord + 1, yCoord - 1];
	let coordsE = [xCoord + 1, yCoord];
	let coordsSE = [xCoord + 1, yCoord + 1];
	let coordsS = [xCoord, yCoord + 1];
	let coordsSW = [xCoord - 1, yCoord + 1];
	let coordsW = [xCoord - 1, yCoord];
	let coordsNW = [xCoord - 1, yCoord - 1];

	const neighbors = [coordsN, coordsNE, coordsE, coordsSE, coordsS, coordsSW, coordsW, coordsNW];
	const shuffled = neighbors.sort(() => Math.random() - 0.5);

	const newCoords = [];
	for(s = 0; s < shuffled.length; s++)
	{
	newCoords = shuffled[s];
	}
}

function getRandomInt(min, max){
	let rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return rand;
}

//////////////////////////////////////////////

class LetterSlot{
	constructor(letter, xCoord, yCoord){
		this.letter = letter;
		this.xCoord = xCoord;
		this.yCoord = yCoord;
	}
}

//////////////////////////////////////////////

class Node{
	constructor(letterSlot){
		this.letterSlot = LetterSlot;
		this.next = null;
		this.prev = null;
	}
}

//////////////////////////////////////////////

class LinkedList{
	constructor(){
		this.head = head;
		this.tail = tail;
		this.length = 0;
	}
	
	//add node to end of list
	push(letterSlot) {
		let newNode = new Node(letterSlot);
		
		if(this.length === 0){
			this.head = newNode;
			this.tail = newNode;
		}
		else{
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		this.length++;
		return this;
	}
	
	//get node at end of list
	pop(){
		if(!this.head) return undefined;
		
		let poppedItem = this.tail;
		if(this.length === 1){
			this.head = null;
			this.tail = null;
		}
		else{
			this.tail = poppedItem.prev;
			this.tail.next = null;
			poppedItem.prev = null;
		}
		this.length--;
		return poppedItem;
	}
	
	//add new node to beginning of list
	unshift(letterSlot){
		let newNode = new Node(letterSlot);
		
		if(this.length === 0){
			this.head = newNode;
			this.tail = newNode;
		}
		else{
			this.head.prev = newNode;
			newNode.next = this.head;
			this.head = newNode;
		}
		this.length++;
		return this;
	}
	
	//get node at beginning of list
	shift(){
		if(this.length === 0) return undefined; 
		
		let oldHead = this.head;
		if(this.length === 1){
			this.head = null;
			this.tail = null;
		}
		else{
			this.head = oldHead.next;
			this.head.prev = null;
			oldHead.next = null;
		}
		this.length--;
		return oldHead;
	}
	
	//get node at a particular index
	get(index){
		if(index < 0 || index >= this.length) return null;
		
		if(index <= this.length / 2){
			let count = 0;
			let current = this.head;
			while(count !== index){
				current = current.next;
				count++;
			}
			return current;
		}
		else{
			let count = this.length - 1;
			let current = this.tail;
			while(count !== index){
				current = current.prev;
				count--;
			}
		}
		return current;
	}
	
	//replace node at a particular index
	set(index, letterSlot){
		let foundNode = this.get(index);
		
		if(foundNode !== null){
			foundNode.letterSlot = letterSlot;
			return true;
		}
		
		return false;
	}
	
	//add node at a particular index
	insert(index, letterSlot){
		if(index < 0 || index > this.length) return false;
		if(index === 0) return this.unshift(letterSlot);
		if(index === this.length) return this.push(letterSlot);
		
		let newNode = newNode(letterSlot);
		let prevNode = this.get(index - 1);
		let nextNode = prevNode.next;
		
		prevNode.next = newNode;
		newNode.prev = prevNode;
		newNode.next = nextNode;
		nextNode.prev = newNode;
		
		this.length++;
		return true;
	}
	
	//remove node at a particular index 
	remove(index){
		if(index < 0 || index >= this.length) return undefined;
		if(index === 0) return this.shift();
		if(index === this.length - 1) return this.pop();
		
		let removedNode = this.get(index);
		let prevNode = removedNode.prev;
		let nextNode = removedNode.next;
		prevNode.next = nextNode;
		nextNode.prev = prevNode;
		
		removedNode.next = null;
		removedNode.prev = null;
		
		this.length--;
		return removedNode;
	}
	
	
}//end LinkedList class
















































