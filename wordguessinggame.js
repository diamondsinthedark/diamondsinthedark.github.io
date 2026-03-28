let solution = "";
let input = "";

let guessCount = 1;
let guessLimit = 0;
let wordLength = 0;

let explicitTF = false;


//page logic
const currentPath = window.location.pathname;

if (currentPath.endsWith('explicitwordguessinggame.html')) {
	guessLimit = 4;
	wordLength = 4;
	explicitTF = true;
	solution = get4LetterWords();
} else {
	guessLimit = 5;
	wordLength = 5;
	solution = get5LetterWords();
}
solution = solution.toString().toUpperCase().trim();


function onSubmit() {
	//clear any previous errors
	error(null);

	if (guessCount <= guessLimit) {
		//get user text from textbox
		input = document.getElementById("userInput").value;
		input = input.toString().toUpperCase().trim();

	//validate user text
	if (input.length != wordLength) {
		if(explicitTF)
			error("Your guess must be 4 characters");
	else
		error("Your guess must be 5 characters");
	return;
	}

	//get the current guess row
	letters = document.getElementById("guessContainer_" + guessCount).getElementsByClassName("guessLetter");

	for (x = 0; x <= input.length - 1; x++) {
		//put each input letter into its slot and color gray by default
		letters[x].textContent = input.charAt(x);
		letters[x].style.backgroundColor = "#31302f";

		if (solution.includes(input.charAt(x))) {
			//input char exists in solution word: color yellow
			letters[x].style.backgroundColor = "#C9A647";
			if (input.charAt(x) === solution.charAt(x)) {
				//input char matches solution char at x: color green
				letters[x].style.backgroundColor = "#79a54d";
			}
		}
	} //end forloop

	//on last guess, didn't win
	if (guessCount == guessLimit && input.localeCompare(solution) != 0) {
		gameOver(false, "No more guesses :( Try again!");
		return;
	}

	//winning scenario
	if (input.localeCompare(solution) == 0) {
		gameOver(true, "You won! Want to play again?");
		return;
	}

	//increment count and clear the textbox to continue guessing
	guessCount++;
	document.getElementById("userInput").value = null;
	}
} //end onSubmit

function gameOver(wonTF, message) {
	document.getElementById("infoContainer").innerText = message;
	if(!wonTF)
		document.getElementById("infoContainer").style.color = "#f3ebd5"

	document.getElementById("resetButton").style = "visibility:visible";
	document.getElementById("userInput").disabled = true;
	document.getElementById("guessButton").disabled = true;

	document.getElementById("gameOverContainer").style.display = "block";
}

function error(message) {
	document.getElementById("errorContainer").innerText = message;
	if(message !== null)
		document.getElementById("errorContainer").style.display = "block";
	else
		document.getElementById("errorContainer").style.display = "none";
}

function onReset() {
	location.reload();
}


