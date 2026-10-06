// config
let num = 300;
let xoff = 0;
let yoff = 0;
let zoff = 0;
let increment = 0.1;

// globals
let maskLayer;
let cols;
let rows;
let size = 50;
let arrows = [];
let r = size / 2;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  maskLayer = createGraphics(windowWidth, windowHeight);
  maskLayer.background(0);

  cols = floor(width / size);
  rows = floor(height / size);
  angleMode(DEGREES);
  for (let i = 0; i < num; i++) {
    let randomX = random(width)
    let randomY = random(height)
    let p = new Particle(randomX, randomY)
    particles[i] = p;
  }

  // console.log (cols,rows, width, height, particles)
  background(255);
}

function draw() {
  fill(255);
  stroke(3);
  xoff = 0;
  for (let i = 0; i < cols; i++) {
    arrows[i] = [];
    yoff = 0;
    for (let j = 0; j < rows; j++) {
      let angle = map(noise(xoff, yoff, zoff), 0, 1, 0, 360);
      // rect(i*size, j*size, size, size);
      // text(round(angle, 2), size/2+i*size, size/2+j*size);
      arrows[i][j] = createVector(cos(angle), sin(angle));

      // let pt0 = createVector(size/2+ i*size, size/2+j*size);
      // let pt1 = createVector(r*arrows[i][j].x, r*arrows[i][j].y);
      // line(pt0.x, pt0.y, pt0.x + pt1.x, pt0.y + pt1.y);
      // ellipse(pt0.x + pt1.x, pt0.y + pt1.y, 5, 5);

      yoff += increment;
    }
    xoff += increment;
    zoff += 0.001;
  }

  for (let i = 0; i < num; i++) {
    particles[i].checkEdges();
    particles[i].direction(arrows);
    particles[i].update();
    particles[i].display();
  }

  if (mouseIsPressed) {
    maskLayer.erase(); 
    maskLayer.fill(255); 
    maskLayer.circle(mouseX, mouseY, 50); 
    maskLayer.noErase(); 
  }

  image(maskLayer, 0, 0);
}