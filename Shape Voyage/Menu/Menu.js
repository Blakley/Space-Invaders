/* */
$(() => {
    createMenu();
});

/* */
const menu = document.getElementById("Menu");
const helpMenu = document.getElementById("helpMenu");
const optionsMenu = document.getElementById("optionsMenu");
var currentMenu = "mainMenu";

// ------------------------------------
/* Game Sounds*/
// ------------------------------------

/* */
function playMenuMusic() {
    let music = document.getElementById("introMusic");
    music.volume = 0.1;
    music.play();     
}

/* */
function pauseMenuMusic() {
    let music = document.getElementById("introMusic");
    music.pause();
}

/* */
function playClickSound() {
    let click = document.getElementById("menuClick");
    click.play();
}

/* */
function playHoverSound() {
    let hover = document.getElementById("menuHover");
    hover.play();    
}

/* */
function playGameMusic() {
    let gameAudio = document.getElementById("gameMusic");
    gameAudio.volume = 0.1;
    gameAudio.play();
}

/* */
function pauseGameMusic() {
    let gameAudio = document.getElementById("gameMusic");
    gameAudio.pause();
}


// ------------------------------------
/**/
// ------------------------------------


/* */
function hideMainMenu() {
    $('#Menu').hide();
    $('#backArrow').show();
}

/* */
function showMainMenu() {
    currentMenu = "mainMain";
    $('#Menu').show();
    $('#backArrow').hide();
}

/* Sleep function */
function sleep(milliseconds) { 
    let timeStart = new Date().getTime(); 
    while (true) { 
        let elapsedTime = new Date().getTime() - timeStart; 
        if (elapsedTime > milliseconds) { 
            break; 
        } 
    } 
} 

/* */
function getNewGame() {
    let new_game = "START GAME";
    let div = document.createElement("div");
    div.id = "newGameDiv";
    div.onclick = function() {
        pauseMenuMusic();
        playClickSound();
        playGameMusic();
    }
    div.onmouseover = function () {
        playHoverSound();
    }
    let p = document.createElement("p");
    p.id = "newGame";
    p.innerHTML = new_game;
    div.appendChild(p);
    menu.appendChild(div);

    /* */
    var newGameClick = document.getElementById("newGame");
    newGameClick.onclick = function() {
        $('#Menu').hide();
        setScreen(game);
        controller.menu = false;
    }
}

/* */
function optionHelperMenu() {

    $('#optionsMenu').hide();

    /* */
    document.getElementById("difficultyOption").onmouseover = function() {
        playHoverSound();
    };
    document.getElementById("playerOption").onmouseover = function() {
        playHoverSound();
    };
    document.getElementById("difficultyOption").onclick = function() {
        playClickSound();
    };
    document.getElementById("playerOption").onclick = function() {
        playClickSound();
    };
}

/* */
function getOptions() {
    let options = "OPTIONS";
    let div = document.createElement("div");
    div.id = "optionsDiv";
    
    let p = document.createElement("p");
    p.id = "options";
    p.innerHTML = options;
    div.appendChild(p);
    menu.appendChild(div);

    div.onclick = function() {
        playClickSound();
        hideMainMenu();
        currentMenu = "optionMenu";
        $('#optionsMenu').show();
    }
    div.onmouseover = function () {
        playHoverSound();
    }
}

