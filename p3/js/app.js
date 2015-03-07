// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 72;
    this.speed = 0;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.y = 72*Math.floor(Math.random()*3 +1);
        this.x = 0;
    }    
    this.x += (this.speed + level*2 + Math.floor(Math.random()*50 +10))*dt;

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Enemy.prototype.reset = function () {


}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = 410;
    this.sprite = "images/char-princess-girl.png";  
}

Player.prototype.checkCollisions = function(allEnemies, additionalEntity){
        var $this = this;
        
        
     
        allEnemies.forEach(function(enemy) {
            if (enemy.y -45  < $this.y && $this.y < enemy.y + 45 && 
                enemy.x +45 > $this.x && $this.x > enemy.x - 45) {
                lives--;
                if (lives == 0){  
                    stopped = true;   
                    allEnemies = [];
                   
                }
                player.reset();
            }
        });   

        if (additionalEntity.y -45  < $this.y && $this.y < additionalEntity.y + 45 && 
            additionalEntity.x +45 > $this.x && $this.x > additionalEntity.x - 45) {
            
            if (additionalEntity.rock){
                return false;
            } else if (additionalEntity.heart){
                additionalEntity.hide();
                lives++;
                return true;
            } else {
                additionalEntity.hide();
                points += 50;
                return true;
            }
            
        }       
        
    return true;
}

Player.prototype.render = function(){
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt){
   
    
}
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}
Player.prototype.handleInput = function(key){
    switch (key) {
        case 'left':            
            if (this.x > 0) { 
                this.x -= 100;
                if (!this.checkCollisions(allEnemies, additionalEntity)) {
                    this.x += 100;
                }
            }
        break;    
        case 'up':
            if (this.y > 60) {
                this.y -=90;
                if (!this.checkCollisions(allEnemies, additionalEntity)) {
                    this.y += 90;
                }                
            } else {
                this.reset();
                if (lives > 0) {
                    level++;
                    points += 10;
                    if (level%4 == 0 && allEnemies.length < 6) {
                        addEnemy();
                    }
                }
            }
        break;
        case 'right':
            if (this.x < 400) {
                this.x +=100;
                if (!this.checkCollisions(allEnemies, additionalEntity)) {
                    this.x -= 100;
                }                
            }
        break;
        case 'down':
            if (this.y < 400)  {
                this.y += 90;
                if (!this.checkCollisions(allEnemies, additionalEntity)) {
                    this.y -= 90;
                }                
            }
        break;        
    }
    
}


var AdditionalEntity = function(){
   this.lastTime = Date.now();
   this.x = -100;    
   this.y = -100;
   this.sprites = [
                'images/Gem Blue.png',
                'images/Gem Green.png', 
                'images/Gem Orange.png',
                'images/Heart.png',
                'images/Rock.png'
            ];
   index = Math.floor(Math.random()*5);
   this.rock = (index == 4);
   this.heart = (index == 3);
   this.sprite = this.sprites[index];       
   
}

AdditionalEntity.prototype.hide =  function(){
        this.x = -100;
        this.y = -100;
        this.lastTime = Date.now();
}

AdditionalEntity.prototype.render =  function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
AdditionalEntity.prototype.update =  function(){ 
     var now = Date.now();
        
     if (now - this.lastTime > 5000 ){   
        
        if (this.x < 0) {
            this.x = Math.floor(Math.random()*5) * 101;    
            this.y = Math.floor(Math.random()*3+1) * 72;
            index = Math.floor(Math.random()*5);
            this.rock = (index == 4);
            this.heart = (index == 3);            
            this.sprite = this.sprites[index];
            this.lastTime = now;
        }
    } 
    
   if (now - this.lastTime > 5000 ){   
       this.hide();
   } 
}



// Now instantiate your objects.
// 
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =[];

function addEnemy(){
    var enemy = new Enemy();
    enemy.y *= Math.floor(Math.random()*3 +1);
    enemy.x  = 0;
    enemy.speed = Math.floor(Math.random()*100 +50);
    setTimeout(function(){allEnemies.push(enemy);}, Math.floor(Math.random()*10000 +500));        
}
var additionalEntity = new AdditionalEntity();
var player = new Player();
for (i=0; i < 3; i++){
    addEnemy();
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
    if (!stopped) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
