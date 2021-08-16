class Krog
{
  constructor(x, y, r)
  {
    this.pos = createVector(x, y);
    this.r = r;
  }
  
  show()
  {
    fill(100);
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  pLinijeKroga(k, n)
  {
    let p = this.pos.x;
    let q = this.pos.y;

    //krog: sq(x-p) + sq(y-q) = sq(r)
    //premica: y = kx + n

    //????????????????
    let a = 1 + sq(k);
    let b = -p * 2 + (k * (n - q)) * 2;
    let c = sq(p) + sq(n - q) - sq(this.r);

    let d = sq(b) - 4 * a * c;

    if (d >= 0)
    {
      var intersections = [
        (-b + sqrt(sq(b) - 4 * a * c)) / (2 * a),
        (-b - sqrt(sq(b) - 4 * a * c)) / (2 * a)
      ];

      if (d == 0) {
          return [intersections[0]];
      }
      return intersections;
    }

  //no intersection
  return [];
  }
}

let krog = [];
let koordinate = [];
let xOff = 0.0;
let yOff = 800.0;

function setup()
{
  createCanvas(innerWidth, innerHeight);
  background(0);
  for(let i = 0; i < 10; i++)
  {
    let r1 = random(width*0.10, width*0.90);
    let r2 = random(height*0.10, height*0.90);
    let r = random(10, 100);
    
    krog.push(new Krog(r1, r2, r));
  }
}

function draw()
{
  let currX = noise(xOff) * width;
  let currY = noise(yOff) * height;
  let distance = Infinity;

  //tukaj lahko samo menjas na mouseX, mouseY..
  let x = currX;
  let y = currY;

  for(let i = 0; i < krog.length; i++)
  {
    //krog[i].show();
    let k = (y - krog[i].pos.y) / (x - krog[i].pos.x);
    let n = y - k*x;

    let pres = krog[i].pLinijeKroga(k, n);
    for(let j = 0; j < pres.length; j++)
    {
      pres[j] = pres[j] + ((krog[i].pos.x - pres[j]) / 2); //ga nastavi na presecisce
    }

    let yKoord0 = k*pres[0] + n;
    let yKoord1 = k*pres[1] + n;

    let d;

    let dist1 = dist(x, y, pres[0], yKoord0);
    let dist2 = dist(x, y, pres[1], yKoord1);

    if(dist1 < dist2)
    {
      d = dist1;
    }
    else
    {
      d = dist2;
    }

    if(d < distance)
    {
      distance = d;
    }
  }

  let pogoj = true;

  for(k of krog)
  {
    if(dist(x, y, k.pos.x, k.pos.y) < k.r/2)
    {
      pogoj = false;
    }
  }

  if(pogoj)
  {
    fill(random(1, 255), random(1, 255), random(1, 255));
    ellipse(x, y, 2*distance);
  }

  xOff += 0.015;
  yOff += 0.01;
}