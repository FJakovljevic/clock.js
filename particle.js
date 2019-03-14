class Particle {
  constructor(x, y) {
    this.pos = createVector(x-((random(2)-1)*100), y-((random(2)-1)*100));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxspeed = 10;
    this.maxforce = 1;
  }

  behaviors(chase) {
    
    if(chase){
      let arrive = this.arrive(this.target);
      arrive.mult(2);
      this.applyForce(arrive);
    }else{
      var flee1 = this.flee(createVector(this.pos.x-((random(2)-1)*100), this.pos.y-((random(2)-1)*100)));
      this.applyForce(flee1);
    }
    
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee(mouse); 
    flee.mult(3);
    this.applyForce(flee);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }

  show() {
    stroke(255);
    strokeWeight(8);
    point(this.pos.x, this.pos.y);
  }

  arrive(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    let speed = this.maxspeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxspeed);
    }
    desired.setMag(speed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  }

  flee(target) {
    let desired = p5.Vector.sub(target, this.pos);
    let d = desired.mag();
    if (d < 100) {
      desired.setMag(this.maxspeed);
      desired.mult(-1);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }
}