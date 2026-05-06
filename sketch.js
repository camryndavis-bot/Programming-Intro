var mode = 0;
var skyChoice = 0
var wallChoice = 0
var towerChoice = 0
var gateChoice = 0
var miscChoice = 0
 
var showMoat = false
var showTorches = true
var showBattlements = false
var showTerrain = 0
 
var destroyTimer = 0
 
var stars = []
var music
var raindrops = []
var birds = []
 
function preload() {
  music = loadSound("Hide CS01 (Ambient Rework) by Eleftherios & GLO - 2 Hour Loop - YouTube_1.mp3")
}
 
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia")
  splash = new Splash();
 
  mySlider = createSlider()
 
  for (var i = 0; i < 150; i++) {
    stars.push(new Star())
  }
 
  for (var i = 0; i < 120; i++) {
    raindrops.push({
      x: random(width),
      y: random(height),
      speed: random(8, 16),
      len: random(10, 20)
    })
  }
 
  for (var i = 0; i < 10; i++) {
    birds.push({
      x: random(width),
      y: random(height * 0.1, height * 0.45),
      speed: random(1.5, 3.5),
      flapT: random(TAU)
    })
  }
}
 
function draw() {
  if (mouseIsPressed == true && splash.update() == true) {
    mode = 1;
  }
 
  if (mode == 1) {
    splash.hide();
 
    drawSky()
    drawTerrain()
    drawGround()
    if (showMoat == true) {
      drawMoat()
    }
    if (destroyTimer <= 0) {
      drawCastle()
    } else {
      drawDestroyed()
      destroyTimer = destroyTimer - 1
    }
    drawUI()
  }
}
 
function drawCloud(x, y, w) {
  fill(255, 255, 255, 200)
  noStroke()
  ellipse(x, y, w, w * 0.45)
  ellipse(x - w * 0.28, y + w * 0.06, w * 0.55, w * 0.38)
  ellipse(x + w * 0.28, y + w * 0.06, w * 0.55, w * 0.38)
  ellipse(x - w * 0.12, y - w * 0.12, w * 0.5, w * 0.38)
  ellipse(x + w * 0.14, y - w * 0.08, w * 0.45, w * 0.35)
}
 
function drawStormCloud(x, y, w) {
  fill(60, 62, 72, 200)
  noStroke()
  ellipse(x, y, w, w * 0.45)
  ellipse(x - w * 0.28, y + w * 0.06, w * 0.55, w * 0.38)
  ellipse(x + w * 0.28, y + w * 0.06, w * 0.55, w * 0.38)
  ellipse(x - w * 0.12, y - w * 0.12, w * 0.5, w * 0.38)
  ellipse(x + w * 0.14, y - w * 0.08, w * 0.45, w * 0.35)
}
 
