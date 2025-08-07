const character = document.getElementById("character");
const game = document.getElementById("game");

const pipeTop = document.querySelector(".pipe-top");
const pipeBottom = document.querySelector(".pipe-bottom");

let jumping = 0;
let counter = 0;
let gameOver = false;
let firstLoop = true;

// Position initiale du trou
let holeTop = 175;
pipeTop.style.height = holeTop + "px";
pipeBottom.style.top = holeTop + 150 + "px";
pipeBottom.style.height = 550 - holeTop - 150 + "px";

obstacle.addEventListener("animationiteration", () => {
    if (firstLoop) {
        firstLoop = false;
        return;
    }

    setTimeout(() => {
        const gap = 150;
        const maxTopHeight = 400;
        const randomTopHeight = Math.floor(
            Math.random() * (maxTopHeight - gap)
        );

        pipeTop.style.height = randomTopHeight + "px";
        pipeBottom.style.top = randomTopHeight + gap + "px";
        pipeBottom.style.height = 550 - randomTopHeight - gap + "px";

        counter++;
    }, 10); // petit délai pour laisser le DOM re-rendre
});

setInterval(function () {
    if (gameOver) return;

    const characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping === 0) {
        character.style.top = characterTop + 3 + "px";
    }

    const characterRect = character.getBoundingClientRect();
    const pipeTopRect = pipeTop.getBoundingClientRect();
    const pipeBottomRect = pipeBottom.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    // Sortie de l'écran vertical
    if (
        characterRect.top < gameRect.top ||
        characterRect.bottom > gameRect.bottom
    ) {
        triggerGameOver();
    }

    // Collision avec les tuyaux
    if (
        collision(characterRect, pipeTopRect) ||
        collision(characterRect, pipeBottomRect)
    ) {
        triggerGameOver();
    }
}, 10);

function collision(rect1, rect2) {
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function jump() {
    jumping = 1;
    let jumpCount = 0;

    const jumpInterval = setInterval(function () {
        const characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 5 + "px";
        }

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
        }

        jumpCount++;
    }, 10);
}

function triggerGameOver() {
    if (gameOver) return;
    gameOver = true;

    setTimeout(() => {
        alert("Game over. Score : " + counter);
        character.style.top = "100px";
        counter = 0;
        gameOver = false;
        firstLoop = true;

        // Reset obstacle position
        holeTop = 175;
        pipeTop.style.height = holeTop + "px";
        pipeBottom.style.top = holeTop + 150 + "px";
        pipeBottom.style.height = 550 - holeTop - 150 + "px";
    }, 100);
}
