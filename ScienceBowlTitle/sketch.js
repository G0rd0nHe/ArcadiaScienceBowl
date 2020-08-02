// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4
// modified by Gordon He Guo

var canvas, ctx;

var font;
var vehicles = [];
var timer = 0;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function convertWord(text, x, y, size) {
  var points = font.textToPoints(text, x, y, size, {
    sampleFactor: 0.2
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y, size/25);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);
  var size = windowWidth/8;
  console.log(size);
  convertWord('Arcadia', windowWidth/2 - size / 4 * 7, windowHeight/2 - size/4, size);
  convertWord('Science Bowl', windowWidth/2 - size * 3, windowHeight/2 + 3*size/4, size);
  // var points = font.textToPoints("Science Bowl", windowWidth/2 - size * 3, windowHeight/2, size, {
  //   sampleFactor: 0.4
  // });

  // for (var i = 0; i < points.length; i++) {
  //   var pt = points[i];
  //   var vehicle = new Vehicle(pt.x, pt.y, size/20);
  //   vehicles.push(vehicle);
  //   // stroke(255);
  //   // strokeWeight(8);
  //   // point(pt.x, pt.y);
  // }
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
}

function draw() {
  // clear();
  // background(0);
  timer++;
  if(timer % 20 == 0) {
    mouseX = 10000;
    mouseY = 10000;
    console.log(1)
  }
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

function touchEnded() {
  mouseX = 10000;
  mouseY = 10000;
};

//  function setup() {
//   createCanvas(windowWidth, windowHeight);
//   textFont(font);
//   textSize(windowWidth/12);
//   text('Science Bowl', 10, 200);
//   line(10, 100, 10+windowWidth/12 * 6, 100);
// }