function drawSky() {
  var skyTop
  var skyBot
  var moonColor
  var moonSize
 
  if (skyChoice == 0) {
    skyTop = color(26, 10, 40)
    skyBot = color(192, 80, 26)
    moonColor = color(255, 200, 80)
    moonSize = 110
  }
  if (skyChoice == 1) {
    skyTop = color(10, 0, 8)
    skyBot = color(64, 0, 8)
    moonColor = color(200, 26, 26)
    moonSize = 130
  }
  if (skyChoice == 2) {
    skyTop = color(4, 8, 22)
    skyBot = color(24, 40, 72)
    moonColor = color(221, 238, 255)
    moonSize = 100
  }
  if (skyChoice == 3) {
    skyTop = color(10, 12, 16)
    skyBot = color(37, 40, 48)
    moonColor = null
    moonSize = 0
  }
  if (skyChoice == 4) {
    skyTop = color(1, 5, 16)
    skyBot = color(6, 32, 64)
    moonColor = color(200, 238, 255)
    moonSize = 95
  }
  if (skyChoice == 5) {
    skyTop = color(135, 180, 220)
    skyBot = color(240, 200, 140)
    moonColor = color(255, 240, 180)
    moonSize = 90
  }
  if (skyChoice == 6) {
    skyTop = color(100, 160, 210)
    skyBot = color(180, 220, 255)
    moonColor = null
    moonSize = 0
  }
  if (skyChoice == 7) {
    skyTop = color(255, 160, 80)
    skyBot = color(255, 100, 60)
    moonColor = color(255, 220, 100)
    moonSize = 120
  }
 
  for (var y = 0; y < height * 0.78; y++) {
    var amt = y / (height * 0.78)
    stroke(lerpColor(skyTop, skyBot, amt))
    line(0, y, width, y)
  }
  noStroke()
 
  if (skyChoice == 4) {
    var wave = sin(frameCount * 0.008) * 30
    fill(0, 200, 120, 40)
    ellipse(width * 0.25 + wave, height * 0.25, 360, 85)
    fill(80, 50, 210, 35)
    ellipse(width * 0.5, height * 0.32, 400, 85)
    fill(0, 180, 200, 40)
    ellipse(width * 0.75 - wave, height * 0.28, 330, 80)
  }
 
  if (skyChoice == 6) {
    drawingContext.shadowBlur = 60
    drawingContext.shadowColor = "rgb(255, 230, 80)"
    fill(255, 230, 60)
    circle(width * 0.15, height * 0.18, 80)
    drawingContext.shadowBlur = 0
    drawCloud(width * 0.38, height * 0.18, 160)
    drawCloud(width * 0.65, height * 0.13, 140)
    drawCloud(width * 0.82, height * 0.22, 120)
  }
 
  if (skyChoice == 5) {
    drawCloud(width * 0.25, height * 0.18, 130)
    drawCloud(width * 0.6, height * 0.14, 110)
    drawCloud(width * 0.82, height * 0.20, 100)
  }
 
  
 
  if (skyChoice == 3) {
    drawStormCloud(width * 0.18, height * 0.14, 260)
    drawStormCloud(width * 0.5,  height * 0.10, 300)
    drawStormCloud(width * 0.80, height * 0.16, 240)
 
    if (floor(frameCount / 120) % 17 == 0) {
      stroke(220, 230, 255, 200)
      strokeWeight(2)
      line(width * 0.60, height * 0.05, width * 0.62, height * 0.18)
      line(width * 0.62, height * 0.18, width * 0.59, height * 0.28)
      noStroke()
    }
 
    stroke(180, 200, 220, 60)
    strokeWeight(1)
    for (var i = 0; i < raindrops.length; i++) {
      var r = raindrops[i]
      line(r.x, r.y, r.x + 2, r.y + r.len)
      r.y = r.y + r.speed
      if (r.y > height) {
        r.y = 0
        r.x = random(width)
      }
    }
    noStroke()
  }
 
  if (skyChoice != 5 && skyChoice != 6 && skyChoice != 7) {
    fill(255)
    for (var i = 0; i < stars.length; i++) {
      stars[i].draw()
    }
    noStroke()
  }
 
  if (moonColor != null) {
    drawingContext.shadowBlur = 80
    drawingContext.shadowColor = "rgb(" + floor(red(moonColor)) + "," + floor(green(moonColor)) + "," + floor(blue(moonColor)) + ")"
    fill(moonColor)
    circle(width * 0.82, height * 0.20, moonSize)
    drawingContext.shadowBlur = 0
 
    if (skyChoice == 2) {
      fill(180, 200, 220, 60)
      circle(width * 0.82 - 14, height * 0.20 - 10, 18)
      circle(width * 0.82 + 12, height * 0.20 + 6, 14)
      circle(width * 0.82,      height * 0.20 - 20, 10)
    }
  }
}
 
