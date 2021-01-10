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

    addVector(v) {
        /* add a vector to ths point */
        let res = new point(this.x + v.x, this.y + v.y) ;
        return res ;
    }
}

class vector {
    constructor(M,N) {
        /*  M and N can be : 
            - two points, in that case, vector coordinate are Difference of N and M coordinates
            - two coordinates
        */
        if (M instanceof point) {
            this.x = N.x - M.x ;
            this.y = N.y - M.y ;
        } else {
            /* vectors are coded ny their two coordinates */
            this.x = M ;
            this.y = N ;
        }
    }

    is0() {
        return this.x === 0 && this.y === 0 ;
    }

    sum(other) {
        /* return the sum of this and another vector v */
        let res = new vector(this.x + other.x, this.y + other.y) ;
        return res ;
    }

    product(lambda) {
        /* return the external product od this per lambda*/
        let res = new vector(lambda * this.x, lambda * this.y) ;
        return res ;
    }

    scalarProduct(other) {
        return this.x*other.x + this.y*other.y ;
    } 

    norm() {
        return Math.sqrt(this.scalarProduct(this)) ;
    }

    othogonalProjection(v) {
        /* return the orthogonal projection of v on this */
        let res = this.product(this.scalarProduct(v) / (this.norm() ** 2));
        return res ;
    }
}

class straightLine {
    constructor(point1, element) {
        /*  Straight line are coding but two disctinct instance of class point. Element can be a point, in that cas, 
            the constructior is obvious, or a vector */

        if (element instanceof point) {
            if (!point1.equal(element)) {
                this.point1 = point1 ;
                this.point2 = element ;
            } else {
                throw "A straight line can't be definied by two identical points" ; 
            }
        } else {
            if (!element.is0()) {
                this.point1 = point1 ;
                this.point2 = point1.addVector(element) ;
            } else {
                throw "A straight line can't be definied by a null vector" ; 
            } 
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

    orthogonalProjection(point) {
        /* return the orthogonal prohjection of point on the straight line this*/
        let direction = new vector(this.point1, this.point2) ;
        let vectorToProject = new vector(this.point1, point) ;
        return this.point1.addVector(direction.othogonalProjection(vectorToProject)) ;
    }

    getOrthogonalLine() {
        /* return the orthogonal line of this which pass through the point (0,0) */
        let lineEquation = this.equation() ;
        let originPoint = new point(0,0) ;
        let orthogonalDirection = new vector(lineEquation[0], lineEquation[1]) ;
        let res = new straightLine(originPoint, orthogonalDirection) ;

        return res ;
    }

}




// main

let point1 = new point(-1,-1) ;
let point2 = new point(3,1) ;
let point3 = new point(1,1) ;
let v1 = new vector(0,-2) ;
let V2 = new vector(1,-1)

//console.log(point1.equal(point2))
let toto = new straightLine(point1, v1) ;

//console.log(toto)
console.log(toto) ;
console.log(toto.getOrthogonalLine()) ;

