const difficulty = document.getElementById("difficulty");
const settings_btn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const word = document.getElementById("word");
const score = document.getElementById("score");
const text = document.getElementById("text");

const characters = "abcdefghijklmnopqrstuvwxyz";
let wordGenerated;
let scoreValue = 0;
let level = "easy";

function generateRandomWord(length) {
  let word = "";
  for (let i = 0; i < length; i++) {
    // Select a random character from the characters array
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];
    word += randomChar;
  }
  return word;
}

settings_btn.addEventListener("click", () => {
  if (settings.classList.toString().indexOf("hide") !== -1) {
    settings.classList.remove("hide");
  } else {
    settings.classList.add("hide");
  }
});

difficulty.addEventListener("change", () => {
  level = difficulty.value;
  getDifficultyWord(level);
});

function getDifficultyWord() {
  console.log("level", level);
  text.value = ``;
  if (level === "hard") {
    wordGenerated = generateRandomWord(10);
  } else if (level === "medium") {
    wordGenerated = generateRandomWord(8);
  } else {
    wordGenerated = generateRandomWord(4);
  }

  word.innerHTML = `${wordGenerated}`;
}

text.addEventListener("change", () => {
  console.log("text", text.value);
  if (text.value === wordGenerated) {
    scoreValue += 3;
    getDifficultyWord();
  }
  score.innerText = `${scoreValue}`;
});

function initalWordShowing() {
  getDifficultyWord();
  score.innerText = 0;
}

initalWordShowing();
