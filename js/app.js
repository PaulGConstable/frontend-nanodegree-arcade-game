//---------------------------------
// Enemy Classes
//---------------------------------
var Enemy = function(speed) {
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101; // value
    this.y = 65;
    this.speed = speed * Math.random()*100;
    // size of enemy graphic
    this.width = 101;
    this.height = 171;

};
// randomises the enemy's position
Enemy.prototype.startEnemyPos = function()
    {
        this.x= -101;
        this.y=(Math.round((Math.random()*2)+1)*83)-20;
    };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 510) {
        this.startEnemyPos ();
    }
    this.collisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collisions, if player intersects enemy, collision.
// Useful article for determining collision detection: http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/
Enemy.prototype.collisions = function() {
    if (this.x < (player.x + player.width - 20)  && (this.x + this.width - 20)  > player.x &&
        this.y < (player.y + player.height - 100) && (this.y + this.height - 100) > player.y) {
        //reset player back to start location
        player.playerLives -= 1;
        player.x = 202;
        player.y = 400;
        }
};

//---------------------------------
// Player Classes
//---------------------------------
var Player = function() {
    // The image/sprite for our Player, this uses
    // a helper provided to easily load images
    this.sprite = 'images/char-boy.png';
    // Player's start location
    this.x = 202; // value
    this.y = 400; // value
   // size of player graphic
    this.width = 101;
    this.height = 171;
    this.playerLives = 3;
};

// Update the Player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // reset the location if player makes the water
    if (this.y < 0) {
    this.x = 202; // returns back to x value start location
    this.y = 400; // returns back to y value start location
    score++;
    } else if (this.playerLives === 0)
    {
        alert ("Game Over. You scored " + score + " points") // alert message appears informing game over
        this.playerLives = 3; // lives are reset
        score = 0; // points total reset
    }

};


// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to handle keyboard movements of the player
Player.prototype.handleInput = function(keyCode){
    var horizontalMove = 100;
    var verticalMove = 85;
    // Move left
    if (keyCode === 'left' && this.x > 100) {
        this.x -= horizontalMove;
    }
    // Keep player inside left boundary
    else if (keyCode === 'left' && this.x < 0) {
        this.x = false;
    }
    // Move up
    else if (keyCode === 'up' && this.y > 0) {
        this.y -= verticalMove;
    }
    // Keep player inside upper boundary
    else if (keyCode === 'up' && this.y < 0) {
        this.y = false;
    }
    // Move right
    else if (keyCode === 'right' && this.x < 400) {
        this.x += horizontalMove;
    }
    // Keep player inside right boundary
    else if (keyCode === 'right' && this.x > 500) {
        this.x = false;
    }
    // Move down
    else if (keyCode === 'down'  && this.y < 340) {
        this.y += verticalMove;
    }
    // Keep player inside lower boundary
    else if (keyCode === 'down' && this.y > 425) {
        this.y = false;
    }
};


//---------------------------------
// Global game objects
//---------------------------------

// Instantiate enemy objects.
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy(i));
    };
// Instantiate Player object.
var player = new Player(0);

// Points tally
var score = 0

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
