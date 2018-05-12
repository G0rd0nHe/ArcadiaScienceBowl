function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);
  }
  
  this.render = function() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(obstacle) {
    if(obstacle) {
      var d = dist(this.pos.x, this.pos.y, obstacle.pos.x, obstacle.pos.y);
      return d < obstacle.r;
    }else {
      return false;
    }
  }

  this.offscreen = function() {
    return this.pos.y > height || this.pos.y < 0 || this.pos.x > width || this.pos.x < 0;
  }
}
