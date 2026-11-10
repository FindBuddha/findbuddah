const levels = [
    { level: 1, image: "assets/level01.png", top: "62%", left: "60%", width: "10%", height: "12%", type: "single" }, // Perfectly centered now!
    { level: 2, image: "assets/level02.png", top: "79%", left: "80%", width: "10%", height: "12%", type: "single" }, // Lowered slightly down over body
    { level: 3, image: "assets/level03.png", top: "42%", left: "75%", width: "12%", height: "15%", type: "single" },
    { level: 4, image: "assets/level04.png", top: "65%", left: "62%", width: "14%", height: "16%", type: "single" },
    { level: 5, image: "assets/level05.png", top: "78%", left: "75%", width: "14%", height: "16%", type: "single" },
    { level: 6, image: "assets/level06.png", top: "52%", left: "42%", width: "14%", height: "16%", type: "single" },
    { level: 7, image: "assets/level07.png", top: "12%", left: "82%", width: "14%", height: "16%", type: "single" },
    { level: 8, image: "assets/level08.png", top: "10%", left: "85%", width: "12%", height: "14%", type: "single" },
    { level: 9, image: "assets/level09.png", top: "18%", left: "86%", width: "12%", height: "14%", type: "single" }, // Shifted slightly RIGHT along shelf
    // LEVEL 10: Shifted slightly LEFT to perfectly center over both targets
    { level: 10, image: "assets/level10.png", type: "multi", targets: [
        { top: "12%", left: "11%", width: "12%", height: "14%", found: false },
        { top: "70%", left: "11%", width: "12%", height: "14%", found: false }
    ]},
    // LEVEL 11: Shifted slightly LEFT to perfectly center over both targets
    { level: 11, image: "assets/level11.png", type: "multi", targets: [
        { top: "12%", left: "11%", width: "12%", height: "14%", found: false },
        { top: "70%", left: "11%", width: "12%", height: "14%", found: false }
    ]},
    { level: 12, image: "assets/level12.png", top: "78%", left: "82%", width: "14%", height: "16%", type: "single" } 
];

 

        { top: "12%", left: "15%", width: "12%", height: "14%", found: false },
        { top: "70%", left: "15%", width: "12%", height: "14%", found: false }
    ]},
    { level: 12, image: "assets/level12.png", top: "78%", left: "82%", width: "14%", height: "16%", type: "single" } 
];

let currentLevelIndex = 0;
let timeLeft = 300; // 5 minute countdown
let timerInterval;

const puzzleImage = document.getElementById("puzzle-image");
const targetZone = document.getElementById("target-zone");
const levelTitle = document.getElementById("level-title");
const feedback = document.getElementById("game-feedback");
const timerDisplay = document.getElementById("timer-display");

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
       
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedback.textContent = "Time's up! Refresh to try your sanctuary journey again.";
            feedback.style.color = "#ff5722";
            targetZone.style.display = "none";
        }
    }, 1000);
}

function loadLevel(index) {
    const lvl = levels[index];
    levelTitle.textContent = `Level ${lvl.level}`;
    puzzleImage.src = lvl.image;
    feedback.textContent = "";
   
    // Clear out any multi-target elements from previous levels if they exist
    document.querySelectorAll('.multi-target').forEach(el => el.remove());

    if (lvl.type === "single") {
        targetZone.style.display = "block";
        targetZone.style.top = lvl.top;
        targetZone.style.left = lvl.left;
        targetZone.style.width = lvl.width;
        targetZone.style.height = lvl.height;
    } else {
        // Hide main target zone, generate unique multiple clickable areas dynamically
        targetZone.style.display = "none";
        feedback.textContent = "Look closely... there are TWO hidden targets on this map! Find both to proceed.";
        feedback.style.color = "#00bcd4";
       
        lvl.targets.forEach((target, tIndex) => {
            const multiBox = document.createElement("div");
            multiBox.className = "multi-target";
            multiBox.style.cssText = `position:absolute; top:${target.top}; left:${target.left}; width:${target.width}; height:${target.height}; cursor:pointer; z-index:10;`;
           
            multiBox.addEventListener("click", () => {
                if (!target.found) {
                    target.found = true;
                    multiBox.style.backgroundColor = "rgba(76, 175, 80, 0.3)"; // highlight found green
                    timeLeft += 15; // Time bonus!
                   
                    const totalFound = lvl.targets.filter(t => t.found).length;
                    if (totalFound === 1) {
                        feedback.textContent = "You uncovered the first one! Now locate his companion.";
                        feedback.style.color = "#ffeb3b";
                    } else if (totalFound === 2) {
                        advanceLevel();
                    }
                }
            });
            document.getElementById("puzzle-wrapper").appendChild(multiBox);
        });
    }
}

function advanceLevel() {
    feedback.textContent = "Great job! Loading next layout...";
    feedback.style.color = "#4CAF50";
    setTimeout(() => {
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            loadLevel(currentLevelIndex);
        } else {
            clearInterval(timerInterval);
            feedback.textContent = `Master Class Complete! You discovered every hidden target with ${timeLeft}s left!`;
            targetZone.style.display = "none";
            document.querySelectorAll('.multi-target').forEach(el => el.remove());
        }
    }, 1500);
}

targetZone.addEventListener("click", () => {
    timeLeft += 10; // 10 second bonus for finding single target
    advanceLevel();
});

// Start the experience
startTimer();
loadLevel(currentLevelIndex);

 
