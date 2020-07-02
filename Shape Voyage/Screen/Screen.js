/* Create the drawing variables */
var game = document.createElement("canvas");
var context = game.getContext('2d');
var active = false;
var finishedCountDown = false;

/* Setup the game drawing screen and settings */
function setScreen(game) 
{
    $('#GameDiv').show();
    game.id       = 'game'; 
    game.width    = 768;    
    game.height   = 900;    
    document.getElementById("GameDiv").appendChild(game);
    active = true;    
    getSettings();
    hideTitle();
    displayStats();
    var messenger = new Messenger($('#gameText'));
    startCountDown();
    $('#playerLives').hide();
    gameLoop();
}