/* */
function helperMenu() {
    /* */
    let div = document.createElement("div");
    div.id = "keyBoardIcons";
    
    let myImage = new Image(768, 720);
    myImage.src = './Images/GameOptions.png';
    div.appendChild(myImage);

    let w = document.createElement("p");
    w.id ="_wKey";
    w.innerHTML = "Press the W key to fire.";
    div.appendChild(w);

    let a = document.createElement("p");
    a.id ="aKey";
    a.innerHTML = "Press the A key to move left.";
    div.appendChild(a);

    let d = document.createElement("p");
    d.id ="dKey";
    d.innerHTML = "Press the D key move right.";
    div.appendChild(d);

    let pkey = document.createElement("p");
    pkey.id ="pKey";
    pkey.innerHTML = "Press the P key to open the pause menu.";
    div.appendChild(pkey);

    let point1 = "10 PTS";
    let p1 = document.createElement("p");
    p1.id = "pointValue1";
    p1.innerHTML = point1;
    div.appendChild(p1);
    let point2 = "20 PTS";
    let p2 = document.createElement("p");
    p2.id = "pointValue2";
    p2.innerHTML = point2;
    div.appendChild(p2);
    let point3 = "30 PTS";
    let p3 = document.createElement("p");
    p3.id = "pointValue3";
    p3.innerHTML = point3;
    div.appendChild(p3);
    let point4 = "50 PTS";
    let p4 = document.createElement("p");
    p4.id = "pointValue4";
    p4.innerHTML = point4;
    div.appendChild(p4);
    
    /* */
    helpMenu.appendChild(div);
    $('#helpMenu').hide();

    /* */
    document.getElementById("keyBoardIcons").onmouseover = function() {
        playHoverSound();
    };
}

/* */
function getHelp() {
    let help = "HELP";
    let div = document.createElement("div");
    div.id = "helpDiv";

    let p = document.createElement("p");
    p.id = "help";
    p.innerHTML = help;
    div.appendChild(p);
    menu.appendChild(div);

    div.onclick = function() {
        playClickSound();
        hideMainMenu();
        currentMenu = "helpMenu";
        $('#helpMenu').show();
    }
    div.onmouseover = function () {
        playHoverSound();
    }
}

/* */
function getExitGame() {
    let exit_game = "EXIT";
    let div = document.createElement("div");
    div.id = "exitGameDiv";
    
    div.onclick = function() {
        playClickSound();
    }
    div.onmouseover = function () {
        playHoverSound();
    }
    
    let p = document.createElement("p");
    p.id = "exitGame";
    p.innerHTML = exit_game;
    div.appendChild(p);
    menu.appendChild(div);

    var exitGameClick = document.getElementById("exitGame");
    exitGameClick.onclick = function() {
        window.close();
    }
}

/* */
function getTitle() {   
    let div = document.createElement("div");
    div.id = "gameTitle";
    div.onclick = function() {
        playMenuMusic();
    }
    let myImage = new Image(450, 175);
    myImage.src = './Images/gameTitle.png';
    div.appendChild(myImage);
    document.getElementById("gameTitleDiv").appendChild(div);
}

/* */
function hideTitle() {
    $('#gameTitle').hide();
}

/* */
function showTitle() {
    $('#gameTitle').show();
}

/* */
function getBackButton() {
    let div = document.getElementById("menuBack");
    let backArrow = new Image(50, 50);
    backArrow.src = './Images/backArrow.png';
    backArrow.id = "backArrow";
    div.appendChild(backArrow);
    $('#backArrow').hide();
    div.onmouseover = function () {
        playHoverSound();
    }
    div.onclick = function() {
        playClickSound();
        backToMenu(currentMenu);
    }
}

/* */
function backToMenu() {
    switch(currentMenu) {
        case "mainMenu":
            return;
        case "helpMenu":
            $('#helpMenu').hide();
            showMainMenu();
            break;
        case "optionMenu":
            $('#optionsMenu').hide();
            showMainMenu();
            break;
    }
}

/* Create the death screen menu */
function hideDeathMenu() {
    $('#deathScreen').hide();
}

/* Show the death screen menu */
function showDeathMenu() {
    $('#deathScreen').show();
}

/* Hides the debugger */
function hideDebugger() {
    $('#Debugger').hide();
}

/* Hides the pause screen */
function hidePauseMenu() {
    $('#pauseScreen').hide();
}

/* Shows the pause screen */
function showPauseMenu() {
    $('#pauseScreen').show();
}

/* Set up the game menu */
function createMenu() {
    getNewGame();
    getOptions();
    optionHelperMenu();
    getHelp();
    helperMenu()
    getExitGame();
    getTitle();
    getBackButton();
    hideDeathMenu();
    hidePauseMenu();
    makeStats();
}