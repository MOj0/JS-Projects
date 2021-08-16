let grid = [];
let n;
let w;
let h;
let playing;

function setup() 
{
    createCanvas(1500, 720);
    n = 20;
    w = width / n;
    h = height / n;
    playing = false;

    for(let j = 0; j < h; j++)
    {
        for(let i = 0; i < w; i++)
        {
            grid.push(new Square(i * n, j * n, n));
        }
    }
}

function draw() 
{
    background(0);
    stroke(128, 128, 128);
    if(playing)
    {
        stroke(0, 0, 255);
    }

    for(let i = 0; i < grid.length; i++)
    {
        grid[i].show();
    }

    if(playing && frameCount % 4 == 0)
    {
        checkGeneration();
    }
}


function mouseClicked()
{
    let index = (int(mouseY / n) * w + int(mouseX / n));

    if(!playing)
    {
        grid[index].state = !grid[index].state;
    }
}

function keyPressed()
{
    if(keyCode == 32) //space
    {
        playing = !playing; //start generations
    }
}

function checkGeneration()
{
    let toBeAlive = [];
    let toDie = [];

    for(let index = 0; index < grid.length; index++)
    {
        let counter = 0;
        for(let i = -1; i <= 1; i++)
        {
            for(let j = -1; j <= 1; j++)
            {
                if(!(i == 0 && j == 0))
                {
                    let checkIndex = index + w * i + j;
                    if(checkIndex >= 0 && checkIndex < grid.length)
                    {
                        if(grid[checkIndex].state)
                        {
                            counter++;
                        }
                    }
                }
            }
        }
        if(grid[index].state) //if its alive
        {
            if(counter < 2 || counter > 3)
            {
                toDie.push(index);
            }
        }
        else if(counter == 3) //if its dead, and has 3 live neighbours
        {
            toBeAlive.push(index);
        }
    }

    for(let i = 0; i < toBeAlive.length; i++)
    {
        grid[toBeAlive[i]].state = true;
    }
    for(let i = 0; i < toDie.length; i++)
    {
        grid[toDie[i]].state = false;
    }
}