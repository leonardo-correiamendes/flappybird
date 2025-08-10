// ------- DOM -------
const obstacle = document.getElementById("obstacle");
const pipeTop = document.getElementById("pipeTop");
const pipeBottom = document.getElementById("pipeBottom");
const character = document.getElementById("character");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("bestScore");

// Overlays & HUD
const startOverlay = document.getElementById("startOverlay");
const gameOverOverlay = document.getElementById("gameOverOverlay");
const finalScoreEl = document.getElementById("finalScore");
const finalBestEl = document.getElementById("finalBest");
const btnPlay = document.getElementById("btnPlay");
const btnRetry = document.getElementById("btnRetry");
const hud = document.getElementById("hud");

// ------- State -------
let counter = 0;
let jumping = 0;
let gameOver = false;
let firstLoop = true;
let started = false;

let bestScore = parseInt(localStorage.getItem("bestScore")) || 0;

// Sprites (2 images)
const frames = ["img/flappy_frame_1.png", "img/flappy_frame_2.png"];
let flapTimeout = null;

// ------- Helpers -------
function renderScore() {
    scoreEl.textContent = counter;
}
function renderBestScore() {
    bestScoreEl.textContent = bestScore;
}

function centerBird() {
    const gh = game.clientHeight; // 550
    const ch = character.offsetHeight || 48; // 48
    const top = Math.max(0, Math.floor((gh - ch) / 2));
    character.style.top = top + "px"; // centre verticalement
}

function hidePlayfield(hidden) {
    character.classList.toggle("hidden", hidden);
    obstacle.classList.toggle("hidden", hidden);
}

function getRect(el) {
    return el.getBoundingClientRect();
}
function insetRect(r, px) {
    return {
        left: r.left + px,
        right: r.right - px,
        top: r.top + px,
        bottom: r.bottom - px,
    };
}

// Tuyaux
const GAME_H = 550;
const GAP = 150;
function setPipes(holeTopPx) {
    pipeTop.style.height = holeTopPx + "px";
    pipeBottom.style.top = holeTopPx + GAP + "px";
    pipeBottom.style.height = GAME_H - holeTopPx - GAP + "px";
}

// ------- Init -------
character.style.backgroundImage = `url('${frames[0]}')`;
renderBestScore();
renderScore();
setPipes(175);
hidePlayfield(true); // cache l’oiseau et les tuyaux avant Play
obstacle.classList.add("paused");
obstacle.classList.remove("running");
startOverlay.classList.add("show");
gameOverOverlay.classList.remove("show");
hud.classList.add("hidden");

// jeu en pause au chargement
if (obstacle) {
    obstacle.classList.add("paused");
    obstacle.classList.remove("running");
}
if (startOverlay) startOverlay.classList.add("show");
if (gameOverOverlay) gameOverOverlay.classList.remove("show");
if (hud) hud.classList.add("hidden");

// ------- Obstacles cycle -------
obstacle.addEventListener("animationiteration", () => {
    if (!started) return;
    const holeTop = Math.floor(Math.random() * 250) + 50;
    setPipes(holeTop);

    if (!firstLoop) {
        counter++;
        renderScore();
    } else {
        firstLoop = false;
    }
});

// ------- Boucle de jeu (gravité + collisions) -------
setInterval(function () {
    if (!started || gameOver) return;

    // Gravité / saut
    const characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping === 0) {
        character.style.top = characterTop + 3 + "px";
    }

    // Collisions
    const cRaw = getRect(character);
    const c = insetRect(cRaw, 6); // hitbox réduite (fair)
    const topR = getRect(pipeTop);
    const botR = getRect(pipeBottom);
    const g = getRect(game);

    // plafond / sol
    if (c.top <= g.top + 2 || c.bottom >= g.bottom - 2) {
        triggerGameOver();
        return;
    }

    // tolérance bords du trou
    const EDGE_PAD = 4;
    const hitTop =
        topR.left < c.right &&
        topR.right > c.left &&
        c.top < topR.bottom - EDGE_PAD;
    const hitBottom =
        botR.left < c.right &&
        botR.right > c.left &&
        c.bottom > botR.top + EDGE_PAD;

    if (hitTop || hitBottom) triggerGameOver();
}, 10);

// ------- Start / Game Over / Reset -------
function startGame() {
    if (started) return;
    started = true;
    counter = 0;
    renderScore();
    firstLoop = true;
    gameOver = false;

    character.style.backgroundImage = `url('${frames[0]}')`;
    setPipes(175);
    centerBird();
    hidePlayfield(false);

    startOverlay.classList.remove("show");
    gameOverOverlay.classList.remove("show");
    hud.classList.remove("hidden");

    obstacle.classList.remove("paused");
    obstacle.classList.add("running");
}

function showGameOver() {
    started = false;

    if (counter > bestScore) {
        bestScore = counter;
        localStorage.setItem("bestScore", bestScore);
        renderBestScore();
    }
    finalScoreEl.textContent = counter;
    finalBestEl.textContent = bestScore;

    hud.classList.add("hidden");
    gameOverOverlay.classList.add("show");

    obstacle.classList.remove("running");
    obstacle.classList.add("paused");

    hidePlayfield(true);
    counter = 0;
    renderScore();
    setPipes(175);
}

function triggerGameOver() {
    if (gameOver) return;
    gameOver = true;
    setTimeout(() => {
        gameOver = false;
        showGameOver();
    }, 100);
}

// ------- Input -------
function jump() {
    if (!started || gameOver) return;
    jumping = 1;
    let jumpCount = 0;

    if (flapTimeout) clearTimeout(flapTimeout);
    character.style.backgroundImage = `url('${frames[1]}')`;
    flapTimeout = setTimeout(() => {
        character.style.backgroundImage = `url('${frames[0]}')`;
        flapTimeout = null;
    }, 150);

    const jumpInterval = setInterval(() => {
        let y = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (y > 6 && jumpCount < 15) character.style.top = y - 5 + "px";
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
        }
        jumpCount++;
    }, 10);
}

document.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        if (!started) startGame();
        else jump();
    }
});

// Boutons
if (btnPlay) btnPlay.addEventListener("click", startGame);
if (btnRetry) btnRetry.addEventListener("click", startGame);
