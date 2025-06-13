//1. synchronous
// file read / I/O intesinve task -> single thread -> not go thread pool ->

// 2. asynchronous
// file read -> single thread -> event loop -> thread pool -> task completion

//  const fs = require('fs');

//  console.log("task1")

//   const text = "Learning file system";
//   fs.writeFileSync("./hello.txt", text)
//   console.log("task3");

//   const data = fs.readFileSync('./hello.txt', {encoding: "utf-8"})
// console.log("task4");
//   console.log(data);

const fs = require('fs');
console.log("Task 1");

let text = "node.js";

fs.writeFile("./hello-world.txt", text, {encoding: "utf-8"}, (err) =>{
    if(err){
        console.log("Something wen wrong", err);
        return;
    }
    console.log("After writing:");
})

fs.readFile('./hello-world.txt', {encoding: "utf-8"}, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  text = data;
//   console.log('File contents:', data);
console.log(text, 'last show result');
});

console.log(text);
console.log("Task 3");