function drawTerrain() {
  if (showTerrain == 1) {
    fill(30, 50, 30)
    noStroke()
    ellipse(width * 0.12, height * 0.76, 320, 130)
    ellipse(width * 0.88, height * 0.76, 360, 140)
    fill(20, 40, 20)
    ellipse(width * 0.08, height * 0.78, 200, 90)
    ellipse(width * 0.92, height * 0.78, 220, 95)
  }
 
  if (showTerrain == 2) {
    fill(55, 50, 45)
    noStroke()
    triangle(0, height * 0.75, width * 0.22, height * 0.38, width * 0.4, height * 0.75)
    triangle(width * 0.15, height * 0.75, width * 0.35, height * 0.30, width * 0.52, height * 0.75)
    triangle(width * 0.6, height * 0.75, width * 0.78, height * 0.33, width * 0.95, height * 0.75)
    fill(220, 230, 240, 180)
    triangle(width * 0.35, height * 0.30, width * 0.35 - 18, height * 0.42, width * 0.35 + 18, height * 0.42)
    triangle(width * 0.22, height * 0.38, width * 0.22 - 14, height * 0.48, width * 0.22 + 14, height * 0.48)
  }
 
  if (showTerrain == 3) {
    fill(30, 55, 30, 180)
    noStroke()
    for (var i = 0; i < 8; i++) {
      var tx = width * 0.04 + i * width * 0.06
      var th = 80 + sin(i * 1.3) * 30
      triangle(tx, height * 0.75, tx + 18, height * 0.75 - th, tx + 36, height * 0.75)
    }
    for (var i = 0; i < 8; i++) {
      var tx = width * 0.62 + i * width * 0.055
      var th = 75 + cos(i * 1.1) * 25
      triangle(tx, height * 0.75, tx + 18, height * 0.75 - th, tx + 36, height * 0.75)
    }
  }
}
 
function drawGround() {
  fill(15, 12, 10)
  noStroke()
  rect(0, height * 0.75, width, height * 0.25)
}
 
function drawMoat() {
  var cx = width / 2
  var groundY = height * 0.75
  fill(10, 26, 58)
  noStroke()
  ellipse(cx, groundY + 18, 700, 60)
  stroke(80, 140, 220, 80)
  strokeWeight(1)
  for (var i = 0; i < 5; i++) {
    var shimX = cx - 220 + i * 90 + sin(frameCount * 0.003 + i) * 14
    line(shimX, groundY + 16, shimX + 38, groundY + 16)
  }
  noStroke()
}
 
function drawSword(x, y) {
  stroke(180, 180, 200)
  strokeWeight(3)
  line(x, y, x, y - 55)
  strokeWeight(6)
  line(x - 14, y - 42, x + 14, y - 42)
  noStroke()
  fill(200, 170, 80)
  ellipse(x, y - 36, 8, 12)
  fill(140, 140, 160)
  rect(x - 2, y, 4, 10)
}
 
function drawBirds() {
  stroke(30, 30, 30, 180)
  strokeWeight(1.2)
  noFill()
  for (var i = 0; i < birds.length; i++) {
    var b = birds[i]
    b.x = b.x + b.speed
    b.flapT = b.flapT + 0.12
    var flap = sin(b.flapT) * 5
    if (b.x > width + 40) {
      b.x = -40
      b.y = random(height * 0.1, height * 0.45)
    }
    arc(b.x - 8, b.y + flap, 14, 10, PI, TWO_PI)
    arc(b.x + 8, b.y + flap, 14, 10, PI, TWO_PI)
  }
  noStroke()
}
 
