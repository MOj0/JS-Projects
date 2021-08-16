class Square
{
    constructor(x, y, n)
    {
        this.x = x;
        this.y = y;
        this.size = n;
        this.state = false;
    }

    show()
    {
        fill(0);
        if(this.state)
        {
            fill(255);
        }
        rect(this.x, this.y, this.size, this.size);
    }
}