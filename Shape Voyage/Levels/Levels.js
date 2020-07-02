/* End game when finished */
function finishedGame()
{
    if (enemies.length == 0)
    {
        document.getElementById("deathScreenText").innerHTML = + '\xa0\xa0\xa0' + "WINNER!";
        $('#deathScreen').show();
        $('#pauseScreen').hide();
        $('#GameDiv').hide();
        $('#playerStats').hide();
        window.removeEventListener("keydown", controller.keyListener);
        let scoreText = "SCORE: " + score.toString();
        document.getElementById("myProgress").innerHTML = scoreText;
        pauseTheGame = true;
    }
}

/* Increases the player's score */
function increasePlayerScore(enemyType) {
    let type = enemyType.color;
    switch (type) {
        case 'white':
            score += 10;
            break;
        case 'grey':
            score += 20;
            break;
        case 'blue':
            score += 30;
            break;
        case 'red':
            score += 50;
            break;
    }
    let myScore = document.getElementById("playerScore");
    let updatedScore = "SCORE : " + '\xa0\xa0' + score.toString();
    myScore.innerHTML = updatedScore;
}

/* Removes an enemy bullet upon collision */
function removeAnEnemyBullet(bulletIndex) {
    enemyBullets.splice(bulletIndex, 1);
}

/* Removes old enemy bullets from bullet array */
function removeEnemyBullets() {
    let countedBullets = 0;
    for (let i = 0; i < enemyBullets.length; i++) {
        let enemy_bullet = enemyBullets[i];
        if (enemy_bullet.y >= 820) {
            countedBullets++;
        }
    }
    if (countedBullets > 0) {
        enemyBullets = [];
    }
}

