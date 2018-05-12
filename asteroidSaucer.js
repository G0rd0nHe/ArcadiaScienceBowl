function Saucer() {
	this.pos = createVector(random(width), random(height));
	this.vel = p5.Vector.random2D().mult(2);
  this.updateT = floor(random(0, 50));
	this.r = 20;
  this.causeD = false;
	this.update = function() {
    this.pos.add(this.vel);
    this.updateT++;
    if(this.updateT === 100) {
      this.vel = p5.Vector.random2D().mult(2);
      this.updateT = floor(random(0, 50));
    }
  }
	this.render = function() {
		push();
    translate(this.pos.x, this.pos.y);
    fill(0);
    if(this.causeD) {
      strokeWeight(4);
    }
    stroke(255);
    quad(-this.r * 1.5, 0, this.r * 1.5, 0, this.r - this.r / 4, this.r / 2, -this.r + this.r / 4, this.r / 2);
    quad(-this.r * 1.5, 0, this.r * 1.5, 0, this.r - this.r / 4, -this.r / 2, -this.r + this.r / 4, -this.r / 2);
    quad(this.r - this.r / 4, -this.r / 2, -this.r + this.r / 4, -this.r / 2, -this.r + this.r / 2, -this.r, this.r - this.r / 2, -this.r,);
    pop();
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
  this.hits = function(obstacle) {
    if(obstacle) {
      var d = dist(this.pos.x, this.pos.y, obstacle.pos.x, obstacle.pos.y);
      return d < this.r + obstacle.r;
    }else {
      return false;
    }
  }
  this.fire = function(iden) {
    saucerL.push(new SaucerLaser(this.pos, iden));
  }
}
