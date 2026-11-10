const levels = [
    { level: 1, image: "assets/level01.png", top: "62%", left: "58%", width: "10%", height: "12%" }, // Community Green Fair (Lower right-center)
    { level: 2, image: "assets/level02.png", top: "75%", left: "80%", width: "10%", height: "12%" }, // Camouflaged (Bottom right)
    { level: 3, image: "assets/level03.png", top: "42%", left: "28%", width: "8%", height: "10%" },  // Level 3 Target
    { level: 4, image: "assets/level04.png", top: "35%", left: "65%", width: "8%", height: "10%" },  // Level 4 Target
    { level: 5, image: "assets/level05.png", top: "50%", left: "48%", width: "8%", height: "10%" },  // Level 5 Target
    { level: 6, image: "assets/level06.png", top: "22%", left: "15%", width: "8%", height: "10%" },  // Level 6 Target
    { level: 7, image: "assets/level07.png", top: "65%", left: "25%", width: "7%", height: "10%" },  // Level 7 Target
    { level: 8, image: "assets/level08.png", top: "50%", left: "50%", width: "5%", height: "6%" },   // Level 8 Target
    { level: 9, image: "assets/level09.png", top: "35%", left: "33%", width: "6%", height: "8%" },   // Level 9 Target
    { level: 10, image: "assets/level10.png", top: "75%", left: "12%", width: "4%", height: "9%" }, // Level 10 Target
    { level: 11, image: "assets/level11.png", top: "30%", left: "32%", width: "14%", height: "16%" }, // Level 11 Double Characters in Alcove
    { level: 12, image: "assets/level12.png", top: "45%", left: "80%", width: "6%", height: "8%" }   // Level 12 Target
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
   
    // Add special prompt dialogue text for your level 11 conversation starter
    if (lvl.level === 11) {
        feedback.textContent = "Look closely at the alcove... it looks like he brought a companion along. Let's discuss who you spot!";
        feedback.style.color = "#00bcd4";
    } else {
        feedback.textContent = "";
    }
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

 
