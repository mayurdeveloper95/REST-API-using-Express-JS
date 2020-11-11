let express=require('express');
let ex=express();
let config= require('config');
ex.use(express.json());
let apitest=require("./routes/apitestvalidation");

console.log(`configure:${config.get('username')}`);
console.log(`environment mode:${config.get('name')}`);
console.log(`hidden password:${config.get('password')}`);

ex.use("/apitests",apitest);

ex.listen(4600,()=>console.log("4600 port listen"));