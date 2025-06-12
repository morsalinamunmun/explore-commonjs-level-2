// const var1 = require('./file-2.js');
// console.log(var1.a, var1.add(5, 10));
// const {a, add} = require('./file-2.js');
// import {var1} from "./file-2.mjs"
import add, {a} from "./file-2.mjs"
import {a as A3, add as add3, b as b3} from'./file-3.mjs';
// import {a, add, b} from "./file-3.mjs";
// console.log(var1.a, var1.add(5, 10));
// console.log(a3, add3(20, 30, 10), b3)
console.log(A3);

