function Asteroid(pos, r, life) {
  if (pos) {
    this.pos = pos.copy();
  } else {
    this.pos = createVector(random(width), random(height));
  }
  this.r = r * 0.5 || random(40, 60);
  this.life = life || 3;
  
  this.vel = p5.Vector.random2D().mult((4 - this.life));
  this.total = floor(random(10, 15));
  this.offset = [];
  this.causeD = false;
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.2, this.r * 0.2);
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() {
    push();
    if(this.causeD) {
      strokeWeight(4);
    }
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  this.breakup = function() {
    switch(this.life) {
      case 3: 
      score += 10;
      break;
      case 2: 
      score += 20;
      break;
      case 1: 
      score += 40;
      break;
      default: 
      break;
    }
    this.life--;
    var newA = [];
    if(this.life > 0) {
      newA[0] = new Asteroid(this.pos, this.r, this.life);
      newA[1] = new Asteroid(this.pos, this.r, this.life);
    }
    return newA;
  }

  this.saucerHit = function(){
    this.life--;
    var newA = [];
    if(this.life > 0) {
      newA[0] = new Asteroid(this.pos, this.r, this.life);
      newA[1] = new Asteroid(this.pos, this.r, this.life);
    }
    return newA;
  }

  this.edges = function() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
