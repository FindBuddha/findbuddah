
const levels = [
    { level: 1, image: "assets/level01.png", top: "10%", left: "8%", width: "8%", height: "10%" },
    { level: 2, image: "assets/level02.png", top: "55%", left: "68%", width: "4%", height: "7%" },
    { level: 3, image: "assets/level03.png", top: "30%", left: "45%", width: "5%", height: "8%" },
    { level: 4, image: "assets/level04.png", top: "20%", left: "15%", width: "6%", height: "9%" },
    { level: 5, image: "assets/level05.png", top: "40%", left: "70%", width: "5%", height: "7%" },
    { level: 6, image: "assets/level06.png", top: "12%", left: "85%", width: "4%", height: "8%" },
    { level: 7, image: "assets/level07.png", top: "65%", left: "25%", width: "7%", height: "10%" },
    { level: 8, image: "assets/level08.png", top: "50%", left: "50%", width: "5%", height: "6%" },
    { level: 9, image: "assets/level09.png", top: "35%", left: "33%", width: "6%", height: "8%" },
    { level: 10, image: "assets/level10.png", top: "75%", left: "12%", width: "4%", height: "9%" },
    { level: 11, image: "assets/level11.png", top: "22%", left: "60%", width: "5%", height: "7%" },
    { level: 12, image: "assets/level12.png", top: "45%", left: "80%", width: "6%", height: "8%" }
];

let currentLevelIndex = 0;
const puzzleImage = document.getElementById("puzzle-image");
const targetZone = document.getElementById("target-zone");
const levelTitle = document.getElementById("level-title");
const feedback = document.getElementById("game-feedback");

function loadLevel(index) {
    const lvl = levels[index];
    levelTitle.textContent = `Level ${lvl.level}`;
    puzzleImage.src = lvl.image;
    targetZone.style.top = lvl.top;
    targetZone.style.left = lvl.left;
    targetZone.style.width = lvl.width;
    targetZone.style.height = lvl.height;
    feedback.textContent = "";
}

targetZone.addEventListener("click", () => {
    feedback.textContent = "Great job! Loading next layout...";
    feedback.style.color = "#4CAF50";
    setTimeout(() => {
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            loadLevel(currentLevelIndex);
        } else {
            feedback.textContent = "Master Class Complete! You discovered every hidden target.";
            targetZone.style.display = "none";
        }
    }, 1500);
});

loadLevel(currentLevelIndex); 
