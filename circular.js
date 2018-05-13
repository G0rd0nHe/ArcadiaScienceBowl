let particles = [];
let colors = [
'#EA2533', 
'#FEBC1F', 
'#4470E6', 
'#08AF22'
];
class Particle {
	constructor(x, y, r, color) {
		this.position = createVector(x, y);
		this.r = r;
		this.color = color;
		this.radians = random(PI * 2);
		this.speed = 0.05;
		this.distance = random(40, 120);
		this.old = createVector(x, y);
		this.new = createVector(x, y);
	}
	update() {
		this.old.x = this.position.x + cos(this.radians) * this.distance
		this.old.y = this.position.y + sin(this.radians) * this.distance;
		this.position.x += (mouseX - this.position.x) * 0.05;
		this.position.y += (mouseY - this.position.y) * 0.05;
		this.radians += this.speed;
		this.new.x = this.position.x + cos(this.radians) * this.distance
		this.new.y = this.position.y + sin(this.radians) * this.distance;
	}
	show() {
		stroke(this.color);
		strokeWeight(this.r * 2)
		line(this.new.x, this.new.y, this.old.x, this.old.y);
	}
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	for(let i = 0; i < 16; i++) {
		let r = 4;
		particles[i] = new Particle(width / 2 - r, height / 2 - r, r, colors[i % 4]);
	}
}
function draw() {
	background('rgba(0, 0, 0, 0.05)');
	for(let particle of particles) {
		particle.show();
		particle.update();
	}
}
