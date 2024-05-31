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
  fill(200); // Fixed color for rectangles
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
    fill(150); // Fixed color for concentric circles
    stroke(50); // Fixed stroke color for concentric circles
    strokeWeight(1);
    ellipse(centerX, centerY, diameter, diameter);
  }
}

// Function to draw dots in a circular pattern
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
  let angleStep = TWO_PI / numDots;
  fill(255); // Fixed color for dots
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
  stroke(255); // Fixed color for lines
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
function Circle1(centerX, centerY) {
  let baseRadius = 30;
  let radiusIncrement = 5;
  let numLayers = 4;

  fill(255, 204, 0);
  noStroke();
  circle(centerX, centerY, 140);

  fill(150); // Fixed color for inner circle
  noStroke();
  circle(centerX, centerY, 70);

  for (let i = 0; i < numLayers; i++) {
    drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5);
    drawCircleLines(centerX, centerY, 30 + numLayers * radiusIncrement, 200, 20);
  }
}

// Function to draw the second type of circle with multiple layers of dots
function Circle2(centerX, centerY) {
  let numLayers = 10;
  let initialRadius = 30;
  let radiusStep = 4;
  let initialNumDots = 40;
  let dotsIncrement = 6;

  fill(150); // Fixed color for outer circle
  noStroke();
  circle(centerX, centerY, 140);

  fill(255); // Fixed color for inner ellipse
  ellipse(centerX, centerY, 30, 30);

  for (let i = 0; i < numLayers; i++) {
    let radius = initialRadius + i * radiusStep;
    let numDots = initialNumDots + i * dotsIncrement;
    drawCircleDots(centerX, centerY, radius, numDots, 3);
  }
}

// Function to draw the third type of circle with vertices
function Circle3(centerX, centerY) {
  let innerRadius = 35;
  let outerRadius = 65;
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
  stroke(255); // Fixed color for the shape
  noFill();

  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

// Function to draw a chain of small circles around a center
function drawChain(centerX, centerY, chainRadius, numLinks) {
  let angleStep = TWO_PI / numLinks;
  fill(255);
  stroke(0);
  strokeWeight(2.5);
  for (let i = 0; i < numLinks; i++) {
    let angle = i * angleStep;
    let x = centerX + cos(angle) * chainRadius;
    let y = centerY + sin(angle) * chainRadius;
    ellipse(x, y, 6, 6);
  }
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
    fill(255); // Fixed color for main circle
    stroke(100); // Fixed stroke color for main circle
    strokeWeight(1);
    circle(centerXs[i], centerYs[i], 140);

    drawConcentricCircles(centerXs[i], centerYs[i], 60, 8);
    circleRing(centerXs[i], centerYs[i]);
  }

  for (let i = 0; i < circle1Xs.length; i++) {
    let x = circle1Xs[i];
    let y = circle1Ys[i];
    Circle1(x, y);
  }

  for (let i = 0; i < circle2Xs.length; i++) {
    let x = circle2Xs[i];
    let y = circle2Ys[i];
    Circle2(x, y);
  }

  for (let i = 0; i < circle3Xs.length; i++) {
    let x = circle3Xs[i];
    let y = circle3Ys[i];
    fill(18); // Fixed color for main circle
    circle(x, y, 140);
    Circle3(x, y);
    fill(25); // Fixed color for inner circle
    circle(x, y, 60);
    drawConcentricCircles(x, y, 30, 5);
  }

  // Every 120 frames, update target positions
  if (frameCount % 120 == 0) {
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

