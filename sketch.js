let rad;
let v;
let turn = 0;
let num;
let swarm = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100, 100);
  rad = height*.3;
  v = height *.1;
  num = height*.5;
  frameRate(20);
  background(200, 30, 100)
  for (let i = 0; i < num; i++) {
    swarm.push(new Bug());
  }
}

function draw() {
  //background(random(50), 20, 100);
  lights();
  for(let i=0; i < swarm.length; i++){
    swarm[i].run();
  }
  push();
  //rotateY(turn);
  rotateY(map(mouseX, 0, width, -1, 1));
  rotateX(map(mouseY, 0, width, -1, 1));
  rotateZ(turn);
  //noStroke();
  drawTrack(height*0.15, rad, v);
  drawEdges(height*0.15, rad, v);
  turn += 0.005;
  pop();
}

function drawTrack(steps, rad, v) {
  //beginShape(TRIANGLE_STRIP);
  beginShape(TRIANGLE_STRIP);
  fill(0)
  stroke(255)
  //noFill();
  //fill(150, 70, 50, 50)
  //strokeWeight(2);
  //stroke(random(150, 200), 70, 50, 50);
  //noStroke()
  for (let step = 0; step < (steps + 1); step += 1) {
    let u = step * TAU / steps;
    let x = (rad - v * cos(0.5 * u)) * cos(u);
    let y = (rad - v * cos(0.5 * u)) * sin(u);
    let z = -v * sin(0.5 * u);
    vertex(x, y, z);
    x = (rad + v * cos(0.5 * u)) * cos(u);
    y = (rad + v * cos(0.5 * u)) * sin(u);
    z = v * sin(0.5 * u);
    vertex(x, y, z);
  }
  endShape(CLOSE);
}

function drawEdges(steps, rad, v) {
  for (let step = 0; step < (steps + 1); step += 1) {
    stroke(0);
    fill(random(260, 300), random(100), random(100));
    let u = step * TAU / steps;
    let x = (rad - v * cos(0.5 * u)) * cos(u);
    let y = (rad - v * cos(0.5 * u)) * sin(u);
    let z = -v * sin(0.5 * u);
    push();
    translate(x, y, z);
    //box(10)c
    box(random(6,10))
    pop();
    x = (rad + v * cos(0.5 * u)) * cos(u);
    y = (rad + v * cos(0.5 * u)) * sin(u);
    z = v * sin(0.5 * u);
    push();
    translate(x, y, z);
    box(random(6,10))
    //box(10);
    pop();
  }
}

class Bug{
  constructor(){
    this.loc = createVector(0, 0, 0);
    this.vel = createVector(0, 0, 0);
    this.rad = random(height*0.01);
    this.ts = random(5);
    this.color = random(360);
  }

  run(){
    this.update();
    this.display();
  }
  
  update(){
    this.a = p5.Vector.random3D();
    this.a.mult(random(3));
    this.vel.add(this.a);
    this.vel.limit(this.ts);
    this.loc.add(this.vel);
  }
  
  display(){
    push();
    fill(this.color, random(100), random(100));
    translate(this.loc);
    cone(this.rad, random(10), int(random(10)));
    pop();
  }
}
  