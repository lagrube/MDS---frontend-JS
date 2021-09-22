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

const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

play.addEventListener("click", () => {
  const playTimer = setInterval(() => {
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
});

replay.addEventListener("click", () => {
  location.reload();
});

btnFeed.addEventListener("click", () => {
  timerFeed += 3;
  timerFeed = Math.min(100, timerFeed);
  statFeed.innerHTML = timerFeed;
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
const night = document.getElementById("night");
const gainEnergie = document.getElementById("gain-energie");

night.addEventListener("click", () => {
  gainEnergie.classList.toggle("blue");
  //   if ((gainEnergie.classList.value = "blue")) clearInterval(playTimer);
});
