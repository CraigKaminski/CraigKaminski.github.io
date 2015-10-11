// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The x and y coordinates of the enemy. The x value is
    // random negative multiple of the enemy's width. This
    // prevents all the enemies from appearing at the same time.
    this.x = (Math.floor(Math.random() * 3) + 1) * -101;

    // The y value is randomly generated to place the enemy
    // in one of the three stone rows. An extra 25 pixels
    // is subtracted at the end so the enemy lines up with the
    // row it is in.
    this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 25;

    // The speed at with the enemy moves.
    this.speed = Math.floor(Math.random() * 100) + 151;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply the enemy's speed by the change in time to
    // determine how much the x coordinate has changed.
    this.x += dt * this.speed;

    // If the x value of the enemy will result in the enemy
    // being off the screen, move the enemy back to a random
    // position on the left side of the board.
    if (this.x > 506) {
        this.x = (Math.floor(Math.random() * 3) + 1) * -101;
        this.y = (Math.floor(Math.random() * 3) + 1) * 83 - 25;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player object
var Player = function () {
    // The image/sprite used to represent the player
    this.sprite = 'images/char-boy.png';

    // The x and y coordinates of the player.
    this.x = 2 * 101;
    // 35 pixels are subtracted from the y coordinate
    // so the player lines up with the row it is in.
    this.y = 5 * 83 - 35;
};

// Updated the players position
Player.prototype.update = function() {
    // Prevent the player from leaving the left or
    // right side of the screen.
    if (this.x < 0) this.x = 0;
    if (this.x > 4 * 101) this.x = 4 * 101;

    // If the player reaches the water row, send them
    // back to the starting point.
    if (this.y < 83 - 35) {
        this.x = 2 * 101;
        this.y = 5 * 83 - 35;
    }

    // Prevent the player from leaving the bottom of
    // the screen.
    if (this.y > 5 * 83 - 35) this.y = 5 * 83 - 35;
};

// Draw the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle the keyboard input that moves the player.
Player.prototype.handleInput = function(direction) {
    // Change the change in x or y coordinate by the
    // appropriate amount depending on which key was hit.
    switch(direction) {
        case 'left':
            this.x -= 101;
            return;
        case 'up':
            this.y -= 83;
            return;
        case 'right':
            this.x += 101;
            return;
        case 'down':
            this.y += 83;
            return;
    }
};

// Create array to hold enemies, instantiate enemies, and
// store them in array.
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy());
}

// Instantiate player.
var player = new Player();

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
