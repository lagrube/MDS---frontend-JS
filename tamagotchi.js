const statFeed = document.querySelector("#feed-stat");
const statFun = document.querySelector("#fun-stat");
const statEnergie = document.querySelector("#energie-stat");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const btnFeed = document.querySelector(".feed");
const btnFun = document.querySelector(".fun");
const btnEnergie = document.querySelector(".energie");
const echec = document.getElementById("echec");
echec.innerHTML = "";
let timerFeed = 100;
let timerFun = 100;
let timerEnergie = 100;
let playTimer = null;
let click = 0;

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

// Button play
play.addEventListener("click", () => {
  decreaseTimer();
});

replay.addEventListener("click", () => {
  location.reload();
});

btnFeed.addEventListener("click", (e) => {
  click++;
  timerFeed += 3;
  timerFeed = Math.min(100, timerFeed);
  statFeed.innerHTML = timerFeed;
  // Force sleep
  if (click > 2) {
    increaseTimer();
    gainEnergie.classList.add("blue");
    click = 0;
  }
});

btnFun.addEventListener("click", () => {
  timerFun += 2;
  timerFun = Math.min(100, timerFun);
  statFun.innerHTML = timerFun;
});

btnEnergie.addEventListener("click", () => {
  timerEnergie += 6;
  timerEnergie = Math.min(100, timerEnergie);
  statEnergie.innerHTML = timerEnergie;
});

// Night
const gainEnergie = document.getElementById("gain-energie");

gainEnergie.addEventListener("click", () => {
  if (playTimer == null) return;
  gainEnergie.classList.toggle("blue");
  if (gainEnergie.classList.value == "blue") {
    increaseTimer();
  } else {
    decreaseTimer();
  }
});

increaseTimer = () => {
  clearInterval(playTimer);
  playTimer = setInterval(() => {
    timerFeed += 1;
    timerFun += 1;
    timerEnergie += 1;
    timerFeed = Math.min(100, timerFeed);
    timerFun = Math.min(100, timerFun);
    timerEnergie = Math.min(100, timerEnergie);
    statFeed.innerHTML = timerFeed;
    statFun.innerHTML = timerFun;
    statEnergie.innerHTML = timerEnergie;
  }, 800);
};

decreaseTimer = () => {
  clearInterval(playTimer);
  playTimer = setInterval(() => {
    timerFeed -= 1;
    timerFun -= 1;
    timerEnergie -= 1;
    timerFeed = Math.max(0, timerFeed);
    timerFun = Math.max(0, timerFun);
    timerEnergie = Math.max(0, timerEnergie);
    statFeed.innerHTML = timerFeed;
    statFun.innerHTML = timerFun;
    statEnergie.innerHTML = timerEnergie;
    if (timerFeed == 0 || timerFun == 0 || timerEnergie == 0) {
      echec.innerHTML = "Vous avez perdu !";
      clearInterval(playTimer);
      play.classList.add("invisible");
      replay.classList.remove("invisible");
    } else {
      echec.innerHTML = "";
    }
  }, 800);
};

// Force stand-up
const standUp = document.getElementById("stand-up");
standUp.addEventListener("click", () => {
  if (playTimer == null) return;
  else {
    if (gainEnergie.classList.value == "blue")
      standUp.classList.add("red", "animate__animated", "animate__shakeX");
    if (gainEnergie.classList.value == "blue" && timerEnergie > 30) {
      timerEnergie -= 30;
      gainEnergie.classList.remove("blue");
      setTimeout(() => {
        console.log("test");
        standUp.classList.remove("red", "animate__animated", "animate__shakeX");
      }, 800);
    }
    if (gainEnergie.classList.value == "blue" && timerEnergie < 30) {
      clearInterval(playTimer);
      timerEnergie = 0;
      statEnergie.innerHTML = timerEnergie;
      echec.innerHTML = "vous avez perdu !";
    }
  }
});
