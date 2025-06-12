// const var1 = require('./file-2.js');
// console.log(var1.a, var1.add(5, 10));
const {a, add} = require('./file-2.js');
const {a: a3, add: add3, b: b3} = require('./file-3.js');
console.log(a, add(5, 10));
console.log(a3, add3(20, 30, 10), b3)

