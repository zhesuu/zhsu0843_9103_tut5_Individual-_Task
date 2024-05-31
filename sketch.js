// Arrays containing the initial positions for various circles
let centerXs = [70, 490, 320, 430, 240, -20];
let centerYs = [70, 490, 130, 240, 430, 370];
let targetCenterXs = [70, 490, 320, 430, 240, -20];
let targetCenterYs = [70, 490, 130, 240, 430, 370];

let circle1Xs = [210, 540, 130];
let circle1Ys = [20, 350, 320];
let circle2Xs = [350, 480, 280, 20];
let circle2Ys = [540, 100, 280, 215];
let circle3Xs = [175, 385, 370, 90];
let circle3Ys = [175, 385, -15, 470];

const easing = 0.05;

let circleSizes = [];
let targetCircleSizes = [];

// Function to get the minimum window size
function minWindowSize() {
  return min(windowWidth, windowHeight);
}

// Setup function to initialize the canvas
function setup() {
  let Size = minWindowSize();
  createCanvas(Size, Size);
  background(0, 84, 121);

  // Initialize target positions for smooth motion
  for (let i = 0; i < centerXs.length; i++) {
    targetCenterXs[i] = random(width);
    targetCenterYs[i] = random(height);
  }

  // Initialize sizes for smooth scaling
  for (let i = 0; i < circle1Xs.length + circle2Xs.length + circle3Xs.length; i++) {
    circleSizes[i] = random(20, 140);
    targetCircleSizes[i] = random(20, 140);
  }
}

// Function to draw a ring of rectangles around a circle
function circleRing(centerX, centerY) {
  let radius = 35;
  let numRects = 20;
  let rectWidth = 5;
  let rectHeight = 7;
  let cornerRadius = 8;
  let layerNum = 5;
  let s = 5 / layerNum;
  fill(20); 
  stroke(0);
  for (let a = 0; a < layerNum; a++) {
    for (let i = 0; i < numRects; i++) {
      let angle = TWO_PI / numRects * i;
      let x = centerX + cos(angle) * radius;
      let y = centerY + sin(angle) * radius;
      push();
      translate(x, y);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, rectWidth * s, rectHeight * s, cornerRadius);
      pop();
    }
    radius = radius + 32 / layerNum;
    numRects = numRects + 3;
  }
}

// Function to draw concentric circles
function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles) {
  let step = maxDiameter / numCircles;
  for (let i = 0; i < numCircles; i++) {
    let diameter = maxDiameter - i * step;
    fill(15); // Fixed color for concentric circles
    stroke(50); // Fixed stroke color for concentric circles
    strokeWeight(1);
    ellipse(centerX, centerY, diameter, diameter);
  }
}

// Function to draw dots in a circular pattern
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
  let angleStep = TWO_PI / numDots;
  fill(15, 110, 10); // Fixed color for dots
  noStroke();
  for (let i = 0; i < numDots; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;
    ellipse(x, y, dot, dot);
  }
}

// Function to draw lines radiating from a circle
function drawCircleLines(centerX, centerY, startRadius, numLines, lineLength) {
  strokeWeight(1);
  stroke(25); // Fixed color for lines
  for (let i = 0; i < numLines; i++) {
    let angle = TWO_PI / numLines * i;
    let xStart = centerX + cos(angle) * startRadius;
    let yStart = centerY + sin(angle) * startRadius;
    let xEnd = centerX + cos(angle) * (startRadius + lineLength);
    let yEnd = centerY + sin(angle) * (startRadius + lineLength);
    line(xStart, yStart, xEnd, yEnd);
  }
}

// Function to draw the first type of circle with dots and lines
function Circle1(centerX, centerY, size) {
  let baseRadius = size / 4.67;
  let radiusIncrement = size / 28;
  let numLayers = 4;

  fill(255, 204, 0);
  noStroke();
  circle(centerX, centerY, size);

  fill(150); 
  noStroke();
  circle(centerX, centerY, size / 2);

  for (let i = 0; i < numLayers; i++) {
    drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5);
    drawCircleLines(centerX, centerY, 30 + numLayers * radiusIncrement, 200, 20);
  }
}

