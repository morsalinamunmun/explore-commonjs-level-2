((require, module, __dirname, __filename)=>{
    let a = 10;
(
    (name)=>{
        let a = 10 //block scop
    console.log(`Learning ${name}`);
    console.log(module);
})("node")
})(require, module, ("./utils/add.js"))
console.log(a);