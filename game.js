{ level: 11, image: "../assets/level11.png", top: "10%", left: "8%", width: "8%", height: "10%" },
    { level: 12, image: "../assets/level12.png", top: "55%", left: "60%", width: "4%", height: "7%" }
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
    feedback.textContent = "Great find! Preparing next layout...";
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
