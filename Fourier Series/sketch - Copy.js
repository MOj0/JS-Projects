let angle = 0;
let r = 120;
let points = [];

function setup() 
{
  createCanvas(800, 800);
}

function draw() 
{
  background(0);
  stroke(255);

  r = 90 * (4 / (1 * PI));
  let x = r * cos(1 * angle);
  let y = r * sin(1 * angle);

  translate(200, height/2);

  noFill();
  ellipse(0, 0, r*2);
  line(0, 0, x, y);


  ellipse(x, y, r*2/4);
  let x2 = x + r/4 * cos(3*angle);
  let y2 = y + r/4 * sin(3*angle);
  line(x, y, x2, y2);
  line(x2, y2, 200, y2);
  points.unshift(y2);


  translate(200, 0);
  beginShape();
  for(let i = 0; i < points.length; i++)
  {
    vertex(i, points[i]);
  }
  endShape();

  if(points.length > 400)
  {
    points.pop();
  }

  //console.log(Math.round(angle * Math.PI / 180));

  angle -= 0.04;
}