function drawCastle() {
  var cx = width / 2
  var groundY = height * 0.75
 
  var mainColor, darkColor
  if (wallChoice == 0) {
    mainColor = color(106, 106, 112)
    darkColor  = color(55, 55, 65)
  }
  if (wallChoice == 1) {
    mainColor = color(36, 36, 50)
    darkColor  = color(18, 18, 32)
  }
  if (wallChoice == 2) {
    mainColor = color(160, 128, 96)
    darkColor  = color(100, 75, 55)
  }
  if (wallChoice == 3) {
    mainColor = color(180, 60, 60)
    darkColor  = color(120, 30, 30)
  }
  if (wallChoice == 4) {
    mainColor = color(70, 110, 80)
    darkColor  = color(40, 70, 50)
  }
 
  var keepW = 320
  var keepY = height * 0.46
  var keepX = cx - keepW / 2
 
  var towerW = 85
  var towerH = 295
  var roundTops = false
  if (towerChoice == 1) {
    towerH = 380
  }
  if (towerChoice == 2) {
    towerW = 100
    towerH = 330
    roundTops = true
  }
  if (towerChoice == 3) {
    towerW = 75
    towerH = 260
  }
  if (towerChoice == 4) {
    towerW = 110
    towerH = 350
    roundTops = true
  }
 
  var towerLeftX  = keepX - towerW
  var towerRightX = keepX + keepW
  var towerY = groundY - towerH
 
  drawStoneBlock(towerLeftX,  towerY, towerW, groundY - towerY, mainColor, darkColor)
  drawStoneBlock(towerRightX, towerY, towerW, groundY - towerY, mainColor, darkColor)
  drawStoneBlock(keepX, keepY, keepW, groundY - keepY, mainColor, darkColor)
 
  fill(darkColor)
  noStroke()
  if (roundTops == false) {
    triangle(towerLeftX  - 6, towerY, towerLeftX  + towerW + 6, towerY, towerLeftX  + towerW/2, towerY - 58)
    triangle(towerRightX - 6, towerY, towerRightX + towerW + 6, towerY, towerRightX + towerW/2, towerY - 58)
  } else {
    arc(towerLeftX  + towerW/2, towerY, towerW + 10, towerW + 10, PI, TWO_PI)
    arc(towerRightX + towerW/2, towerY, towerW + 10, towerW + 10, PI, TWO_PI)
  }
 
  if (showBattlements == true) {
    fill(mainColor)
    noStroke()
    for (var m = 0; m < 10; m++) {
      rect(keepX + m * 33, keepY - 16, 18, 16)
    }
    for (var m = 0; m < 4; m++) {
      rect(towerLeftX + m * 22, towerY - 14, 13, 14)
    }
    for (var m = 0; m < 4; m++) {
      rect(towerRightX + m * 22, towerY - 14, 13, 14)
    }
  }
 
  fill(10, 10, 20)
  noStroke()
  rect(cx - 90, keepY + 38, 14, 26)
  arc(cx - 83, keepY + 38, 14, 14, PI, TWO_PI)
  rect(cx - 18, keepY + 38, 14, 26)
  arc(cx - 11, keepY + 38, 14, 14, PI, TWO_PI)
  rect(cx + 52, keepY + 38, 14, 26)
  arc(cx + 59, keepY + 38, 14, 14, PI, TWO_PI)
  rect(cx - 55, keepY + 95, 14, 26)
  arc(cx - 48, keepY + 95, 14, 14, PI, TWO_PI)
  rect(cx + 20, keepY + 95, 14, 26)
  arc(cx + 27, keepY + 95, 14, 14, PI, TWO_PI)
 
  fill(10, 10, 20)
  rect(towerLeftX  + towerW/2 - 7, towerY + 45, 12, 20)
  arc( towerLeftX  + towerW/2 - 1, towerY + 45, 12, 12, PI, TWO_PI)
  rect(towerRightX + towerW/2 - 7, towerY + 45, 12, 20)
  arc( towerRightX + towerW/2 - 1, towerY + 45, 12, 12, PI, TWO_PI)
 
  drawGate(cx, groundY, mainColor, darkColor)
 
  if (showTorches == true) {
    drawTorch(cx - 80, groundY - 60)
    drawTorch(cx + 72, groundY - 60)
  }
 
  if (miscChoice == 1) {
    drawSword(cx - 65, groundY - 2)
    drawSword(cx + 65, groundY - 2)
  }
 
  if (miscChoice == 2) {
    drawBirds()
  }
 
  if (miscChoice == 3) {
    drawSword(cx - 65, groundY - 2)
    drawSword(cx + 65, groundY - 2)
    drawBirds()
  }
 
  if (miscChoice == 4) {
    fill(200, 30, 30)
    noStroke()
    var bx = towerLeftX + towerW/2
    var by = towerY - (roundTops ? 8 : 62)
    stroke(160)
    strokeWeight(2)
    line(bx, by, bx, by - 50)
    noStroke()
    fill(200, 30, 30)
    triangle(bx, by - 50, bx + 36, by - 40, bx, by - 28)
 
    var bx2 = towerRightX + towerW/2
    stroke(160)
    strokeWeight(2)
    line(bx2, by, bx2, by - 50)
    noStroke()
    fill(200, 30, 30)
    triangle(bx2, by - 50, bx2 + 36, by - 40, bx2, by - 28)
 
    stroke(160)
    strokeWeight(2)
    line(cx, keepY - 10, cx, keepY - 60)
    noStroke()
    fill(200, 30, 30)
    triangle(cx, keepY - 60, cx + 36, keepY - 50, cx, keepY - 38)
  }
 
  if (miscChoice == 5) {
    fill(26, 74, 200)
    noStroke()
    var bx = towerLeftX + towerW/2
    var by = towerY - (roundTops ? 8 : 62)
    stroke(160)
    strokeWeight(2)
    line(bx, by, bx, by - 50)
    noStroke()
    fill(26, 74, 200)
    triangle(bx, by - 50, bx + 36, by - 40, bx, by - 28)
 
    var bx2 = towerRightX + towerW/2
    stroke(160)
    strokeWeight(2)
    line(bx2, by, bx2, by - 50)
    noStroke()
    fill(26, 74, 200)
    triangle(bx2, by - 50, bx2 + 36, by - 40, bx2, by - 28)
 
    stroke(160)
    strokeWeight(2)
    line(cx, keepY - 10, cx, keepY - 60)
    noStroke()
    fill(26, 74, 200)
    triangle(cx, keepY - 60, cx + 36, keepY - 50, cx, keepY - 38)
  }
}
 
