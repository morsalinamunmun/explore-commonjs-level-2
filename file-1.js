// const var1 = require('./file-2.js');
// console.log(var1.a, var1.add(5, 10));
const {a, add} = require('./file-2.js');
console.log(a, add(5, 10));

