const DefaultTwists = 0.5;

let rad;
let v;
let turn = 0;
let num;
// let twists = 1;
let twistSlider;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	twistSlider = createSlider(0, 10, DefaultTwists, 0);
	twistSlider.position(10, 10);
	colorMode(HSB, 360, 100, 100, 100);
	rad = height * 0.3;
	v = height * 0.1;
	num = height * 0.5;
	frameRate(30)
}

function draw() {
	background(40, 20, 100);
	orbitControl(2, 1, 0.05);
	//background(10);
	lights();
	push();
	//noStroke();
	rotateX(turn);
  rotateY(turn);
  rotateZ(turn);
  drawTrack(100, rad, v);
	drawEdges(100, rad, v);
	turn += 0.003
	pop();
}

function drawTrack(steps, rad, v) {
	beginShape(TRIANGLE_STRIP);
	fill(0);
	strokeWeight(2);
	stroke(255);
	let twists = twistSlider.value();
  print(twists);
	for (let step = 0; step < (steps + 1); step += 1) {
		let u = step * TAU / steps;
		let x = (rad - v * cos(twists * u)) * cos(u);
		let y = (rad - v * cos(twists * u)) * sin(u);
		let z = -v * sin(twists * u);
		vertex(x, y, z);
		x = (rad + v * cos(twists * u)) * cos(u);
		y = (rad + v * cos(twists * u)) * sin(u);
		z = v * sin(twists * u);
		vertex(x, y, z);
	}
	endShape(CLOSE);
}

function drawEdges(steps, rad, v) {
	let twists = twistSlider.value();
  for (let step = 0; step < (steps + 1); step += 1) {
		fill(260, random(100), 100);
		stroke(0)
		let u = step * TAU / steps;
		let x = (rad - v * cos(twists * u)) * cos(u);
		let y = (rad - v * cos(twists * u)) * sin(u);
		let z = -v * sin(twists * u);
		push();
		translate(x, y, z);
		//box(10)c
		box(random(6, 10))
		pop();
		x = (rad + v * cos(twists * u)) * cos(u);
		y = (rad + v * cos(twists * u)) * sin(u);
		z = v * sin(twists * u);
		push();
		translate(x, y, z);
		box(random(6, 10))
		//box(10);
		pop();
	}
}