function drawStoneBlock(x, y, w, h, mainColor, darkColor) {
  fill(mainColor)
  noStroke()
  rect(x, y, w, h)
 
  stroke(darkColor)
  strokeWeight(1)
  var brickH = 20
  var brickW = 40
 
  for (var row = 0; row < ceil(h / brickH); row++) {
    var rowY = y + row * brickH
    var offset = 0
    if (row % 2 == 1) {
      offset = brickW / 2
    }
    for (var col = -1; col < ceil(w / brickW) + 1; col++) {
      var brickX = x + col * brickW + offset
      var drawX = max(brickX, x)
      var drawY = max(rowY, y)
      var drawW = min(brickX + brickW, x + w) - drawX
      var drawH = min(rowY + brickH, y + h) - drawY
      if (drawW > 0 && drawH > 0) {
        rect(drawX, drawY, drawW, drawH)
      }
    }
  }
  noStroke()
}
 
function drawGate(cx, groundY, mainColor, darkColor) {
  if (gateChoice == 0) {
    fill(darkColor)
    noStroke()
    rect(cx - 48, groundY - 115, 96, 115)
    arc(cx, groundY - 115, 96, 96, PI, TWO_PI)
    fill(10, 10, 20)
    rect(cx - 38, groundY - 105, 76, 105)
    arc(cx, groundY - 105, 76, 76, PI, TWO_PI)
  }
 
  if (gateChoice == 1) {
    fill(20, 20, 30)
    noStroke()
    rect(cx - 50, groundY - 120, 100, 120)
    arc(cx, groundY - 120, 100, 60, PI, TWO_PI)
 
    stroke(80, 80, 90)
    strokeWeight(3)
    for (var gi = 0; gi <= 4; gi++) {
      line(cx - 50 + gi * 25, groundY - 120, cx - 50 + gi * 25, groundY)
    }
    for (var gi = 0; gi < 4; gi++) {
      line(cx - 50, groundY - 120 + gi * 30, cx + 50, groundY - 120 + gi * 30)
    }
    noStroke()
 
    fill(100, 100, 110)
    for (var gi = 0; gi < 4; gi++) {
      var spikeX = cx - 37 + gi * 25
      triangle(spikeX, groundY - 120, spikeX + 12, groundY - 140, spikeX + 24, groundY - 120)
    }
  }
 
  if (gateChoice == 2) {
    fill(darkColor)
    noStroke()
    rect(cx - 48, groundY - 115, 96, 115)
    arc(cx, groundY - 115, 96, 96, PI, TWO_PI)
    fill(80, 55, 20)
    rect(cx - 38, groundY - 105, 76, 105)
    stroke(60, 40, 10)
    strokeWeight(2)
    for (var pi = 0; pi < 5; pi++) {
      line(cx - 38, groundY - 105 + pi * 22, cx + 38, groundY - 105 + pi * 22)
    }
    line(cx - 10, groundY - 105, cx - 10, groundY)
    line(cx + 10, groundY - 105, cx + 10, groundY)
    noStroke()
    fill(60, 40, 10)
    circle(cx - 20, groundY - 60, 8)
    circle(cx + 20, groundY - 60, 8)
  }
}
 
