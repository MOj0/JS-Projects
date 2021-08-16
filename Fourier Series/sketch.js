let angle = 0;
let r;
let points = [];
let slider;

function setup() 
{
  createCanvas(1000, 800);
  slider = createSlider(1, 20, 1);
}

function draw() 
{
  background(0);

  let x = 350;
  let y = height/2;
  
  for(let i = 0; i < slider.value(); i++)
  {
    let n = i * 2 + 1;
    let prevX = x;
    let prevY = y;
    r = 120 * (4 / (n * PI));
    x += r * cos(n * angle);
    y += r * sin(n * angle);

    stroke(255, 75);
    noFill();
    ellipse(prevX, prevY, r * 2);

    stroke(255);
    line(prevX, prevY, x, y);
  }

  points.unshift(y);
  line(x, y, 650, y);

  translate(650, 0);
  beginShape();
  noFill();
  for(let i = 0; i < points.length; i++)
  {
    vertex(i, points[i]);
  }
  endShape();

  if(points.length > 600)
  {
    points.pop();
  }

  angle -= 0.03;
}