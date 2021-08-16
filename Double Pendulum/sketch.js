let r1 = 200;
let r2 = 200;
let m1 = 20;
let m2 = 20;
let a1 = Math.PI/2;
let a2 = Math.PI/2;
let a1_v = 0;
let a2_v = 0;
let trace = [];
let g = 1;

function setup() 
{
  createCanvas(1000, 1000);
}

function draw() 
{
  background(255);
  stroke(0);
  strokeWeight(2);
  fill(0);

  translate(600, 250);

  let a1_a = (-g * ( 2 * m1 + m2) * sin(a1) - m2*g*sin(a1 - 2*a2) - 2*sin(a1-a2)*m2 *(a2_v*a2_v*r2 + a1_v*a1_v*r1*cos(a1-a2))) / (r1*(2*m1 + m2 - m2*cos(2*a1 - 2*a2)));
  let a2_a = (2*sin(a1-a2)*(a1_v*a1_v*r1*(m1+m2) + g*(m1+m2)*cos(a1) + a2_v*a2_v*r2*m2*cos(a1-a2))) / (r2*(2*m1+m2 - m2*cos(2*a1 - 2*a2)));

  /*let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;*/


  let x1 = r1 * sin(a1); // sin(kot) = x / r1 -> x = sin(kot) * r1
  let y1 = r1 * cos(a1);
  line(0, 0, x1, y1);
  ellipse(x1, y1, m1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  trace.push(x2, y2);
  for(let i = 0; i < trace.length; i += 2)
  {
    line(trace[i], trace[i+1], trace[i+2], trace[i+3]);
    //point(trace[i], trace[i+1]);
  }

  if(trace.length > 2000)
  {
    trace.splice(0, 2);
  }

  line(x1, y1, x2, y2);
  ellipse(x2, y2, m2);

  a1_v += a1_a;
  a2_v += a2_a;

  a1 += a1_v;
  a2 += a2_v;
}