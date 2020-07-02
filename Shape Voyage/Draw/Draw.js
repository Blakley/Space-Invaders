
/* Loop canvas drawing items */
var animation_frame;
var finishedCount = false;
function gameLoop() 
{    
    /* Game pause functionality */
    if (pauseTheGame == true) {
        return;
    }

    /* Remove Begin timer when the game starts */
    if (startTimer == 10 && !finishedCount) {
        finishedCount = true;
        removeText();
    }

    /* update screen with updated canvas items */
    context.clearRect(0, 0, game.width, game.height);
    updatePlayer();
    startMatch();
    animation_frame = window.requestAnimationFrame(gameLoop);
}


/* Handle pausing the game */
function pauseGame() 
{    
    hideStats();
    pauseTheGame = !pauseTheGame;
    showPauseMenu();
    window.removeEventListener("keydown", controller.keyListener);
    
    if (!pauseTheGame) {
        displayStats();
        calledPause = false;
        window.addEventListener("keydown", controller.keyListener);
        hidePauseMenu();  
        gameLoop();
    }
}