/* Handle enemy firing  & drawing a enemy bullet */
function fireEnemyBullet() 
{
    if (enemyBullets.length >= 7) {
        removeEnemyBullets();
    }
    else
    {
        for (let i = 0; i < enemyBullets.length; i++) {
            let enemy_bullet = enemyBullets[i];
            if (enemy_bullet.enemy == true) 
            {
                /* alter the bullets position */
                enemy_bullet.y += enemy_bullet.speed;
                if (enemy_bullet.y > 0 && enemy_bullet.y < 830)
                {
                    context.beginPath();
                    context.arc(enemy_bullet.x, enemy_bullet.y, 5, 0, 2 * Math.PI);
                    context.strokeStyle = 'white';
                    context.stroke();
                    context.fillStyle = 'white';
                    context.fill();
                }
            }
        }
    }    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/* Selects a random enemy */
function selectEnemy() {
    let rGroup = getRandomInt(0, enemies.length - 1);
    for (let i = 0; i < enemies.length; i++) 
    {
        let ggroup = enemies[i].group;
        let gLength = ggroup.length - 1;
        let indexVal = getRandomInt(0, gLength);
        if (i == rGroup) {
            let setEnemy = ggroup[indexVal];
            return setEnemy;
        }
    }
}

/* Create enemy bullets */
var enemyBullets = [];
function createEnemyBullet() {
   
    if (finishedCount == true)
    {
        // call this function every 3 seconds until the game ends
        if (enemies.length > 0)
        {
            let new_bullet = Object.create(bullet);
            new_bullet.player = false;
            new_bullet.enemy = true;
            let randomEnemy = selectEnemy();
            new_bullet.x = randomEnemy.x;
            new_bullet.y = randomEnemy.y;
            enemyBullets.push(new_bullet);
        }
    }
}

/* Removes old player bullets from the bullet array */
function removeBullets() 
{
    let countedBullets = 0;
    for (let i = 0; i < screenBullets.length; i++) {
        let my_bullet = screenBullets[i];
        if (my_bullet.y <= 530) {
            countedBullets++;
        }
    }
    if (countedBullets > 0) {
        screenBullets = [];
        fireBulletCount = 0;
    }
}

/* removes a player's bullet upon collision */
function removeABullet(bulletIndex) {
   screenBullets.splice(bulletIndex, 1);
}

/* removes an enemy upon collision */
function removeAEnemy(enemyGroup, enemyIndex) {
    for (let i = 0; i < enemies.length; i++) {
        let grouping = enemies[i].group;
        if (i == enemyGroup) {
            for (let j = 0; j < grouping.length; j++) {
                if (j == enemyIndex) {
                    grouping.splice(j, 1);
                }
            }
        }
        /* remove the enemyRow from the array if it's empty */
        if (grouping.length == 0) {
            enemies.splice(i, 1);
            finishedGame();
        }
    }
}

/* Draws recent bullets on to the screen */
function drawBullet()
{
    if (screenBullets.length >= 7) {
        removeBullets();
    }
    else
    {
        for (let i = 0; i < screenBullets.length; i++) {
            let my_bullet = screenBullets[i];
            if (my_bullet.player == true) 
            {
                /* alter the bullets position */
                my_bullet.y -= my_bullet.speed;
                if (my_bullet.y > 0 )
                {
                    context.beginPath();
                    context.arc(my_bullet.x, my_bullet.y, 5, 0, 2 * Math.PI);
                    context.strokeStyle = 'white';
                    context.stroke();
                    context.fillStyle = 'white';
                    context.fill();
                }
            }
            /* draw new bullet after the last bullet reaches a certain height. */
            if(i == screenBullets.length - 1) {
                if (my_bullet.y <= 530) {
                    fireBulletCount = 0;
                }
            }
        }
    }
}

/* Bullet drawing */
var screenBullets = [];
function createBullet(new_bullet) {

    let triangleXPath = 0;
    let triangleYPath = 0;
    if (player == triangle) {
        triangleXPath = (player.x/2), (player.y/2) - player.h;
        triangleYPath = player.y;
        new_bullet.x = triangleXPath;
        new_bullet.y = 760;
    }
    else {
        new_bullet.x = player.x;
        new_bullet.y = player.y;
    }
    screenBullets.push(new_bullet);
}

/* Increment the enemies speed */
function speedUpEnemy() {

    /* Determine what the speed increase is */
    let speedIncrease = 0;
    if (document.getElementById('difficulty1').checked) {
        speedIncrease = 5;
        enemyFireRate = 1000;
    }
    else if (document.getElementById('difficulty2').checked) {
        speedIncrease = 7;
        enemyFireRate = 1000;
    }
    else {
        speedIncrease = 10;
        enemyFireRate = 1000;
    }

    for (let i = 0; i < enemies.length; i++) {
        let enemyGroup = enemies[i].group;
        for (let j = 0; j < enemyGroup.length; j++) {
           if(enemyGroup[j].speed != speedIncrease) {
                enemyGroup[j].speed = speedIncrease;
           }
        }
    }    
}

/* Changes the y position of the enemies */
var keepMovingY = true;
function moveEnemiesY() {
    for (let i = 0; i < enemies.length; i++) 
    {
        let enemyGroup = enemies[i].group;
        for (let j = 0; j < enemyGroup.length; j++) {
            if (enemyGroup[j].y <= 530) {
                enemyGroup[j].y += 5;
            }
            else {
                enemyGroup[j].y += 5;   
                keepMovingY = false;
            }
        }
    }
    directionChangedCount = 0;
}

/* Removes a broken wall */
var r1 = 1;
var r2 = 1;
var r3 = 1;
var r4 = 1;
function removeWall() {
    if (wall_one_health >= 110 && r1 == 1) {
        wall_1[0].x = 0;
        wall_1[0].y = 1200;
        r1 = 0;
    }

    if (wall_two_health >= 110 && r2 == 1) {
        wall_2[0].x = 0;
        wall_2[0].y = 1200;
        r2 = 0;
    }

    if (wall_three_health >= 110 && r3 == 1) {
        wall_3[0].x = 0;
        wall_3[0].y = 1200;
        r3 = 0;
    }

    if (wall_four_health >= 110 && r4 == 1) {
        wall_4[0].x = 0;
        wall_4[0].y = 1200;
        r4 = 0;
    }
}

/* Determine if a player's bullet collides with the protective wall */
var wall_one_health = 0;
var wall_two_health = 0;
var wall_three_health = 0;
var wall_four_health = 0;
function collidesWall(bullet_x, bullet_y, theBullet) 
{
    let wall_one_x = wall_1[0].x;
    let wall_two_x = wall_2[0].x;
    let wall_three_x = wall_3[0].x;
    let wall_four_x = wall_4[0].x;

    let wall_one_y = wall_1[0].y;
    let wall_two_y = wall_2[0].y;
    let wall_three_y = wall_3[0].y;
    let wall_four_y = wall_4[0].y;

    let wall_one_h = wall_1[0].h;
    let wall_two_h = wall_2[0].h;
    let wall_three_h = wall_3[0].h;
    let wall_four_h = wall_4[0].h;

    let wall_one_w = wall_1[0].w;
    let wall_two_w = wall_2[0].w;
    let wall_three_w = wall_3[0].w;
    let wall_four_w = wall_4[0].w;


    if ( (bullet_x >= wall_one_x && bullet_x <= wall_one_x + wall_one_w) && 
    (bullet_y >= wall_one_y && bullet_y <= wall_one_y + wall_one_h)) 
    {

        wall_one_health++;
        theBullet.y = 1200;
        theBullet.x = 900;
    }

    if ( (bullet_x >= wall_two_x && bullet_x <= wall_two_x + wall_two_w) && 
    (bullet_y >= wall_two_y && bullet_y <= wall_two_y + wall_two_h)) 
    {
        wall_two_health++;
        theBullet.y = 1200;
        theBullet.x = 900;
    }

    if ( (bullet_x >= wall_three_x && bullet_x <= wall_three_x + wall_three_w) && 
    (bullet_y >= wall_three_y && bullet_y <= wall_three_y + wall_three_h)) 
    {
        wall_three_health++;
        theBullet.y = 1200;
        theBullet.x = 900;
    }

    if ( (bullet_x >= wall_four_x && bullet_x <= wall_four_x + wall_four_w) && 
    (bullet_y >= wall_four_y && bullet_y <= wall_four_y + wall_four_h)) 
    {
        wall_four_health++;
        theBullet.y = 1200;
        theBullet.x = 900;
    }

    removeWall();
}

/* Determine if a player's bullet collides with the enemy */
function collidesEnemy(bullet_x, bullet_y, bulletIndex) 
{
    for (let i = 0; i < enemies.length; i++) {
        let enemyGroup = enemies[i].group;
        for (let j = 0; j < enemyGroup.length; j++) {
            let currentEnemy = enemyGroup[j];
            if ( (bullet_x >= currentEnemy.x && bullet_x <= currentEnemy.x + currentEnemy.w) && 
                  bullet_y >= currentEnemy.y && bullet_y <= currentEnemy.y + currentEnemy.h) 
            {
                /* bullet collided with an enemy */
                removeABullet(bulletIndex); // remove current bullet
                removeAEnemy(i, j); // remove current enemy
                increasePlayerScore(currentEnemy);
            }
        }
    }
}

/* Move the enemy row in a direction */
var direction = "left";
var directionChangedCount = 0;
function moveEnemies(row) {
    
    /* Start moving the enemies after the countdown stops. */
    if (finishedCount == true)
    {
        for (let i = 0; i < row.length; i++)
        {
            if (direction == "left") {
                if (directionChangedCount > 0) {
                    if (keepMovingY) { 
                        moveEnemiesY();
                    } else {
                        speedUpEnemy();
                    }
                }
                row[i].x -= row[i].speed;
            }
            if (direction == "right") {
                if (directionChangedCount > 0) {
                    if (keepMovingY) {
                        moveEnemiesY();
                    } else {
                        speedUpEnemy();
                    }
                } 
                row[i].x += row[i].speed;
            }
        }
    }
}

/* Decreases a player's life */
function decreaseLife() {
    if (livesCount >= 1) {
        $('#deathScreen').show();
        $('#pauseScreen').hide();
        $('#GameDiv').hide();
        $('#playerStats').hide();
        window.removeEventListener("keydown", controller.keyListener);
        let scoreText = "FINAL SCORE: " + score.toString();
        document.getElementById("myProgress").innerHTML = scoreText;
        pauseTheGame = true;
    }
}

/* Collision handling for player collision from enemy */
var livesCount = 0;
function collidesPlayer(bullet_x, bullet_y, bulletIndex)
{
    let decreasedLife = false;

    if  (player.x >= bullet_x && player.x <= bullet_x + 15 &&
         player.y >= bullet_y - 15 && player.y <= bullet_y + 15
        )
    {
        livesCount++;
        removeAnEnemyBullet(bulletIndex);
        decreaseLife();  
    }   
}

/* Handle player, enemy, and bullet collision */
function gameCollision()
{
    /* Handle player-wall collision */
    switch (player)
    {
        case circle:
            if (player.x <= 13)
                player.x = 13;
            if (player.x >= game.width - player.r)
                player.x = game.width - player.r;
            break;
        case square:
            if (player.x <= 0)
                player.x = 0;
            if (player.x >= game.width - player.w)
                player.x = game.width - player.w;
            break;
        case triangle:
            if (player.x <= 60)
                player.x = 60;
            if (player.x >= 1485)
                player.x = 1485;
            break;
    }

    /* Handle bullet on enemy & wall collision */
    for (let i = 0; i < screenBullets.length; i++)
    {
        let myBullet = screenBullets[i];
        let x = myBullet.x;
        let y = myBullet.y;
        let bulletIndex = i;
        collidesWall(x, y, myBullet);
        collidesEnemy(x, y, bulletIndex);
    }

    /* Handle bullet on player & wall collision */
    for (let j = 0; j < enemyBullets.length; j++)
    {
        let enemyBullet = enemyBullets[j];
        let x = enemyBullet.x;
        let y = enemyBullet.y;
        let bulletIndex = j;
        collidesWall(x, y, enemyBullet);
        collidesPlayer(x, y, bulletIndex);
    }
}

/* Handle enemy-wall collision */
function wallCollision() {
    for (let r = 0; r < enemies.length; r++) {
        enemyRow = enemies[r].group;
        for (let i = 0; i < enemyRow.length; i++) 
        {
            if (enemyRow[i].x <= 0) {
                directionChangedCount++;
                direction = "right";
            }
            else if (enemyRow[i].x >= 750) {
                directionChangedCount++;
                direction = "left";
            }
        }
    }
}


/* Draw the non-dead enemy objects */
function drawEnemies(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

/* Create the collection of enemy objects */
var enemies = [];
function createEnemies() 
{
    /* 5th row of enemies: worth 50pts */
    let group_5 = [];    
    for (let i = 0; i < 11; i++)  {
        let new_enemy = Object.create(enemy);
        switch(i)
        {
            case 0:
                new_enemy.x = 180;
                new_enemy.y = 150;
                break;
            case 1:
                new_enemy.x = 220;
                new_enemy.y = 150;
                break;
            case 2:
                new_enemy.x = 260;
                new_enemy.y = 150;
                break;
            case 3:
                new_enemy.x = 300;
                new_enemy.y = 150;
                break;
            case 4:
                new_enemy.x = 340;
                new_enemy.y = 150;
                break;
            case 5:
                new_enemy.x = 380;
                new_enemy.y = 150;
                break;
            case 6:
                new_enemy.x = 420;
                new_enemy.y = 150;
                break;
            case 7:
                new_enemy.x = 460;
                new_enemy.y = 150;
                break;
            case 8:
                new_enemy.x = 500;
                new_enemy.y = 150;
                break;
            case 9:
                new_enemy.x = 540;
                new_enemy.y = 150;
                break;
            case 10:
                new_enemy.x = 580;
                new_enemy.y = 150;
                break;
        }
        group_5.push(new_enemy);
    }
    let enemies_5 = {color: "red", group: group_5};
    enemies.push(enemies_5);

    /* 4th row of enemies: worth 30pts */
    let group_4 = [];    
    for (let i = 0; i < 11; i++)  {
        let new_enemy = Object.create(enemy);    
        switch(i)
        {
            case 0:
                new_enemy.x = 180;
                new_enemy.y = 200;
                break;
            case 1:
                new_enemy.x = 220;
                new_enemy.y = 200;
                break;
            case 2:
                new_enemy.x = 260;
                new_enemy.y = 200;
                break;
            case 3:
                new_enemy.x = 300;
                new_enemy.y = 200;
                break;
            case 4:
                new_enemy.x = 340;
                new_enemy.y = 200;
                break;
            case 5:
                new_enemy.x = 380;
                new_enemy.y = 200;
                break;
            case 6:
                new_enemy.x = 420;
                new_enemy.y = 200;
                break;
            case 7:
                new_enemy.x = 460;
                new_enemy.y = 200;
                break;
            case 8:
                new_enemy.x = 500;
                new_enemy.y = 200;
                break;
            case 9:
                new_enemy.x = 540;
                new_enemy.y = 200;
                break;
            case 10:
                new_enemy.x = 580;
                new_enemy.y = 200;
                break;
        }
        group_4.push(new_enemy);
    }
    let enemies_4 = {color: "blue", group: group_4};
    enemies.push(enemies_4);

    /* 3rd row of enemies */
    let group_3 = [];    
    for (let i = 0; i < 11; i++)  {
        let new_enemy = Object.create(enemy);    
        switch(i)
        {
            case 0:
                new_enemy.x = 180;
                new_enemy.y = 250;
                break;
            case 1:
                new_enemy.x = 220;
                new_enemy.y = 250;
                break;
            case 2:
                new_enemy.x = 260;
                new_enemy.y = 250;
                break;
            case 3:
                new_enemy.x = 300;
                new_enemy.y = 250;
                break;
            case 4:
                new_enemy.x = 340;
                new_enemy.y = 250;
                break;
            case 5:
                new_enemy.x = 380;
                new_enemy.y = 250;
                break;
            case 6:
                new_enemy.x = 420;
                new_enemy.y = 250;
                break;
            case 7:
                new_enemy.x = 460;
                new_enemy.y = 250;
                break;
            case 8:
                new_enemy.x = 500;
                new_enemy.y = 250;
                break;
            case 9:
                new_enemy.x = 540;
                new_enemy.y = 250;
                break;
            case 10:
                new_enemy.x = 580;
                new_enemy.y = 250;
                break;
        }
        group_3.push(new_enemy);
    }
    let enemies_3 = {color: "grey", group: group_3};
    enemies.push(enemies_3);

    /* 2nd row of enemies */
    let group_2 = [];    
    for (let i = 0; i < 11; i++)  {
        let new_enemy = Object.create(enemy);    
        switch(i)
        {
            case 0:
                new_enemy.x = 180;
                new_enemy.y = 300;
                break;
            case 1:
                new_enemy.x = 220;
                new_enemy.y = 300;
                break;
            case 2:
                new_enemy.x = 260;
                new_enemy.y = 300;
                break;
            case 3:
                new_enemy.x = 300;
                new_enemy.y = 300;
                break;
            case 4:
                new_enemy.x = 340;
                new_enemy.y = 300;
                break;
            case 5:
                new_enemy.x = 380;
                new_enemy.y = 300;
                break;
            case 6:
                new_enemy.x = 420;
                new_enemy.y = 300;
                break;
            case 7:
                new_enemy.x = 460;
                new_enemy.y = 300;
                break;
            case 8:
                new_enemy.x = 500;
                new_enemy.y = 300;
                break;
            case 9:
                new_enemy.x = 540;
                new_enemy.y = 300;
                break;
            case 10:
                new_enemy.x = 580;
                new_enemy.y = 300;
                break;
        }
        group_2.push(new_enemy);
    }
    let enemies_2 = {color: "white", group: group_2};
    enemies.push(enemies_2);

    /* 1st row of enemies */
    let group_1 = [];    
    for (let i = 0; i < 11; i++)  {
        let new_enemy = Object.create(enemy);   
        switch(i)
        {
            case 0:
                new_enemy.x = 180;
                new_enemy.y = 350;
                break;
            case 1:
                new_enemy.x = 220;
                new_enemy.y = 350;
                break;
            case 2:
                new_enemy.x = 260;
                new_enemy.y = 350;
                break;
            case 3:
                new_enemy.x = 300;
                new_enemy.y = 350;
                break;
            case 4:
                new_enemy.x = 340;
                new_enemy.y = 350;
                break;
            case 5:
                new_enemy.x = 380;
                new_enemy.y = 350;
                break;
            case 6:
                new_enemy.x = 420;
                new_enemy.y = 350;
                break;
            case 7:
                new_enemy.x = 460;
                new_enemy.y = 350;
                break;
            case 8:
                new_enemy.x = 500;
                new_enemy.y = 350;
                break;
            case 9:
                new_enemy.x = 540;
                new_enemy.y = 350;
                break;
            case 10:
                new_enemy.x = 580;
                new_enemy.y = 350;
                break;
        } 
        group_1.push(new_enemy);
    }
    let enemies_1 = {color: "white", group: group_1};
    enemies.push(enemies_1);

}

/* Creation of the protective walls */
var wall_1 = [];
var wall_2= [];
var wall_3 = [];
var wall_4 = [];
function createWalls() 
{
    let wall_one = {x: 100, y: 630, w: 70, h: 70};
    let wall_two = {x: 263, y: 630, w: 70, h: 70};
    let wall_three = {x: 441, y: 630, w: 70, h: 70};
    let wall_four = {x: 604, y: 630, w: 70, h: 70};

    wall_1.push(wall_one);
    wall_2.push(wall_two);
    wall_3.push(wall_three);
    wall_4.push(wall_four);
}

/* Draw each of the protective walls */
function drawProtectionWalls(x, y, w, h) {
    context.fillStyle = 'white';
    context.fillRect(x, y, w, h); 
}

/* Draw the horizontal in-game line */
function drawGameLine() {
    context.beginPath();
    context.moveTo(0, game.height-70);
    context.lineTo(game.width, game.height-70);
    context.strokeStyle = 'white';
    context.lineWidth = 5;
    context.stroke();
}

/* Draw all our game objects */
var match_started = false;
function startMatch() {
    /* Setup collections */
    if (!match_started) {
        createWalls();
        createEnemies();
        match_started = true;
        setInterval(function(){ createEnemyBullet(); }, enemyFireRate);
    }

    /* continously draw the walls */
    drawProtectionWalls(wall_1[0].x, wall_1[0].y, wall_1[0].w, wall_1[0].h);
    drawProtectionWalls(wall_2[0].x, wall_2[0].y, wall_2[0].w, wall_2[0].h);
    drawProtectionWalls(wall_3[0].x, wall_3[0].y, wall_3[0].w, wall_3[0].h);
    drawProtectionWalls(wall_4[0].x, wall_4[0].y, wall_4[0].w, wall_4[0].h);

    /* Draw the game line */
    drawGameLine();

    /* Provide the collision detection */
    gameCollision();

    /* Handle enemy drawing and positioning */
    for (let i = 0; i < enemies.length; i++)
    {
        /* Retrieve row color, enemies */
        let color = enemies[i].color;
        let group = enemies[i].group;
        
        moveEnemies(group);

        /* Draw each enemy within the row-group of enemies */
        for (let j = 0; j < group.length; j++)
        {
            let the_enemy = group[j];
            drawEnemies(the_enemy.x, the_enemy.y, the_enemy.w, the_enemy.h, color);
        }
    }
    wallCollision(); 


    /* Update the drawn bullets position */
    drawBullet();

    /* Update the drawn enemy bullets */
    fireEnemyBullet();
}

/* Continue the game from a checkpoint */
$('.continueTheGame').click(function() {
    
    /* Enable movement */
    window.addEventListener("keydown", controller.keyListener);
    
    // Game settings = easy 
    if (Actor.xSpeed == 0.5) {
        player.x = current_checkpoint.x;
        player.y = 835;
        Actor.levelHeight = 65;
    }
    else {
        player.x = 50; // first checkpoint
        player.y = 835;
        Actor.levelHeight = 65;
    }
    hideDeathMenu();
    startGameTimer();
    $('#gameTimer').show();

});

/* Quit the game and return to the Title Screen */
$('.returnToMenu').click(function() {
    window.location.reload(true);
});

/*  Resume Game menu button */
$('.resumeGame').click(function() {
    pauseGame();
});

/*  Quit Game menu button */
$('.quitGame').click(function() {
    window.location.reload(true);
});