function drawTorch(x, y) {
  fill(90, 60, 20)
  noStroke()
  rect(x - 3, y, 6, 14)
  var flicker = sin(frameCount * 0.15 + x) * 12
  drawingContext.shadowBlur = 30
  drawingContext.shadowColor = "rgb(255, 120, 20)"
  fill(255, 140 + flicker, 20)
  ellipse(x, y - 6, 10, 18)
  drawingContext.shadowBlur = 0
}
 
function drawDestroyed() {
  var cx = width / 2
  var groundY = height * 0.75
 
  var mainColor, darkColor
  if (wallChoice == 0) { mainColor = color(106, 106, 112); darkColor = color(55, 55, 65) }
  if (wallChoice == 1) { mainColor = color(36, 36, 50);   darkColor = color(18, 18, 32) }
  if (wallChoice == 2) { mainColor = color(160, 128, 96); darkColor = color(100, 75, 55) }
  if (wallChoice == 3) { mainColor = color(180, 60, 60);  darkColor = color(120, 30, 30) }
  if (wallChoice == 4) { mainColor = color(70, 110, 80);  darkColor = color(40, 70, 50) }
 
  var keepW = 320
  var keepX = cx - keepW / 2
  var towerW = 85
  if (towerChoice == 2 || towerChoice == 4) towerW = 100
  if (towerChoice == 3) towerW = 75
  var towerLeftX  = keepX - towerW
  var towerRightX = keepX + keepW
 
  fill(mainColor)
  noStroke()
  rect(towerLeftX, groundY - 120, towerW, 120)
  rect(towerRightX, groundY - 120, towerW, 120)
  rect(keepX, groundY - 80, keepW, 80)
 
  fill(60, 30, 10)
  rect(keepX + 20, groundY - 90, 40, 90)
  rect(keepX + 100, groundY - 60, 50, 60)
  rect(keepX + 220, groundY - 75, 35, 75)
 
  drawingContext.shadowBlur = 60
  drawingContext.shadowColor = "rgb(255, 80, 0)"
  fill(255, 100, 10, 180)
  ellipse(cx - 40, groundY - 90, 60, 80)
  ellipse(cx + 60, groundY - 70, 50, 60)
  drawingContext.shadowBlur = 0
 
  fill(80, 80, 80, 120)
  ellipse(cx, groundY + 30, 500, 60)
 
  stroke(220, 230, 255, 200)
  strokeWeight(3)
  line(cx + 20, height * 0.10, cx + 40, height * 0.30)
  line(cx + 40, height * 0.30, cx + 20, height * 0.45)
  noStroke()
 
  fill(255, 50, 50, 200)
  textAlign(CENTER)
  textSize(48)
  text("DESTROYED", cx, height * 0.35)
  textSize(16)
  fill(255, 180, 80)
  text("press 9 again to rebuild", cx, height * 0.42)
}
 
