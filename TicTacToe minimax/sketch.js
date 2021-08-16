let w; 
let h;
let board = [];
let counter = 0;

function setup() 
{
  createCanvas(600,600);
  w = width/3;
  h = height/3;
  //fill board...
  for(var i = 0; i < 3; i++)
  {
    board[i] = []; //make 2D
    for(var j = 0; j < 3; j++)
    {
      board[i][j] = 0;
    }
  }

  background(255);
  stroke(0);
  strokeWeight(8);

  for(var i = 1; i < 3; i++)
  {
    line(0, h*i, width, h*i);
    line(i*w, 0, i*w, height);
  }
  
}

function draw()
{
  for(let i = 0; i < 3; i++)
  {
    for(let j = 0; j < 3; j++)
    {
      if(board[i][j] == 1)
      {
        ellipse(j*w + w/2, i*h + h/2, 130);
      }
      else if(board[i][j] == 2)
      {
        line(j*w + w/8, i*h + h/8, j*w + w - w/8, i*h + h - h/8);
        line(j*w + w - w/8, i*h + h/8, j*w + w/8, i*h + h - h/8);
      }
    }
  }

  let state = checkWin(board);
  if(state != 0)
  {
    console.log(state);
    if(state != 3)
    {
      document.getElementById("winner").innerHTML = "Player " + state + " won!";
    }
    else
    {
      document.getElementById("winner").innerHTML = "Tie!";
    }
    document.getElementById("winner").readOnly = true;
    noLoop();
  }
}

function mouseClicked()
{
  if(mouseX < 600 && mouseY < 600 && counter == 0)
  {
    var x = int(mouseX / w);
    var y = int(mouseY / h);
    if(board[y][x] == 0)
    {
      board[y][x] = 1;
      counter = (counter+1) % 2;

      let state = checkWin(board);
      if(state != 0)
      {
        console.log(state);
        if(state != 3)
        {
          document.getElementById("winner").innerHTML = "Player " + state + " won!";
        }
        else
        {
          document.getElementById("winner").innerHTML = "Tie!";
        }
        noLoop();
        return;
      }
    }
  }

  if(mouseX < 600 && mouseY < 600 && counter == 1)
  {
    let aiMove = aiTurn(board);
    board[aiMove.i][aiMove.j] = 2;
    counter = (counter+1) % 2;
  }
}


function checkWin(board)
{
  for(let i = 0; i < 3; i++)
  {
    if(board[i][0] != 0)
    {
      if(board[i][0] == board[i][1] && board[i][1] == board[i][2]) //horizontally
      {
        return board[i][0];
      }
    }

    if(board[0][i] != 0)
    {
      if(board[0][i] == board[1][i] && board[1][i] == board[2][i]) //vertically
      {
        return board[0][i];
      }
    }
  }

  if(board[0][0] != 0)
  {
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]) //diagonally \
    {
      return board[0][0];
    }
  }

  if(board[0][2] != 0)
  {
    if(board[0][2] == board[1][1] && board[1][1] == board[2][0]) //diagonally /
    {
      return board[0][2];
    }
  }

  for(let i = 0; i < 3; i++)
  {
    for(let j = 0; j < 3; j++)
    {
      if(board[i][j] == 0)
      {
        return 0;
      }
      else if(i == 2 && j == 2) //tie
      {
        return 3;
      }
    }
  }
  
  return 0;
}

function aiTurn(board)
{
  let move;
  let highestScore = -Infinity;

  for(let i = 0; i < 3; i++)
  {
    for(let j = 0; j < 3; j++)
    {
      if(board[i][j] == 0)
      {
        board[i][j] = 2;
        let score = minimax(board, 0, false);
        board[i][j] = 0;

        if(score > highestScore)
        {
          highestScore = score;
          move = {i, j};
        }
      }
    }
  }

  return move;
}

function minimax(board, isMaximizing, depth)
{
  let win = checkWin(board);
  if(win != 0)
  {
    if(win == 1) //player wins
    {
      return -10;
    }
    else if(win == 3) //tie
    {
      return 0;
    }
    else //AI wins
    {
      return 10;
    }
  }

  if(isMaximizing)
  {
    let highestScore = -Infinity;
    for(let i = 0; i < 3; i++)
    {
      for(let j = 0; j < 3; j++)
      {
        if(board[i][j] == 0)
        {
          board[i][j] = 2;
          let score = minimax(board, false, depth+1);
          board[i][j] = 0;
          highestScore = max(highestScore, score);
        }
        
      }
    }

    return highestScore;
  }
  else
  {
    let highestScore = Infinity;
    for(let i = 0; i < 3; i++)
    {
      for(let j = 0; j < 3; j++)
      {
        if(board[i][j] == 0)
        {
          board[i][j] = 1;
          let score = minimax(board, true, depth+1);
          board[i][j] = 0;
          highestScore = min(highestScore, score);
        }
      }
    }

    return highestScore;
  }
}