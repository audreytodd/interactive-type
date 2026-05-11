
function preload() {
  lioness = loadImage("lionelementfordmd.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('Courier New');
  background("#ff004c");

}

function draw() {

  textFont('Courier New');

  let defaultColor = color('#14143A');
  let titleRegion = { x: 20, y: 14, w: 200, h: 80 };
  let subtitleRegion = { x: 30, y: 88, w: 150, h: 30 };

  noStroke();

  fill(defaultColor);
  textSize(72);
  text('lioness', 20, 80);

  fill(defaultColor);
  textSize(22);
  text('li\u00B7on\u00B7ess', 30, 110);
}

function mousePressed() {
  imageMode(CENTER);
  image(lioness, mouseX, mouseY);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    background("#ff004c");

}