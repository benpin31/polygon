import {point, polygon, square} from "./polygon.mjs"

/*  Various functions

    This part gather various functions which will be usefull in the rest of the code
*/

function positivMod(n, mod) {
    // classic n%mod operator gives a negative number when n < 0. This function give a positive modulo in such cases .
    return (n%mod+mod)%mod;
}

class hero extends square {
    constructor() {
        /*  Body hitBox */
        let intialPosition = new point(3/2,1/2) ;
        super(intialPosition, [1,Math.PI/4])

        /*  foot hitBox */
        let footPoint = this.getLowestPointIndex()
        if (footPoint.length == 2) {
            let footPoint1 = this.vertices[footPoint[0]] ;
            let footPoint2 = this.vertices[footPoint[1]] ;
            let footPoint3 = point.segmentCenter(footPoint2, this.vertices[positivMod(footPoint[1]+1,4)]) ;
            let footPoint4 = point.segmentCenter(footPoint1, this.vertices[positivMod(footPoint[0]-1,4)]) ;

            this.foot = new polygon([footPoint1,footPoint2, footPoint3, footPoint4], [[0,2], [1,3]]);
        } else {
            let footPoint1 = this.vertices[footPoint[0]] ;
            let footPoint2 = point.segmentCenter(footPoint1, this.vertices[positivMod(footPoint[0]+1,4)]) ;
            this.foot = new square(footPoint1, footPoint2) ;
        }
    }
}


// main

const canvasGame = document.getElementById("canvas");
const ctx = canvasGame.getContext("2d");

let canvasWidth = document.getElementById("game-interface").offsetWidth

ctx.canvas.width  = canvasWidth/2;
ctx.canvas.height = canvasWidth/4;


