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
    if(win)
    {
      fill(random(1, 255), random(1, 255), random(1, 255), 200)
    }
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


  click(x, y, index)
  {
    let hasntBeenClicked = true;

    if(dist(x, y, this.pos.x, this.pos.y) < this.r/2)
    {
      for(let i of indices)
      {
        if(index == i)
        {
          hasntBeenClicked = false;
        }
      }

      if(hasntBeenClicked)
      {
        indices.push(index);
        stevec++;
      }
    }

    if(stevec == krog.length)
    {
      win = true;
      stevec++;
    }
  }
}


function mousePressed()
{
  for(let i = 0; i < krog.length; i++)
  {
    krog[i].click(mouseX, mouseY, i);
  }
}



let krog = [];
let koordinate = [];
let indices = [];
let totalCircles = 2;
let stevec = 0;
let st = 0;
let win = false;
let database;
let username;
//let xOff = 0.0;
//let yOff = 800.0;

function setup()
{
  //FIREBASE
  var firebaseConfig = {
    apiKey: "AIzaSyA6pFf5sJ3BJcqZ_9BPwETZ01XWsHBIcBk",
    authDomain: "find-o-7c387.firebaseapp.com",
    databaseURL: "https://find-o-7c387.firebaseio.com",
    projectId: "find-o-7c387",
    storageBucket: "find-o-7c387.appspot.com",
    messagingSenderId: "983054630406",
    appId: "1:983054630406:web:3afe59d524317b498ccd87",
    measurementId: "G-J9N4XLK8SZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  database = firebase.database();

  createCanvas(innerWidth, innerHeight);
  background(0);

  username = document.getElementById("usr").value; //TO-DO: dobi value od "usr" (jQuery...)
  //TO-DO: ce se odpre index.html, brez username, redirectaj na login.html
  console.log(username);

  let pozicije = [];

  for(let i = 0; i < totalCircles; i++)
  {
    let r1 = random(width*0.10, width*0.90);
    let r2 = random(height*0.10, height*0.90);
    let r = random(10, 100);
    
    for(let j = 0; j < pozicije.length; j += 3) //da se krogi ne prekrivajo
    {
      let d = dist(pozicije[j], pozicije[j+1], r1, r2);

      while(d <= pozicije[j+2]+100)//dokler je razdalja od sredisc manjsa od polmera, generiraj nove koordinate
      {
        r1 = random(width*0.10, width*0.90);
        r2 = random(height*0.10, height*0.90);
        d = dist(pozicije[j], pozicije[j+1], r1, r2);
      } 
    }
    pozicije.push(r1, r2, r);
    
    krog.push(new Krog(r1, r2, r));
  }
}

function draw()
{
  background(0);
  //let currX = noise(xOff) * width;
  //let currY = noise(yOff) * height;
  let distance = Infinity;

  //tukaj lahko samo menjas na mouseX, mouseY..
  let x = mouseX;
  let y = mouseY;

  for(let i = 0; i < krog.length; i++)
  {
    if(!win)
    {
      for(let j of indices)
      {
        krog[j].show();
      }
    }
    else
    {
      krog[i].show();
    }
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
    //fill(random(1, 255), random(1, 255), random(1, 255)); //epislpsy
    fill(255);
    ellipse(x, y, 2*distance);
  }

  
  if(!win)
  {
    st++;
  }
  else
  {
    let score = (Math.round(st/60 * 1000) / 1000);
    console.log(score);

    let ref = database.ref("scores");
  
    var data = {
      name: username,
      score: score
    }

    ref.push(data);

    while(true)
    {

    }
  }
}