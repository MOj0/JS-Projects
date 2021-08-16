let scl;
let n;
let board = [];
let clicked = [];
let bombs;
let flagged = [];

function setup() 
{
  createCanvas(800, 800); //width = height
  bombs = 25;
  n = 15;
  scl = width / n;

  for(let i = 0; i < n*n; i++)
  {
    board.push(0);
  }

  while(bombs > 0)
  {
    for(let i = 0; i < n*n; i++)
    {
      if(int(random(1, 11)) > 8)
      {
        board[i] = 1;
        bombs--;
      }
      if(bombs <= 0)
      {
        break;
      }
    }
  }
}

function draw() 
{
  background(0);
  stroke(255);
  strokeWeight(2);
  textSize(scl/2);

  for(let i = 0; i <= width / scl; i++)
  {
    line(0, i * scl, width, i * scl);
    line(i * scl, 0, i * scl, height);
  }

  for(let i = 0; i < clicked.length; i++)
  {
    let index = clicked[i];
    let x = (index % n) * scl;
    let y = int(index / n) * scl;
    let bombCounter = 0;
    
    if(board[index] === 1)
    {
      fill(255, 0, 0);
      rect(x, y, scl, scl);
    }
    else
    {
      fill(255);
      let lowerBound = -1;
      let upperBound = 1;
      let edge = n - (index % n);
      if(edge == 1)
      {
        upperBound--; //desni rob
      }
      else if(edge == n)
      {
        lowerBound++; //levi rob
      }
      
      for(let j = -1; j <= 1; j++)
      {
        for(let k = lowerBound; k <= upperBound; k++)
        {
          let indexCheck = index + j * n + k;
          if(board[indexCheck] == 1)
          {
            bombCounter++;
          }
        }
      }
      text(bombCounter, x + scl/6, y + scl / 1.7);
    }
  }

  for(let i = 0; i < flagged.length; i++)
  {
    let index = flagged[i];
    let x = (index % n) * scl;
    let y = int(index / n) * scl;
    
    fill(0, 0, 255);
    rect(x, y, scl, scl);
  }
}

function mouseReleased()
{
  if(mouseX <= width && mouseY <= height)
  {
    let x = int(mouseX / scl);
    let y = int(mouseY / scl);
    let index = x + y * n;
    let condition = true;

    if(mouseButton === RIGHT)
    {
      for(let i = 0; i < flagged.length; i++)
      {
        if(flagged[i] == index)
        {
          flagged.splice(i, 1);
          condition = false;
        }
      }
      if(condition)
      {
        flagged.push(index);
      }
    }
    else
    {
      clicked.push(index);
    } 
  }
}