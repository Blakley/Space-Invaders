/* Player object types */
var circle = {
    x: 133,
    y: 775,
    r: 15,
    speed: 10.0,
    color: 'white',
    lives: 3
};

var square = {
    x: 110,
    y: 775,
    h: 40,
    w: 40,
    speed: 10.0,
    color: 'white',
    lives: 3
};

var triangle = {
    x: 265,
    y: 1540,
    h: 30,
    w: 25,
    speed: 15.0,
    color: 'white',
    lives: 3
}

var enemy = {
    x: 180,
    y: 0,
    h: 20,
    w: 20,
    speed: 5.0,
    fireRate: 1.0,
    color: 'white'
}

/* Bullet creation object */
var fireBulletCount = 0;
var enemyFireRate = 1500;
var bullet = {
    player: true,
    enemy: false,
    x: 0,
    y: 0,
    speed: 5.0
}

/* Update the player's position */
function updatePlayer() 
{
    /* handle player movemennt */
    if (controller.left) {
        player.x -= player.speed;
    }
    if (controller.right) {
        player.x += player.speed;
    }
    if (pressUp == true) {   
        if (fireBulletCount == 0) {
            let new_bullet = Object.create(bullet);
            createBullet(new_bullet);
            fireBulletCount++;
        }
    }

    /* show game debugger */
    // debug(player);

    /* Canvas drawing of each player type */
    if (player == circle) {
        context.beginPath();
        context.arc(player.x, player.y, player.r, 0, 2 * Math.PI);
        context.strokeStyle = player.color;
        context.stroke();
        context.fillStyle = player.color;
        context.fill();
    }
    else if (player == square) {
        context.fillStyle = player.color;
        context.fillRect(player.x, player.y, player.w, player.h);
    }
    else {
        let path = new Path2D();
        path.moveTo((player.x/2) + player.w, player.y/2);
        path.lineTo((player.x/2), (player.y/2) - player.h);
        path.lineTo((player.x/2) - player.w, player.y/2);
        context.fillStyle = player.color;
        context.fill(path);
    }
}

/* Obtain the desired game settings */
var player;
function getSettings() {
    
    /* Initialize player type */
    if(document.getElementById('player1').checked)
        player = circle;
    else if (document.getElementById('player2').checked)
        player = square;
    else
        player = triangle;

    /* initialize game difficulty */
    if(document.getElementById('difficulty1').checked) {
        if (player == circle)
            player.speed = 6.0;
        else if (player == square)
            player.speed = 6.0;
        else
            player.speed = 15.0;
        enemy.speed = 2.0;
        enemyFireRate = 1200;
    }
    else if (document.getElementById('difficulty2').checked) {
        if (player == circle) 
            player.speed = 4.0;
        else if (player == square)
            player.speed = 4.0;
        else
            player.speed = 10.0;   
        enemy.speed = 5.0;     
    }
    else {
        if (player == circle) 
            player.speed = 2.0;
        else if (player == square)
            player.speed = 2.0;
        else
            player.speed = 5.0;    
        enemy.speed = 7.0;
        enemyFireRate = 1000;
    }
}
