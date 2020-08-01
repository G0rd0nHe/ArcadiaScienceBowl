// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var canvas, ctx;

var font;
var vehicles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints("Science Bowl", windowWidth/2-windowWidth*0.35, windowHeight/2, windowWidth*windowHeight/2000, {
    sampleFactor: windowWidth*windowHeight/500000
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y, windowWidth*windowHeight/50000);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
}

function draw() {
  // clear();
  // background(0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}

function change() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  vehicles = [];
  setup();
}

window.addEventListener('resize', change);