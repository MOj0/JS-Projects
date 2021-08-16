const WIDTH = innerWidth - 3;
const HEIGHT = innerHeight - 3;
let points = [];
let n;
let difference;
let minPoint;

let x1;
let y1;
let x2;
let y2;
let x0;
let y0;

let wrapPoints = [];
let availablePoint;
let addX = 0;
let addY = 0;

function setup()
{
    //frameRate(5);
    createCanvas(WIDTH, HEIGHT);

    difference = 200;
    n = 20;
    minPoint = new Point(Infinity, 0);

    for(let i = 0; i < n; i++)
    {
        points.push(new Point(int(random(difference, innerWidth - difference)), int(random(difference, innerHeight - difference))));
    }

    for(p of points)
    {
        if(p.x < minPoint.x)
        {
            minPoint = p;
        }
    }

    wrapPoints.push(minPoint);
}

function draw()
{
    background(0);

    x1 = wrapPoints[wrapPoints.length - 1].x;
    y1 = wrapPoints[wrapPoints.length - 1].y;
    x2 = addX;
    y2 = addY;

    let v1 = createVector(x2 - x1, y2 - y1).normalize().mult(40);
    //DRAW VECTOR
    /* stroke(255, 0, 0);
    strokeWeight(10);
    line(x1, y1, x1 + v1.x, y1 + v1.y); */

    if(x2 < WIDTH && y2 == 0)
    {
        addX += 3;
    }
    else if(y2 < HEIGHT && x2 >= WIDTH)
    {
        addY += 3;
    }
    else if(y2 >= HEIGHT && x2 >= 0)
    {
        addX -= 3;
    }
    else if(x2 <= 0)
    {
        addY -= 3;
    }

    stroke(0, 0, 255);
    strokeWeight(2);
    line(x1, y1, x2, y2);

    for(p of points)
    {
        availablePoint = true;
        for(let i = 0; i < wrapPoints.length; i++)
        {
            if(p === wrapPoints[i])
            {
                availablePoint = false;
            }
        }
        if(availablePoint || (p == wrapPoints[0] && wrapPoints.length > 3))
        {
            x0 = p.x;
            y0 = p.y;

            if(lineToPointIntersects(x1, y1, x2, y2, x0, y0, p.r))
            {
                let v2 = createVector(x0 - x1, y0 - y1).normalize();

                if(p == wrapPoints[0] && wrapPoints.length > 3)
                {
                    wrapPoints.push(wrapPoints[0]);
                    noLoop();
                }
                else if(v1.dot(v2) > 0)
                {
                    wrapPoints.push(p);
                    break;
                }
            }
            p.show();
        }
    }

    for(wp of wrapPoints)
    {
        wp.color = [255, 0, 0];
        wp.show();
    }

    if(wrapPoints.length > 1)
    {
        for(let i = wrapPoints.length - 1; i > 0; i--)
        {
            stroke(255, 0, 0);
            line(wrapPoints[i].x, wrapPoints[i].y, wrapPoints[i - 1].x, wrapPoints[i - 1].y);
        }
    }
}


function lineToPointIntersects(x1, y1, x2, y2, x0, y0, pointSize)
{
    let dist = (abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1)) / (sqrt(sq(y2 - y1) + sq(x2 - x1)));

    if(dist <= sqrt(pointSize))
    {
        return true;
    }
    return false;
}