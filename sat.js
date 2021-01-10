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

    isBefore(point1, point2) {
        /*  We define and order relation which will be usefull to separate points in sat. point1 and point2 must belong to 
            this */
        if (this.point1.sameAbsciss(this.point2)) {
            return point1.y <= point2.y ;
        } else {
            return point1.x <= point2.x ;
        }
    }

    isBeforeStrict(point1, point2) {
        /*  We define and order relation which will be usefull to separate points in sat. point1 and point2 must belong to 
            this */
        if (this.point1.sameAbsciss(this.point2)) {
            return point1.y < point2.y ;
        } else {
            return point1.x < point2.x ;
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

class polygon {
    constructor(vertices, parallelEdge = null) {
        /*  Point array is a list of point which determin the verticies of the polygon. The list must contain 
            only one exemplary of points. 
            One can precise the list od the edge that are parallel on the polygon, it will be usefull to optimise 
            sat algorithme. The structure of parralelEdge is an array of array constaining the number of the edge, 
            with the first edge defining by the first two points, and then following the order. parallelEdge must be null
            or contains all the edge, not only part of the edge. Two array in the same 
            subarray arre parallels. For example, let ABCDEF a polygon, the the array [[0,2],[1,4],[3],[5]] mean that AB//CD, 
            BC//EF , DE and FA are parallel to no other edges. */
        this.vertices = vertices ;
        this.parallelEdge = parallelEdge;
    }

    static getOrthogonalLines(polygonInstance) {
        let verticesLine = [];
        let nbVertices = polygonInstance.vertices.length;
        let line ;
        let nbLoop ;
        if (polygonInstance.parallelEdge === null) {
            nbLoop = polygonInstance.vertices.length ;
            for (let k = 0; k < nbLoop; k++) {
                line = new straightLine(polygonInstance.vertices[k], polygonInstance.vertices[(k+1)%nbVertices]) ;
                verticesLine.push(line) ;
            }
        } else {
            nbLoop = parallelEdge.length ;
            let firstPoint ;
            for (let k = 0; k < nbLoop; k++) {
                firstPoint = polygonInstance.parallelEdge[k][0]
                line = new straightLine(polygonInstance.vertices[firstPoint], polygonInstance.vertices[(firstPoint+1)%nbVertices]) ;
                verticesLine.push(line) ;
            }
        }

        let orthogonalLines = []
        verticesLine.forEach(line => {
            orthogonalLines.push(line.getOrthogonalLine()) ;
        })

        return orthogonalLines ;
    }

    sat(other, areParallel = false) {
        /*  Separating Axes Theorem (S. Gottschalk. Separating axis theorem. Technical Report TR96-024,Department
            of Computer Science, UNC Chapel Hill, 1996) : 
                Two convex polytopes are disjoint iff there exists a separating axis orthogonal 
                to a face of either polytope or orthogonal to an edge from each polytope. 
            The argument areParallet indicate if all the edge of other are parallel to an edge of this. In that
            case, there is no need to compute orthogonal lines of edges of other*/

        // 1. Get all the orthogonal axis : 

        let orthogonalLines = polygon.getOrthogonalLines(this) ;
        if (!areParallel) {
            let otherOrthogonalLine = polygon.getOrthogonalLines(other) ;
            otherOrthogonalLine.forEach(line => {
                orthogonalLines.push(line)
            })
        }

        // 2. point porjection on othogonal line

        let isSeparate = false ;
        let cpt = 0;
        
        while (cpt < orthogonalLines.length && !isSeparate) {
            let line = orthogonalLines[cpt] ;

            let maxThis = new point(-Infinity,-Infinity) ;
            let maxOther = new point(-Infinity,-Infinity) ; 
            let minThis = new point(Infinity,Infinity) ;
            let minOther = new point(Infinity,Infinity) ; 

            let proj
            this.vertices.forEach(vertice => {
                proj = line.orthogonalProjection(vertice) ;
                if(line.isBefore(maxThis, proj)) {
                    maxThis = proj ;
                }

                if(line.isBefore(proj, minThis)) {
                    minThis = proj ;
                }
            })
            
            other.vertices.forEach(vertice => {
                proj = line.orthogonalProjection(vertice) ;
                if(line.isBefore(maxOther, proj)) {
                    maxOther = proj ;
                }

                if(line.isBefore(proj, minOther)) {
                    minOther = proj ;
                }
            })

            if (line.isBeforeStrict(maxThis, minOther) || line.isBeforeStrict(maxOther, minThis)) {
                isSeparate = true
            }

            cpt++ ;
        }

    return isSeparate ;

    }
}




// main

const {performance} = require('perf_hooks');




res = [] ;
res2 = [] ;
let t0, t1 ;
let tm = performance.now() ;
for (let k = 0; k < 100 ; k++) {
    let point1 = new point(Math.random()*(-3),0) ;
    let point2 = new point(0,Math.random()*3) ;
    let point3 = new point(Math.random()*(-3),3) ;
    let point4 = new point(-3, Math.random()*3) ;
    
    let point5 = new point(Math.random()*3,0) ;
    let point6 = new point(3,Math.random()*3) ;
    let point7 = new point(Math.random()*3,3) ;
    let point8 = new point(0, Math.random()*3) ;
    
    let polyg1 = new polygon([point1, point2, point3, point4]) ;
    let polyg2 = new polygon([point5, point6, point7, point8]) ;

    t0 = performance.now() ;
    totodfsdfs = polyg1.sat(polyg2) ; 
    t1 = performance.now() ;
    res.push(t1-t0) ;
    if (!totodfsdfs) {
        res2.push([polyg1, polyg2])
    }
}
let tM = performance.now() ;

const average = arr => arr.reduce((sume, el) => sume + el, 0) / arr.length;

console.log(average(res));
console.log(tM-tm)
console.log(res2.length)

console.log(res2[0][0].vertices)
console.log(res2[0][1].vertices)
