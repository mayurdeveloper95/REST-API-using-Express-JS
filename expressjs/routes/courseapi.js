let express=require('express');
let route=express.Router();
let Joi = require("joi");

let unames=[{
    id:1,
    name:"mayur",
},
{
    id:2,
    name:"rohit",
},
{
    id:3,
    name:"chinmay"
}];

//get api
route.get("/uname",(req,res)=>
{
res.send(unames);
});

route.get("/courses",(req,res)=>
{
res.send(JSON.stringify(["angular","node","php","html"]));
});

//get data by id
route.get("/una/:id",(req,res)=>
{
let usernames=unames.find((data)=>data.id===parseInt(req.params.id));
if(!usernames){return res.status(404).send({message:"invalid course id"})};
res.send(usernames);
});

//creata api
route.post("/createunames",(req,res)=>
{
let schema=Joi.object({
name:Joi.string().min(4).max(15).required(),
});

let result=schema.validate(req.body);
if(result.error){return res.status(404).send(result.error.details[0].message)};
    let un={
    id: unames.length+1,
    name: req.body.name
    };

    unames.push(un);
    res.send(unames);
});

//update data by id
route.put("/updateunames/:id",(req,res)=>
{
let sc=Joi.object({
name:Joi.string().min(4).max(12).required(),
});
let result2=sc.validate(req.body);
if(result2.error){return res.status(404).send(result2.error.details[0].message)};
let uu=unames.find((data)=>data.id===parseInt(req.params.id));
if(!uu){return res.status(404).send({message:"id not found"})};
uu.name=req.body.name;
res.send(unames);
});


//delete data by id
route.delete("/deleteunames/:id",(req,res)=>
{
let du=unames.find((data)=>data.id===parseInt(req.params.id));
if(!du){return res.status(400).send({message:"id not found"})};
let index=unames.indexOf(du);
unames.splice(index,1);
res.send(unames);
});

module.exports=route;