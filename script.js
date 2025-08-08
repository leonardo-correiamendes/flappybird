var obstacle = document.getElementById("obstacle");
var pipeTop = document.getElementById("pipeTop");
var pipeBottom = document.getElementById("pipeBottom");
var character = document.getElementById("character");
var game = document.getElementById("game");

var jumping = 0;
var counter = 0;
var gameOver = false;
var firstLoop = true;

obstacle.addEventListener("animationiteration", () => {
    var holePosition = Math.floor(Math.random() * 250) + 50;
    pipeTop.style.height = holePosition + "px";
    pipeBottom.style.top = holePosition + 150 + "px";
    pipeBottom.style.height = 550 - holePosition - 150 + "px";

    if (!firstLoop) {
        counter++;
        console.log("Score:", counter);
    } else {
        firstLoop = false;
    }
});

setInterval(function () {
    if (gameOver) return;

    var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping === 0) {
        character.style.top = characterTop + 3 + "px";
    }

    var characterRect = character.getBoundingClientRect();
    var pipeTopRect = pipeTop.getBoundingClientRect();
    var pipeBottomRect = pipeBottom.getBoundingClientRect();
    var gameRect = game.getBoundingClientRect();

    if (
        characterRect.top < gameRect.top ||
        characterRect.bottom > gameRect.bottom
    ) {
        triggerGameOver();
    }

    if (
        pipeTopRect.left < characterRect.right &&
        pipeTopRect.right > characterRect.left &&
        (characterRect.top < pipeTopRect.bottom ||
            characterRect.bottom > pipeBottomRect.top)
    ) {
        triggerGameOver();
    }
}, 10);

const frames = [
    "img/flappy_frame_1.png",
    "img/flappy_frame_2.png",
    "img/flappy_frame_3.png",
    "img/flappy_frame_4.png",
];
let frameIndex = 0;
let animationInterval = null;

function startFlapAnimation() {
    if (animationInterval) return; // déjà en cours
    animationInterval = setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        character.style.backgroundImage = `url('${frames[frameIndex]}')`;
    }, 100);
}

function stopFlapAnimation() {
    clearInterval(animationInterval);
    animationInterval = null;
    frameIndex = 0;
    character.style.backgroundImage = `url('${frames[0]}')`;
}

function jump() {
    if (gameOver) return;
    jumping = 1;
    let jumpCount = 0;

    startFlapAnimation(); // Lance les ailes

    const jumpInterval = setInterval(() => {
        let characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 5 + "px";
        }

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            stopFlapAnimation(); // Stoppe les ailes
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
        pipeTop.style.height = "200px";
        pipeBottom.style.top = "350px";
        pipeBottom.style.height = "200px";
    }, 100);
}
