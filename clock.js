let font;
let particles = [];  // array of particles
let secString;  // to save seconds for changing chase value
var chase = true;  // boolean should particles chase their spot on time

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// creation of time string
const getTime = () => {
  let minString = minute()<10?"0":"";
  minString = minString + minute();
  secString = second()<10?"0":"";
  secString = secString + second();
  return hour() + " : " + minString + " : " + secString;
}

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  background(33, 31, 31);

  // actualy not needed part just here to not wait 1 second before start of drawing
  let stringSize = getTime().length * 45; 
  let points = font.textToPoints(getTime(), (windowWidth/2 - stringSize), windowHeight/2, 192, {
    sampleFactor: 0.1
  });
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    let part = new Particle(pt.x, pt.y);
    particles.push(part);
  }
}

function draw() {
  background(33, 31, 31);
  // change of chase value
  if(abs(second() - secString) >= 2){
    chase = !chase;
  }

  // change of time
  if(second()%2 == 0 ){
    let stringSize = getTime().length * 45; 
    let points = font.textToPoints(getTime(), (windowWidth/2 - stringSize), windowHeight/2, 192, {
      sampleFactor: 0.1
    });

    if(points.length >= particles.length){
      for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        if(i >= particles.length){
          particles.push(new Particle(pt.x, pt.y));
        }else{
          particles[i].target = createVector(pt.x, pt.y);
        }
      }
    }else{
      for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        particles[i].target = createVector(pt.x, pt.y);
      }
      particles.length = points.length;
    }
  }

  // drawing of particles
  for (let i = 0; i < particles.length; i++) {
    let v = particles[i];
    v.behaviors(chase);
    v.update();
    v.show();
  }
}