var ship;
var asteroids = [];
var lasers = [];
var game = false;
var score = 0;
var saucers = [];
var saucerL = [];
var m;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
    checkStartDA(i);
  }
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width / 8);
  textFont('Courier');
  text("Asteroids", width / 2, height / 4);
  textSize(width / 48);
  text("Press \"R\" to start\n\"W\" or up-arrow to accelerate\n\"A\" or right-arrow to turn right\n\"D\" or left-arrow to turn left\n\"S\" or space to shoot", width / 2, height / 2);
  game = false;
}

function draw() {
  m = millis();
  if(game) {
    background(0);
    for(var i = asteroids.length - 1; i >= 0; i--) {
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }
    for(var i = asteroids.length - 1; i >= 0; i--) {
      for(var j = lasers.length - 1; j >= 0; j--) {
        if(lasers[j].hits(asteroids[i])) {
          if (asteroids[i].life > 0) {
            var newAsteroids = asteroids[i].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(i, 1);
          lasers.splice(j, 1);
          break;
        }
      }
    }
    for(var i = asteroids.length - 1; i >= 0; i--) {
      for(var j = saucerL.length - 1; j >= 0; j--) {
        if(saucerL[j].hits(asteroids[i])) {
          if(asteroids[i].life > 0) {
            var newAsteroids = asteroids[i].saucerHit();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(i, 1);
          saucerL.splice(j, 1);
          break;
        }
      }
    }
    for(var i = asteroids.length - 1; i >= 0; i--) {
      for(var j = saucers.length - 1; j >= 0; j--) {
        if(saucers[j].hits(asteroids[i])) {
          if(asteroids[i].life > 0) {
            var newAsteroids = asteroids[i].saucerHit();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(i, 1);
          saucers.splice(j, 1);
          break;
        }
      }
    }
    for(var i = asteroids.length - 1; i >= 0; i--) {
      if(ship.hits(asteroids[i])) {
        ship.life--;
        asteroids[i].causeD = true;
        asteroids[i].render();
        if(asteroids[i].life > 0) {
          var newAsteroids = asteroids[i].breakup();
          asteroids = asteroids.concat(newAsteroids);
        }
        asteroids.splice(i, 1);
        resetShip();
        break;
      }
    }
    for(var i = saucers.length - 1; i >= 0; i--) {
      saucers[i].render();
      saucers[i].update();
      saucers[i].edges();
    }
    for(var i = saucers.length - 1; i >= 0; i--) {
      if(ship.hits(saucers[i])) {
        score += 80;
        ship.life--;
        saucers[i].causeD = true;
        saucers[i].render();
        saucers.splice(i, 1);
        resetShip();
        break;
      }
    }
    for(var i = saucerL.length - 1; i >= 0; i--) {
      saucerL[i].render();
      saucerL[i].update();
      if(saucerL[i].offscreen()) {
        saucerL.splice(i, 1);
      }
    }
    for(var i = saucerL.length - 1; i >= 0; i--) {
      if(saucerL[i].hits(ship)) {
        ship.life--;
        saucerL[i].causeD = true;
        saucerL[i].render();
        saucers.splice(saucerL[i].iden, 1);
        saucerL = [];
        saucers.push(new Saucer());
        resetShip();
        break;
      }
    }
    for(var i = lasers.length - 1; i >= 0; i--) {
      lasers[i].render();
      lasers[i].update();
      if(lasers[i].offscreen()) {
        lasers.splice(i, 1);
      }
    }
    for(var i = lasers.length - 1; i >= 0; i--) {
      for(var j = saucers.length - 1; j >= 0; j--) {
        if(lasers[i].hits(saucers[j])) {
          score += 80;
          saucers.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    showScore();
    showLife(ship.life);
    if(m % 10000 <= 20) {
      saucers.push(new Saucer());
      checkStartDS(saucers.length - 1);
    }
    if(m % 1000 <= 20) {
      for (var i = saucers.length - 1; i >= 0; i--){
        saucers[i].fire(i);
      }
    }
    if(m % 5000 <= 20) {
      asteroids.push(new Asteroid());
      checkStartDA(asteroids.length - 1);
    }
  }
}

function checkStartDA(number) {
  if(dist(ship.pos.x, ship.pos.y, asteroids[number].pos.x, asteroids[number].pos.y) < 200) {
    asteroids[number].pos = createVector(random(width), random(height));
    checkStartDA(number);
  }
  for(var i = saucers.length - 1; i >= 0; i--) {
    if(saucers[i].hits(asteroids[number])) {
      asteroids[number].pos = createVector(random(width), random(height));
      checkStartDA(number);
    }
  }
}

function checkStartDS(number) {
  if(dist(ship.pos.x, ship.pos.y, saucers[number].pos.x, saucers[number].pos.y) < 200) {
    saucers[number].pos = createVector(random(width), random(height));
    checkStartDS(number);
  }
  for(var i = asteroids.length - 1; i >= 0; i--) {
    if(saucers[number].hits(asteroids[i])) {
      saucers[number].pos = createVector(random(width), random(height));
      checkStartDS(number);
    }
  }
}

function showScore() {
      fill(255);
      textAlign(LEFT, TOP);
      textSize(width / 48);
      textFont('Courier');
      text("score: " + score, 8, 4);
}

function showLife(life) {
  noFill();
  stroke(255);
  switch(life) {
    case 3: 
    triangle(-ship.r + 30, ship.r + 60, ship.r + 30, ship.r + 60, 30, -ship.r + 60);
    case 2: 
    triangle(-ship.r + 80, ship.r + 60, ship.r + 80, ship.r + 60, 80, -ship.r + 60);
    case 1: 
    triangle(-ship.r + 130, ship.r + 60, ship.r + 130, ship.r + 60, 130, -ship.r + 60);
    default: 
    break;
  }
}

function resetShip() {
  ship.pos = createVector(width / 2, height / 2);
  ship.pos = createVector(width / 2, height / 2);
  ship.heading = 0;
  ship.rotation = 0;
  ship.vel = createVector(0, 0);
  lasers = [];
  saucerL = []; 
  for(var i = asteroids.length - 1; i >= 0; i--) {
    checkStartDA(i);
  }
  for(var i = saucers.length - 1; i >= 0; i--) {
    checkStartDS(i);
  }
  game = false;
  if(ship.life > 0) {
    setTimeout(function() {
      game = true;
    }, 1000);
  }else {
    gameOver();
  }
}

function gameOver() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(width / 8);
  textFont('Courier');
  text("Game Over", width / 2, height / 4);
  textSize(width / 48);
  text("Press \"R\" to restart\n\"W\" or up-arrow to accelerate\n\"A\" or right-arrow to turn right\n\"D\" or left-arrow to turn left\n\"S\" or space to shoot", width / 2, height / 2);
  game = false;
}

function keyReleased() {
  if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW || key == 'D' || key == 'A') {
    ship.setRotation(0);
  }
  if (keyCode == UP_ARROW || key == 'W') {
    ship.boosting(false);
  }
}

function keyPressed() {
  if (key == ' ' || key == 'S') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW || key == 'D') {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW || key == 'A') {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW || key == 'W') {
    ship.boosting(true);
  }if (key == 'R' && game === false) {
    asteroids = [];
    lasers = [];
    score = 0;
    saucers = [];
    saucerL = [];
    ship = new Ship();
    for (var i = 0; i < 5; i++) {
      asteroids.push(new Asteroid());
      checkStartDA(i);
    }
    game = true;
  }
}
