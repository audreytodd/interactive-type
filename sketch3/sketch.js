let orcaImg;
let words = [];
let orcaAngle = 1;


const orcaRadius = 150;

const textBody = `The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.The orca is the apex predator of the ocean and they are led by the matriarch.`;


const fontSize = 18;
const lineHeight = 28;
const marginX = 220;
const marginY = 160;

function preload() {
  orcaImg = loadImage('neworca.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  layoutWords();
}

function layoutWords() {
  words = [];
  textSize(fontSize);
  textFont('Courier New');
  let tokens = textBody.split(' ');
  let x = marginX;
  let y = marginY + fontSize;
  let maxWidth = width - marginX - 60;
  for (let token of tokens) {
    let w = textWidth(token + ' ');
    if (x + w > maxWidth) {
      x = marginX;
      y += lineHeight;
    }
    words.push({ text: token, baseX: x, baseY: y, x: x, y: y });
    x += w;
  }
}

function draw() {
  background('#00eeff'); 

  let mx = mouseX;
  let my = mouseY;

  noStroke();
  fill(10, 10, 10);
  textFont('Courier New');
  textStyle(NORMAL);
  textSize(72);
  text('orca', 40, 90);

  textStyle(NORMAL);
  textSize(18);
  fill(10, 10, 10);
  text('or\u00B7ca', 44, 118);

  textSize(fontSize);
  textStyle(NORMAL);
  textFont('Courier New');
  noStroke();

  for (let w of words) {
    let dx = w.baseX - mx;
    let dy = w.baseY - my;
    let d = sqrt(dx * dx + dy * dy);
    let repel = orcaRadius * 1.5;
    let targetX = w.baseX;
    let targetY = w.baseY;

    if (d < repel && d > 0) {
      let force = (repel - d) / repel;
      force = force * force;
      let angle = atan2(dy, dx);
      let push = force * repel * 0.9;
      targetX = w.baseX + cos(angle) * push;
      targetY = w.baseY + sin(angle) * push;
    }

    w.x = lerp(w.x, targetX, 0.18);
    w.y = lerp(w.y, targetY, 0.18);

    text(w.text, w.x, w.y);
  }

  if (orcaImg) {
    let s = orcaRadius*2;
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (speed > 1.5) {
      let targetAngle = atan2(mouseY - pmouseY, mouseX - pmouseX) + PI;
      let da = targetAngle - orcaAngle;
      if (da > PI) da -= TWO_PI;
      if (da < -PI) da += TWO_PI;
      orcaAngle += da * 0.15;
    }
    push();
    translate(mx, my);
    rotate(orcaAngle);
    imageMode(CENTER);
    image(orcaImg, 0, 0, s, s * (orcaImg.height / orcaImg.width));
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  layoutWords();
}