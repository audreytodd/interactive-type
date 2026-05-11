let hyenaImg;
const HW = 350;
const HH = 315;
let alphaValue = 175;
let textBuffer;

function preload() {
  hyenaImg = loadImage('DMD-Hyena.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  textFont('Courier New');
  textBuffer = createGraphics(windowWidth, windowHeight);
  textBuffer.textFont('Courier New');
}

function getHyenaColorAtMouse() {
  hyenaImg.loadPixels();
  let imgCX = floor(hyenaImg.width / 2);
  let imgCY = floor(hyenaImg.height / 2);
  let idx = 4 * (imgCY * hyenaImg.width + imgCX);
  return color(
    hyenaImg.pixels[idx],
    hyenaImg.pixels[idx + 1],
    hyenaImg.pixels[idx + 2]
  );
}

function drawAllText(pg, col) {
  pg.fill(col);
  pg.noStroke();

  let body = 'the female hyena is the alpha. the female hyena is larger than ' +
             'the male hyena. she is the most powerful of the animal matriarch. ' +
             'she leads. she breeds. ';

  pg.textSize(22);
  pg.textLeading(34);
  pg.text(body.repeat(8), 280, 34, windowWidth - 300, windowHeight);

  pg.textSize(72);
  pg.text('hyena', 20, 80);

  pg.textSize(22);
  pg.text('hy\u00B7e\u00B7na', 30, 110);
}

function draw() {
  background('#0022ff');

  let hyenaColor = getHyenaColorAtMouse();
  let imgX = mouseX - HW / 2;
  let imgY = mouseY - HH / 2;

  // Pass 1: draw all text in default color on main canvas
  drawAllText(this, color('#14143A'));

  // Pass 2: draw recolored text onto buffer, mask it to hyena silhouette
  textBuffer.clear();
  drawAllText(textBuffer, hyenaColor);

  // Use hyena PNG as mask — destination-in keeps only pixels
  // where the hyena is opaque, cutting to the exact body outline
  textBuffer.drawingContext.globalCompositeOperation = 'destination-in';
  textBuffer.image(hyenaImg, imgX, imgY, HW, HH);
  textBuffer.drawingContext.globalCompositeOperation = 'source-over';

  // Composite the masked text layer onto the main canvas
  image(textBuffer, 0, 0);

  // Draw hyena on top
  tint(255, alphaValue);
  image(hyenaImg, imgX, imgY, HW, HH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  textBuffer = createGraphics(windowWidth, windowHeight);
  textBuffer.textFont('Courier New');
}