function drawUI() {
  fill(0, 0, 0, 160)
  noStroke()
  rect(12, 12, 210, 295, 8)
 
  fill(255, 208, 80)
  textSize(13)
  textAlign(LEFT)
  text("CASTLE BUILDER ", 22, 34)
 
  var skyNames     = ["Sunset","Blood Moon","Cold Night","Storm","Aurora","Golden Dusk","Clear Day","Sunrise"]
  var wallNames    = ["Stone","Obsidian","Sandstone","Crimson","Moss"]
  var towerNames   = ["Squat","Tall","Round","Short","Grand Round"]
  var gateNames    = ["Stone Arch","Portcullis","Wooden Gate"]
  var miscNames    = ["None","Swords","Birds","Swords + Birds","Red Banners","Blue Banners"]
  var terrainNames = ["None","Hills","Mountains","Forest"]
 
  fill(232, 216, 160)
  textSize(11)
  text("1 = Sky: "     + skyNames[skyChoice],     22, 58)
  text("2 = Walls: "   + wallNames[wallChoice],    22, 76)
  text("3 = Towers: "  + towerNames[towerChoice],  22, 94)
  text("4 = Gate: "    + gateNames[gateChoice],    22, 112)
  text("5 = Misc: "    + miscNames[miscChoice],    22, 130)
  text("T = Terrain: " + terrainNames[showTerrain], 22, 148)
 
  var moatStatus       = "off"
  var torchStatus      = "on"
  var battlementStatus = "off"
  if (showMoat        == true)  moatStatus       = "ON"
  if (showTorches     == false) torchStatus      = "off"
  if (showBattlements == true)  battlementStatus = "ON"
 
  text("6 = Moat: "        + moatStatus,        22, 168)
  text("7 = Torches: "     + torchStatus,        22, 186)
  text("8 = Battlements: " + battlementStatus,   22, 204)
  text("9 = DESTROY / rebuild",                  22, 222)
  text("0 = play / pause music",                 22, 240)
 
  fill(160, 120, 50)
  textSize(10)
  text("press number keys to customize", 22, 262)
  text("T cycles terrain options", 22, 276)
}
 
class Star {
  constructor() {
    this.x    = random(width)
    this.y    = random(height * 0.75)
    this.size = random(0.25, 3)
    this.t    = random(TAU)
  }
 
  draw() {
    this.t += 0.1
    var scale = this.size + sin(this.t) * 2
    noStroke()
    ellipse(this.x, this.y, scale, scale)
  }
}
 
function keyPressed() {
  if (mode == 1) {
    if (key == '1') {
      skyChoice = (skyChoice + 1) % 8
    }
    if (key == '2') {
      wallChoice = (wallChoice + 1) % 5
    }
    if (key == '3') {
      towerChoice = (towerChoice + 1) % 5
    }
    if (key == '4') {
      gateChoice = (gateChoice + 1) % 3
    }
    if (key == '5') {
      miscChoice = (miscChoice + 1) % 6
    }
    if (key == '6') {
      if (showMoat == false) {
        showMoat = true
      } else {
        showMoat = false
      }
    }
    if (key == '7') {
      if (showTorches == false) {
        showTorches = true
      } else {
        showTorches = false
      }
    }
    if (key == '8') {
      if (showBattlements == false) {
        showBattlements = true
      } else {
        showBattlements = false
      }
    }
    if (key == '9') {
      if (destroyTimer <= 0) {
        destroyTimer = 9999
      } else {
        destroyTimer = 0
      }
    }
    if (key == '0') {
      if (music.isPlaying()) {
        music.pause()
      } else {
        music.loop()
      }
    }
    if (key == 't' || key == 'T') {
      showTerrain = (showTerrain + 1) % 4
    }
  }
}
 
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}