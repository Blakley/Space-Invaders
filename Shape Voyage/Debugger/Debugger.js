/* debugger info */
var playerPos = document.createElement("p");
var screenDim = document.createElement("p");
var playerType = document.createElement("p");
var gameDifficulty = document.createElement("p");

playerPos.id = 'debugger';
screenDim.id = 'debugger';
playerType.id = "debugger";
gameDifficulty.id = "debugger";

var debuggerDiv = document.getElementById("Debugger");
debuggerDiv.appendChild(screenDim);
debuggerDiv.appendChild(playerPos);
debuggerDiv.appendChild(playerType);
debuggerDiv.appendChild(gameDifficulty);

function debug(player)
{
    screenDim.innerHTML = "Screen Dimension: (" + game.width + "px, " + game.height + "px)";
    playerPos.innerHTML = "Player Position: (x: " + player.x.toFixed(1) + ", y: " + player.y.toFixed(1) + ")";

    let myPlayer = "Circle";
    if (player == square) {myPlayer = "Square";}
    let difficulty = "";

    if (player == circle || player == square)
    {
        if (player.speed == 6)
            difficulty = "Easy";
            
            
        if (player.speed == 4)
            difficulty = "Medium";


        if (player.speed == 2)
            difficulty = "Hard";
    }
    else 
    {
        if (player.speed == 15)
            difficulty = "Easy";
            
            
        if (player.speed == 10)
            difficulty = "Medium";


        if (player.speed == 5)
            difficulty = "Hard";
    }

    playerType.innerHTML = "Selected Character = " + myPlayer;
    gameDifficulty.innerHTML = "Game Difficulty = " + difficulty;
}