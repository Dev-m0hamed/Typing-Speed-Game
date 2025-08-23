const wordsList = {
  Easy: [
    "Hello",
    "Code",
    "Town",
    "Test",
    "Rust",
    "Task",
    "Funny",
    "Roles",
    "Dog",
    "Cat",
  ],
  Normal: [
    "Python",
    "Github",
    "Youtube",
    "Twitter",
    "Country",
    "Runner",
    "Working",
    "Styling",
    "Playing",
    "Linkedin",
    "Coding",
  ],
  Hard: [
    "Programming",
    "Javascript",
    "Leetcode",
    "Internet",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Cascade",
    "Documentation",
    "Dependencies",
  ],
};

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Catch Selectors
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let selectBox = document.querySelector(".box");
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcomingWords = document.querySelector(".upcoming-words");
let gotScore = document.querySelector(".score .got");
let totalSpan = document.querySelector(".score .total");
let timeLeftSpan = document.querySelector(".time span");
let finishMessage = document.querySelector(".finish");
let currentWords = [];


function updateLevel(value) {
  if (!lvls[value]) return;
  lvlNameSpan.innerHTML = value;
  secondsSpan.innerHTML = lvls[value];
  timeLeftSpan.innerHTML = lvls[value];
  currentWords = [...wordsList[value]]
  totalSpan.innerHTML = currentWords.length;
}

window.onload = () => {
  if (sessionStorage.getItem("select"))
    selectBox.value = sessionStorage.getItem("select");
  updateLevel(selectBox.value);
};
// Setting Level Name + Seconds + Score
selectBox.onchange = () => {
  sessionStorage.setItem("select", selectBox.value);
  updateLevel(selectBox.value);
};

// Disable Paste Event
input.onpaste = () => false;

// Start Game
startButton.onclick = function () {
  if (selectBox.value !== "") {
    this.remove();
    selectBox.remove();
    input.focus();
    // Generate Word Function
    genWords();
  }
};
// Generate Words Function
function genWords() {
  let randomWord = currentWords[Math.floor(Math.random() * currentWords.length)];
  let wordIndex = currentWords.indexOf(randomWord);
  currentWords.splice(wordIndex, 1);
  theWord.innerHTML = randomWord;
  upcomingWords.innerHTML = "";
  for (let i = 0; i < currentWords.length; i++) {
    let div = document.createElement("div");
    let txt = document.createTextNode(currentWords[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = lvls[selectBox.value];
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (
      timeLeftSpan.innerHTML === "0" ||
      input.value.toLowerCase() === theWord.innerHTML.toLowerCase()
    ) {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        gotScore.innerHTML++;
        if (currentWords.length > 0) {
          genWords();
        } else endGame("Congrats", "good");
      } else endGame("Game Over", "bad");
    }
  }, 1000);
}

function endGame(message, className) {
  let span = document.createElement("span");
  span.className = className;
  span.textContent = message;
  finishMessage.appendChild(span);
  let restartButton = document.createElement("button");
  restartButton.onclick = () => location.reload();
  restartButton.className = "restart";
  restartButton.textContent = "Restart";
  finishMessage.appendChild(restartButton);
  upcomingWords.remove();
}
