class Circle
{
  constructor(x, y, r)
  {
    this.pos = createVector(x, y);
    this.r = r;
  }

  show()
  {
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

function mouseClicked()
{
  rgbMode = !rgbMode;
}



let angle = 0;
let stevec = 0.12;
let circles = [];
let rgbMode = false;

function setup() 
{
  createCanvas(innerWidth, innerHeight);

  for(let i = 0; i < 8; i++)
  {
    let x = random(100, width-100);
    let y = random(100, height-100);
    let r = random(50, 100);

    circles.push(new Circle(x, y, r));
  } 
}

function draw() 
{
  background(0);
  fill(255);
  ellipse(50,50,20); //start dot

  stroke(255);
  strokeWeight(3);
  line(50, 50, 10000*Math.sin(angle * Math.PI / 180)+50, 10000*Math.cos(angle * Math.PI / 180)+50); //glavna premica
  //line(width/2, height/2, 10000*Math.sin(angle * Math.PI / 180)+width/2, 10000*Math.cos(angle * Math.PI / 180)+height/2);

  let x = 50;
  let y = 50;

  let k = (y - (100*Math.cos(angle * Math.PI / 180)+y)) / (x - (100*Math.sin(angle * Math.PI / 180)+x));
  if(k == -Infinity) //bug fix...
  {
    k = -Math.pow(10, 10);
  }
  let n = (100*Math.cos(angle * Math.PI / 180)+y) - k*(100*Math.sin(angle * Math.PI / 180)+x);

  for(let counter = 0; counter < 10; counter++)
  { 
    let distance = Infinity;
    for(let c of circles)
    {
      c.show();
      let d = dist(x, y, c.pos.x, c.pos.y) - c.r/2;
      distance = min(d, distance);
    }

    if(distance < 1)
    {
      break;
    }

    stroke(255);
    strokeWeight(0.5);
    if(rgbMode)
    {
      fill(random(1, 255), random(1, 255), random(1, 255), 100);
    }
    else
    {
      fill(255, 255, 255, 20);
    }
    ellipse(x, y, distance*2);

    let p = x;
    let q = y;

    //????????????????
    let a = 1 + sq(k);
    let b = -p * 2 + (k * (n - q)) * 2;
    let c = sq(p) + sq(n - q) - sq(distance);

    let d = sq(b) - 4 * a * c;

    let xIntersection = 0;

    if (d > 0)
    {
      xIntersection = (-b + sqrt(sq(b) - 4 * a * c)) / (2 * a);
    }

    let yIntersection = k*xIntersection + n;


    //INTERSECTION POINT
    fill(255, 255, 255, 200);
    ellipse(xIntersection, yIntersection, 10);

    x = xIntersection;
    y = yIntersection;
  }

  angle += stevec;

  if(angle >= 90 || angle <= 0)
  {
    stevec *= -1;
  }
}