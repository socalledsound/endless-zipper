export class Bezier{
    constructor(b1, b2, xDist) {
    //Final stage which takes p, p+1 and calculates the rotation, distance on the path and accumulates the total distance
    this.rad = Math.atan(b1.point.mY / b1.point.mX);
    this.b2 = b2;
    this.b1 = b1;
    // dx = (b2.x - b1.x);
    // dx2 = (b2.x - b1.x) * (b2.x - b1.x);
    this.dist = Math.sqrt(((b2.x - b1.x) * (b2.x - b1.x)) + ((b2.y - b1.y) * (b2.y - b1.y)));
    xDist = xDist + this.dist;
    this.curve = {
        rad: this.rad,
        dist: this.dist,
        cDist: xDist
    };
    }

}

export class BezierT{
    constructor(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
        //calculates the tangent line to a point in the curve; later used to calculate the degrees of rotation at this point.
        this.mx = (3 * (1 - t) * (1 - t) * (control1X - startX)) + ((6 * (1 - t) * t) * (control2X - control1X)) + (3 * t * t * (endX - control2X));
        this.my = (3 * (1 - t) * (1 - t) * (control1Y - startY)) + ((6 * (1 - t) * t) * (control2Y - control1Y)) + (3 * t * t * (endY - control2Y));
    }

}

export class Bezier2{
    //Quadratic bezier curve plotter
    constructor(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY) {
        this.Bezier1 = new Bezier1(t, startX, startY, control1X, control1Y, control2X, control2Y);
        this.Bezier2 = new Bezier1(t, control1X, control1Y, control2X, control2Y, endX, endY);
        this.x = ((1 - t) * this.Bezier1.x) + (t * this.Bezier2.x);
        this.y = ((1 - t) * this.Bezier1.y) + (t * this.Bezier2.y);
        this.slope = new BezierT(t, startX, startY, control1X, control1Y, control2X, control2Y, endX, endY);
    
        this.point = {
            t: t,
            x: this.x,
            y: this.y,
            mX: this.slope.mx,
            mY: this.slope.my
        };
    }

}

export class Bezier1{
    constructor(t, startX, startY, control1X, control1Y, control2X, control2Y) {
    //linear bezier curve plotter; used recursivly in the quadratic bezier curve calculation
    this.x = ((1 - t) * (1 - t) * startX) + (2 * (1 - t) * t * control1X) + (t * t * control2X);
    this.y = ((1 - t) * (1 - t) * startY) + (2 * (1 - t) * t * control1Y) + (t * t * control2Y);

    }

}