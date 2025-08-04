var obstacle = document.getElementById("obstacle");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var game = document.getElementById("game");

var jumping = 0;
var counter = 0;
var gameOver = false;
var firstLoop = true;

hole.style.top = "175px";

obstacle.addEventListener("animationiteration", () => {
    if (firstLoop) {
        firstLoop = false;
        return;
    }
    var random = Math.floor(Math.random() * 300);
    hole.style.top = random + "px";
    counter++;
    console.log("Score:", counter);
});

setInterval(function () {
    if (gameOver) return;

    var characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue("top")
    );
    if (jumping == 0) {
        character.style.top = characterTop + 3 + "px";
    }

    var characterRect = character.getBoundingClientRect();
    var holeRect = hole.getBoundingClientRect();
    var obstacleRect = obstacle.getBoundingClientRect();
    var gameRect = game.getBoundingClientRect();

    if (
        characterRect.top < gameRect.top ||
        characterRect.bottom > gameRect.bottom
    ) {
        triggerGameOver();
    }

    if (
        obstacleRect.left < characterRect.right &&
        obstacleRect.right > characterRect.left &&
        (characterRect.top < holeRect.top ||
            characterRect.bottom > holeRect.bottom)
    ) {
        triggerGameOver();
    }
}, 10);

function jump() {
    jumping = 1;
    let jumpCount = 0;

    var jumpInterval = setInterval(function () {
        var characterTop = parseInt(
            window.getComputedStyle(character).getPropertyValue("top")
        );
        if (characterTop > 6 && jumpCount < 15) {
            character.style.top = characterTop - 5 + "px";
        }

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
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
        hole.style.top = "175px";
    }, 100);
}