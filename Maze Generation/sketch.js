class Cell
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true]; //top, right, bottom, left
    this.visited = false;
  }

  show()
  {
    stroke(255);
    if(this.walls[0])
    {
      line(this.x, this.y, this.x + w, this.y);
    }
    if(this.walls[1])
    {
      line(this.x + w, this.y, this.x + w, this.y + w);
    }
    if(this.walls[2])
    {
      line(this.x + w, this.y + w, this.x, this.y + w);
    }
    if(this.walls[3])
    {
      line(this.x, this.y + w, this.x, this.y);
    }

    if(this.visited)
    {
      noStroke();
      fill(0, 0, 255, 80);
      rect(this.x, this.y, w, w);
    }
  }

  hasNeighbours(c)
  {
    let neighbours = [];
    let cols = Math.floor(width / w);
    let r = random(1); //hecanje

    //IF IT EXISTS && IF IT HASN'T BEEN VISITED && EDGE CASES
    if(grid[c+1] && !grid[c+1].visited && c % cols != cols-1)
    {
      neighbours.push(c+1);
    }
    if(grid[c-1] && !grid[c-1].visited && c % cols != 0)
    {
      neighbours.push(c-1);
    }
    if(grid[c + Math.floor(height / w)] && !grid[c + Math.floor(height / w)].visited)
    {
      neighbours.push(c + Math.floor(height / w));
    }
    if(grid[c - Math.floor(height / w)] && !grid[c - Math.floor(height / w)].visited)
    {
      neighbours.push(c - Math.floor(height / w));
    }

    if(r > 0.2)
    {
      if(neighbours.length > 0)
      {
        let r = Math.floor(random(0, neighbours.length));
        return neighbours[r];
      }
      return false;
    }
    else
    {
      return "random";
    }
  }

  removeWalls(thisIndex, otherIndex)
  {
    let dir = otherIndex - thisIndex; //+1 x->, -1 x<-, 10 y->, -10 y<-

    if(dir == 1)
    {
      this.walls[1] = false;
      grid[otherIndex].walls[3] = false;
    }
    else if(dir == -1)
    {
      this.walls[3] = false;
      grid[otherIndex].walls[1] = false;
    }
    else if(dir == Math.floor(height / w))
    {
      this.walls[2] = false;
      grid[otherIndex].walls[0] = false;
    }
    else if(dir == -Math.floor(height / w))
    {
      this.walls[0] = false;
      grid[otherIndex].walls[2] = false;
    }
  }


  showCurrent()
  {
    fill(0, 255, 0, 200);
    rect(this.x, this.y, w, w);
  }

  move(dir)//dir: 0 - up, 1 - right, 2 - down, 3 - left
  {
    if(!this.walls[dir])
    {
      return true;
    }
    else
    {
      return false;
    }
  }

}


let grid = [];
let w;
let current;
let stack = [];
let player;
let gameStarted = false;
let counter;


function setup() 
{
  createCanvas(900, 900);
  //frameRate(3);
  w = 30;
  current = 0;
  player = 0;
  counter = 0;

  for(let y = 0; y < Math.floor(height / w); y++)
  {
    for(let x = 0; x < Math.floor(width / w); x++)
    {
      grid.push(new Cell(x * w, y * w));
    }
  }

  document.onkeydown = checkKey;

  function checkKey(e) 
  {
    if(gameStarted)
    {
      e = e || window.event;

      if (e.keyCode == '38') //up
      {
        if(grid[player].move(0))
        {
          player -= Math.floor(width / w);
        }
      }
      else if (e.keyCode == '40') //down
      {
        if(grid[player].move(2))
        {
          player += Math.floor(width / w);
        }
      }
      else if (e.keyCode == '37') //left
      {
        if(grid[player].move(3))
        {
          player -= 1;
        }
      }
      else if (e.keyCode == '39') //right
      {
        if(grid[player].move(1))
        {
          player += 1;
        }
      }
    }
  }
}

function draw() 
{
  background(0);
  for(g of grid)
  {
    g.show();
  }
  if(grid[current]) //if it exsits
  {
    //grid[current].showCurrent();
    let next = grid[current].hasNeighbours(current);
    
    if(typeof(next) == "number")
    {
      stack.push(current);
      grid[current].removeWalls(current, next);
      current = next;
      grid[current].visited = true;
    }
    else if(typeof(next) == "string")
    {
      grid[current].visited = false; //to-do: je prevec enostavno (za playerja...)
      current = stack.pop();
    }
    else
    {
      current = stack.pop();
    }
  }
  else //game starts
  {
    if(player === grid.length-1)
    {
      console.log("It took you " + counter/60 + " seconds");
      throw '';
    }
    gameStarted = true;
    grid[player].showCurrent();

    counter++;
  }
  
}