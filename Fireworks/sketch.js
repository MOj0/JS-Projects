class Firework
{
  constructor()
  {
    this.pos = createVector(random(20, width-30), height);
    this.vel = createVector(0, random(-9, -12));
    this.color = [random(1, 255), random(1, 255), random(1, 255), 255];
  }

  show()
  {
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, 10);
  }

  move(g)
  {
    this.vel.add(g);
    this.pos.add(this.vel);
  }

  explode()
  {
    fireworks.pop();
    for(let i = 0; i < 15; i++)
    {
      explosion.push(new Particle(this.pos.x, this.pos.y, this.color));
    }
  }
}


class Particle
{
  constructor(x, y, c)
  {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-30, 30), random(-30, 30));
    this.color = c;
  }

  show()
  {
    this.vel.mult(0.85);
    this.pos.add(this.vel);

    fill(this.color)
    ellipse(this.pos.x, this.pos.y, 4);

    if(abs(this.vel.x) < 0.01 && abs(this.vel.x > 0)) //if it has stopped
    {
      explosion.splice(0, 15); //delete particles that are connected to the first firework
    }
  }
}


let fireworks = [];
let gravity;
let explosion = [];
let r;

function setup() 
{
  createCanvas(innerWidth, innerHeight);
  background(0);

  fireworks.push(new Firework());
  gravity = createVector(0, 0.1);

  r = random(1);
}

function draw() 
{
  background(0, 70);

  if(r < 0.05 || fireworks.length === 0)
  {
    fireworks.unshift(new Firework());
  }

  if(r < 0.001)
  {
    background(0);
  }

  if(fireworks.length > 0)
  {
    for(f of fireworks)
    {
      f.show();
      f.move(gravity);
    
      if(f.vel.y >= 0)
      {
        f.explode();
      }
    }
  }

  if(explosion.length > 0)
  {
    for(let e of explosion)
    {
      e.show();
    }
  }
  
  r = random(1);
}