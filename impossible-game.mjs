import {point, square} from "./polygon.mjs"

class hero extends square {
    constructor() {
        /*  Body hitBox */
        let intialPosition = new point(3/2,1/2) ;
        super(intialPosition, [1,-0.5*Math.PI/2])

        /*  foot hitBox */

    }
}


// main

let toto =  new hero()
console.log(toto)
console.log(toto.getLowestPointIndex())