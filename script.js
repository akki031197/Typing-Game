const difficulty = document.getElementById("difficulty");
const settings_btn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settings_form = document.getElementById("settings-form");
const word = document.getElementById("word");
const score = document.getElementById("score");
const text = document.getElementById("text");
const timeEL = document.getElementById("time");
const end_game_container = document.getElementById("end-game-container");

const characters = "abcdefghijklmnopqrstuvwxyz";
let wordGenerated;
let scoreValue = 0;
let level =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
let time = getTimeBasedOnDifficulty();

const timeInterval = setInterval(updateTime, 1000);
text.focus();

function generateRandomWord(length) {
  let word = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomChar = characters[randomIndex];
    word += randomChar;
  }
  return word;
}

function updateTime() {
  time--;
  timeEL.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  end_game_container.innerHTML = `
      <h1>Time ran out</h1>
      <p>Your Final score is ${scoreValue}</p>
      <button onClick='location.reload()'>Reload</button>
      `;
  end_game_container.style.display = "flex";
}

settings_btn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

difficulty.addEventListener("change", () => {
  level = difficulty.value;
  getDifficultyWord();
  time = getTimeBasedOnDifficulty();
  timeEL.innerText = time + "s";
});

const levelToWordLength = {
  easy: 4,
  medium: 8,
  hard: 10,
};

function getDifficultyWord() {
  text.value = "";
  const wordLength = levelToWordLength[level];
  wordGenerated = generateRandomWord(wordLength);
  word.innerText = wordGenerated;
}

function getTimeBasedOnDifficulty() {
  const levelToTime = {
    easy: 10,
    medium: 15,
    hard: 20,
  };
  return levelToTime[level];
}

text.addEventListener("change", () => {
  if (text.value === wordGenerated) {
    scoreValue += 3;
    time += 3;
    updateTime();
    getDifficultyWord();
    score.innerText = scoreValue;
  }
});

function initialWordShowing() {
  getDifficultyWord();
  score.innerText = scoreValue;
}
settings_form.addEventListener("change", (e) => {
  level = e.target.value;
  localStorage.setItem("difficulty", level);
  time = getTimeBasedOnDifficulty();
  timeEL.innerText = time + "s";
});

initialWordShowing();
