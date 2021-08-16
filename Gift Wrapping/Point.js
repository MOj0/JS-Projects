class Point
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.r = 10;
        this.color = [255, 255, 255];
    }

    show()
    {
        fill(this.color);
        ellipse(this.x, this.y, this.r, this.r);
    }
}