// Function to draw the second type of circle with multiple layers of dots
function Circle2(centerX, centerY, size) {
  let numLayers = 10;
  let initialRadius = size / 4.67;
  let radiusStep = size / 35;
  let initialNumDots = 40;
  let dotsIncrement = 6;

  fill(150); 
  noStroke();
  circle(centerX, centerY, size);

  fill(255); 
  ellipse(centerX, centerY, size / 4.67, size / 4.67);

  for (let i = 0; i < numLayers; i++) {
    let radius = initialRadius + i * radiusStep;
    let numDots = initialNumDots + i * dotsIncrement;
    drawCircleDots(centerX, centerY, radius, numDots, 3);
  }
}

// Function to draw the third type of circle with vertices
function Circle3(centerX, centerY, size) {
  let innerRadius = size / 4;
  let outerRadius = size / 2.15;
  let numPoints = 120;

  let points = [];

  for (let i = 0; i < numPoints; i++) {
    let angle = TWO_PI / numPoints * i;
    if (i % 2 == 0) {
      let x = centerX + cos(angle) * innerRadius;
      let y = centerY + sin(angle) * innerRadius;
      points.push(createVector(x, y));
    } else {
      let x = centerX + cos(angle) * outerRadius;
      let y = centerY + sin(angle) * outerRadius;
      points.push(createVector(x, y));
    }
  }
  strokeWeight(1);
  stroke(255); 
  noFill();

  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

// Draw function to render all the elements on the canvas
function draw() {
  background(0, 84, 121);
  let Size = minWindowSize();
  scale(Size / 500);

  // Update positions with easing
  for (let i = 0; i < centerXs.length; i++) {
    centerXs[i] = lerp(centerXs[i], targetCenterXs[i], easing);
    centerYs[i] = lerp(centerYs[i], targetCenterYs[i], easing);

    // Draw main circles with updated positions
    fill(255); 
    stroke(100); 
    strokeWeight(1);
    circle(centerXs[i], centerYs[i], 140);

    drawConcentricCircles(centerXs[i], centerYs[i], 60, 8);
    circleRing(centerXs[i], centerYs[i]);
  }

  // Update circle sizes with easing
  for (let i = 0; i < circleSizes.length; i++) {
    circleSizes[i] = lerp(circleSizes[i], targetCircleSizes[i], easing);

    // Update target sizes every 60 frames
    if (frameCount % 60 == 0) {
      targetCircleSizes[i] = random(70, 140);
    }
  }

  // Draw animated circles
  for (let i = 0; i < circle1Xs.length; i++) {
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    Circle1(x, y, circleSizes[i]);
  }

  for (let i = 0; i < circle2Xs.length; i++) {
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x, y, circleSizes[circle1Xs.length + i]);
  }

  for (let i = 0; i < circle3Xs.length; i++) {
    let x = circle3Xs[i];
    let y = circle3Ys[i];
    fill(18); 
    circle(x, y, circleSizes[circle1Xs.length + circle2Xs.length + i]);
    Circle3(x, y, circleSizes[circle1Xs.length + circle2Xs.length + i]);
    fill(25); 
    circle(x, y, circleSizes[circle1Xs.length + circle2Xs.length + i] / 2.33);
    drawConcentricCircles(x, y, 30, 5);
  }

  // Every 48 frames, update target positions
  if (frameCount % 48 == 0) {
    for (let i = 0; i < targetCenterXs.length; i++) {
      targetCenterXs[i] = random(width);
      targetCenterYs[i] = random(height);
    }
  }
}

// Function to resize the canvas when the window is resized
function windowResized() {
  let Size = minWindowSize();
  resizeCanvas(Size, Size);
}