function get4LetterWords(){
	let wordBank = 
	["look", "this", "poor", "with ", "face", "eyes", "mind", "like", "neon", "find", "dead", "your", "life", "sees", "limp", "grey", "cold", "grow", "mask", "soul", "goat", "cane", "come", "hold", "that", "nice", "paul", "sips", "soft", "warm", "snug", "said", "know", "back", "play", "bows", "sick", "fire", "wiry", "mane", "neat", "deep", "dank", "lawn", "down", "line", "pain", "upon", "each", "left", "feel", "huge", "dust", "fawn", "maze", "haze", "feet", "legs", "tail", "from", "smug", "eats", "puts", "well", "lick", "nape", "fair", "ends", "fags", "clad", "lets", "just", "hide", "make", "suit", "stop", "mama", "turn", "flip", "full", "love", "papa", "mole", "take", "seat", "slow", "eyed", "laze", "doze", "toes", "says", "nose", "pump", "gold", "when", "dare", "need", "hook", "till", "atop", "rats", "head", "ball", "torn", "wake", "over", "gone", "open ", "toke", "stub", "slit", "fast", "hand", "sand ", "arms", "hair", "roll", "seem", "half", "then", "seed", "weed ", "blow", "walk", "baby", "much", "here", "fool", "even", "keep", "time", "mine", "bolo", "made", "hate", "some", "bare", "solo", "rolo", "fits", "club", "guns", "mold", "dome", "lips", "lift", "chin", "grin", "dusk", "mist", "want", "wind", "lust", "wrap", "into", "foal", "fall", "teem", "tiny", "feet", "kiss", "show", "icky", "womb", "pooh", "bear", "kick", "told", "work", "puff", "tied", "tree", "wide", "such", "many", "pile", "bend", "ruse", "clap", "mini", "bone", "cape", "dyed", "make", "sour", "mass", "vast", "blue", "calm", "fake", "loco", "nose ", "wild", "help", "chic", "five", "spin", "once", "moon", "tall", "thin", "more", "room", "wyrd", "twee", "vole ", "hole", "free", "cave", "edge", "bowl", "sold", "rope", "peel", "suck", "done", "held", "lost", "muck", "yeah", "sigh", "poke", "okay", "real", "weak", "shut", "dust", "pass", "what", "vibe", "home", "lose", "move", "code", "else", "lock", "cool", "true", "zone", "wait", "high", "part", "mess", "been", "fuck", "lone", "have", "spot", "mark", "lady", "hook", "lord", "bars", "city", "hurt", "talk", "tell", "give", "lane", "days", "mofo", "cusp", "game", "dumb ", "grew", "live", "lean", "were", "side", "long", "step", "girl", "porp", "cola", "wish", "pork", "soda", "past", "ache", "jump", "slum", "scum", "chum", "neck", "buzz", "ever", "pull", "pale", "coke", "does", "jong", "burn", "lack", "nuke", "chia", "goji", "acai", "whey", "dick", "four", "pens", "rock", "star", "wise", "west", "kids", "wore", "hoop", "rush", "grip", "fist", "stay", "miss", "pipe", "numb", "pick", "lies", "slim", "dark", "shot", "rims", "ring", "bell", "dope", "cuts", "most", "door", "very", "week", "best", "rose", "went", "tear", "shed", "song", "drag", "boys", "pink", "glow", "mode", "pool", "call", "gran", "late", "sits", "beat", "only", "born", "wave", "tips", "wall", "whip", "skin", "shit", "coco", "doom", "safe", "peek", "coat", "road", "dang", "glad", "they", "bond", "tire", "hubs", "drug", "hits", "race", "onto", "clip", "pete", "tong", "runs", "ones", "deja", "side", "drip", "drop", "read", "glue", "vape", "undo", "hell", "push", "pops", "roof", "chat", "seen", "liar", "fell", "gave", "loud", "kung", "pack", "wins", "knew", "felt", "last", "heat", "june", "than", "away", "rain", "used", "zero", "good", "trap", "debt", "meat", "cake", "will", "body", "tend", "lead", "acid", "kind", "pony", "york", "desk", "goes", "joke ", "none", "milk", "must", "food", "hear", "woah", "bump", "luck", "repo", "laid", "view", "bury", "zoom", "cash", "fear", "ways", "form", "both", "damn", "kept", "drew", "mart", "gags", "mood", "chew", "goop", "soup", "swan", "same", "shoe", "bomb", "cups", "dirt", "lego", "clap", "veer", "bits", "firm", "fish", "case", "dave", "save", "heel", "lump", "kiwi", "lime", "poot", "kong", "bank", "cats"];
	
	return wordBank[getRandomInt(0, wordBank.length - 1)]
}



