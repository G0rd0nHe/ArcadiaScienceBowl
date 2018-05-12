function SaucerLaser(pos, iden) {
	this.pos = pos.copy();
	this.vel = createVector((ship.pos.x - this.pos.x) / 80, (ship.pos.y - this.pos.y) / 80);
	this.causeD = false;
	this.iden = iden;

	this.update = function() {
		this.pos.add(this.vel);
  	}

  	this.render = function() {
     push();
     strokeWeight(8);
     if(this.causeD) {
     	fill(255);
     	ellipse(this.pos.x, this.pos.y, 50, 50);
     }
     stroke(255);
     point(this.pos.x, this.pos.y);
     pop();
    }

    this.hits = function(obstacle) {
    	if(obstacle) {
    		var d = dist(this.pos.x, this.pos.y, obstacle.pos.x, obstacle.pos.y);
     		return d < obstacle.r;
    	}else {
    		return false
    	}
    }

    this.offscreen = function() {
     return this.pos.y > height || this.pos.y < 0 || this.pos.x > width || this.pos.x < 0;
    }
}
