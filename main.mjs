import { vector } from "./polygon.mjs";
import {point, square} from "./polygon.mjs"

// main

let point1 = new point(10,10) ;
let point2 = new point(11,11) ;
let point3 = new point(10,10) ;

let toto = new square(point1, point2, false)
let direction = [1,0]
let titi = new square(point3, direction) ;
console.log(titi)
titi.rotate(Math.PI/4)
console.log(titi)
let transactionVector = new vector(-10,-10) ;
titi.translate(transactionVector)
console.log(titi)


/*res = [] ;
res2 = [] ;
let t0, t1 ;
let tm = performance.now() ;
for (let k = 0; k < 10000 ; k++) {
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

console.log(res)

//console.log(res2[0][0].vertices)
//console.log(res2[0][1].vertices) */