function get5LetterWords() {
	let wordBank = 
	["white", "smile", "night", "words", "snide", "round", "dizzy", "mouth", "dying", "these", "trees", "their",  "smoke", "holes", "cocoa", "beard", "turns", "those", "times", "quiet", "packs", "baked", "froth", "fight", "dance", "wings", "slick", "slice ", "sleep", "slate", "waxen", "stare", "young", "eager", "milky", "heavy", "knees", "cheek", "fruit", "fresh", "hands", "icing", "makes", "glass", "palms", "dirty", "nails", "slimy", "pulls", "blind", "wanna", "right", "windy", "mover", "truck", "sloth", "curls", "shake", "bones", "bring", "snake", "child", "plush", "capes", "black", "mambo", "cheat", "flush", "veins", "exxus", "blink", "stuff", "salty", "rusty", "place", "calls", "spend", "maybe", "walls", "watch", "navel", "yearn", "whole", "doubt", "lying", "stuck", "truth", "other", "under", "knife", "looms", "blood", "empty", "tombs", "tooth", "where", "brain", "break", "gotta", "funny", "rabid", "bloom", "until", "loose", "float", "comes", "wisps", "chest", "world", "noise", "tools", "guilt", "which", "poise", "shore", "hills", "beach", "ultra", "pools", "tired", "shook", "close", "slang", "naked", "while", "gooey", "woozy", "youth", "dopes", "silky", "gonna", "vibes", "tipsy", "topsy", "slurs", "space", "gloom", "timid", "honey", "bunny", "trick", "rhyme", "walla", "fangs", "hazey", "booze", "drain", "photo", "spark", "still", "funky", "swine", "purrs", "apart", "thing", "thick", "flume", "dunes", "hairs", "super", "lemon", "gross", "pipes", "mondo", "rolls", "fuzzy", "drone", "cries", "final", "taste", "leave", "plant", "wrong", "never", "climb", "scene", "dream", "tight", "think", "flame", "bitch", "river", "shark", "money", "heart", "death", "steel", "charm", "floor", "store", "rasta", "devil", "false", "trust", "begin", "hella", "crazy", "daddy", "tough", "human", "loved", "quite", "boxes", "tesco", "flash", "sonic", "meant", "happy", "laugh", "dappy", "right", "ghost", "every", "tried", "lunch", "belly", "phone", "three", "could", "hurts", "drunk", "cliff", "again", "dress", "house", "drank", "sweet", "voice", "broke", "doing", "steam", "glare", "drugs", "green", "rails", "seeds", "agave", "might", "shove", "shirt", "looks", "pants", "worry", "spoke", "coats", "jumbo", "treat", "blame", "stone", "pappy", "vogue", "prize", "rings", "prime", "tasty", "price", "lived", "keats", "crisp", "woman", "lower", "teeth", "agnes", "clear", "guess", "first", "worst", "touch", "movie", "album", "cream", "ramen", "sugar", "light", "since", "tints", "strat", "flips", "juice", "coast", "yours", "quake", "metal", "porno", "tapes", "bored", "norms", "being", "alone", "stole", "metro", "small", "texas", "capri", "straw", "heard", "names", "frame", "disco", "tokyo", "gears", "scoot", "wavey", "davey", "spent", "trout", "wrist", "spout", "melon", "melly", "feels", "would", "doing", "force", "style", "beams", "shoes", "falls", "slide", "alive", "gimme", "dicks", "aries", "cheap", "booze",  "pepsi", "gummy", "clown", "storm", "water", "drops", "sound", "bliss", "tears", "waves", "about", "today", "puppy", "skies", "broad", "vapor", "trail", "weeks", "drawn", "angel", "hymen", "throw", "stage", "grace", "party", "shine", "solar", "stand", "plans",  "color", "jesus", "cried", "power", "reach", "learn", "spilt", "scars", "paper", "trunk", "speed", "again", "going", "safer", "haunt", "point", "crack", "state", "punch", "rules", "thank", "drive", "hoped", "great", "ideas", "lungs", "shape", "chasm", "faded", "jelly", "apple", "older", "early", "roses", "burst", "hated", "piece", "stray", "sunny", "shows", "liked", "track", "socks", "paint", "swear", "clean", "years", "abort", "ocean", "flood", "press", "third", "peter", "piper", "baker", "maker", "clock", "cross", "titty", "spank", "diddy", "tower", "piggy", "claws"];

	return wordBank[getRandomInt(0, wordBank.length - 1)]
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
