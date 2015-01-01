// These variables define the default maximum and minimum speeds of the Enemies, as well as the default number of Enemies
// The user can change these variable by clicking "Add Enemy" or "Increase Speed"
var maxSpeed=200;
var minSpeed=50;
var enemyLimit=3;

// The Enemy class includes a randomized Y position (i.e. each enemy could start on a different row), an initial X position of 0, a randomized speed (within certain 
// bounds, which can be increased by the player to increase difficulty) and a sprite image.
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.randomizeVertical();
    this.randomizeSpeed();
};

// This function updates the enemy's X position according to its assigned speed (enemies have varying speeds). The dt variable is used to control for time between
// machines/processors. After the enemy's position has been established, we call the checkCollisions function to determine if the player ran into an Enemy.
Enemy.prototype.update = function(dt) {
	if (this.x<500) {
		this.x=this.x+(dt*this.speed);
	} else {
		this.x=-100;
		this.randomizeVertical();
	}
	this.checkCollisions();	  
};

// This function randomizes the speed of an Enemy (within the bounds of max and min speeds set at the top of this file)
Enemy.prototype.randomizeSpeed = function() {
	this.speed = maxSpeed*Math.random()+minSpeed;
};

// Thius function randomizes the vertical placement of each Enemy (i.e. which row it will run in)
Enemy.prototype.randomizeVertical = function() {
	this.y = 83*(parseInt(3*Math.random())+1)-20;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function calculates the distance between the in-context Enemy and the Player
// If the Enemy and the Player have collided, the Player is reset to his initial square
Enemy.prototype.checkCollisions = function() {
  var xs = 0;
  var ys = 0;
  xs = player.x - this.x;
  xs = xs * xs;
  ys = player.y - this.y;
  ys = ys * ys;
  var distance = Math.sqrt( xs + ys );
  if (distance < 30) {
  	player.x=202;
  	player.y=377;
  }
};

// The Player class includes a starting X position, a starting Y position, and a sprite image
var Player = function() {
	this.sprite='images/char-princess-girl.png';
	this.x=202;
	this.y=377;
};

// The render function draws the player's character on the screen in the appropriate X, Y coordinates
Player.prototype.update = function() {};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This function determines which key the player pressed (up, right, left, down) and moves his character one space in the corresponding direction
Player.prototype.handleInput = function(keyCode) {
	console.log(keyCode);
	switch (keyCode) {
	    case "left":
	        if (player.x>1) player.x=player.x-101;
	        break;
	    case "right":
	        if (player.x<400) player.x=player.x+101;
	        break;
	    case "up":
	        if (player.y>120) {
	        	player.y=player.y-83;
	        } else {
	        	player.y=377;
	        }
	        break;
	    case "down":
	        if (player.y<370) player.y=player.y+83;
	        break;
	}
	console.log("X, Y: " + player.x+", "+player.y);

};

// A single player is instabtianted to the player variable. Meanwhile, a number of enemies equal to the enemyLimit (which can be configured by the player to increase 
// diffciulty) is added to the array allEnemies
var player = new Player();
var allEnemies=[];
for (var i=0; i<enemyLimit; i++) {
	var enemy = new Enemy();
	allEnemies.push(enemy);
}

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

// This function adds an Enemy to the game when the "Add Enemy!" button is clicked
document.getElementById("addEnemy").addEventListener("click", function(){
    var enemy = new Enemy();
    allEnemies.push(enemy);
});

// This function increases the speeds of all existing Enemies, and the maximum and minimum speeds of newly created Enemies.
document.getElementById("increaseSpeed").addEventListener("click", function(){
    maxSpeed=maxSpeed+100;
    minSpeed=minSpeed+50;
    allEnemies.forEach(function(enemy) {
        enemy.speed=enemy.speed+75;
    });

});
