/*  to complete
*/

class point {
    constructor(x,y) {
        /* Point are coded ny their two coordinates */
        this.x = x ;
        this.y = y ;
    }

    distance(other) {
        /* other is an other instance of point */
        return Math.sqrt( (this.x - other.y) ** 2 + (this.y - other.y) ** 2);
    }

    sameAbsciss(other) {
        return this.x === other.x ;
    }

    sameOrdinate(other) {
        return this.y === other.y ;
    }

    equal(other) {
        return this.sameAbsciss(other) && this.sameOrdinate(other) ;
    }
}

class straightLine {
    constructor(point1, point2) {
        /*  Straight line are coding but two disctinct instance of class point */
        if (!point1.equal(point2)) {
            this.point1 = point1 ;
            this.point2 = point2 ;
        } else {
            throw "A straight line can't be definied by two identical points" ; 
        }
    }

    equation() {
        if (this.point1.sameAbsciss(this.point2)) {
            return([1,0,-this.point1.x])
        } else {
            let direction = ( this.point1.y - this.point2.y) / (this.point1.x - this.point2.x)
            let ordinateOrigin = this.point1.y - direction*this.point1.x ;
            return([-direction, 1, -ordinateOrigin])
        }
    }

    distanceToPoint(point) {
        let lineEquation = this.equation() ;
        let numerator = Math.abs(lineEquation[0]*point.x + lineEquation[1]*point.y + lineEquation[2] );
        let denominator = Math.sqrt(lineEquation[0] ** 2 + lineEquation[1] ** 2);
        return numerator/denominator;
    }
}




// main

let point1 = new point(1,-1) ;
let point2 = new point(1,1) ;
let point3 = new point(-1,1) ;

//console.log(point1.equal(point2))
let toto = new straightLine(point1, point2) ;
//console.log(toto)
console.log(point1.distance(point2))
console.log(toto.equation())
console.log(toto.distanceToPoint(point3))