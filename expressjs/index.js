let express = require('express');
let app=express();
app.use(express.json());

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
app.get("/uname",(req,res)=>
{
res.send(unames);
});

app.get("/courses",(req,res)=>
{
res.send(JSON.stringify(["angular","node","php","html"]));
});


app.get("/una/:id",(req,res)=>
{
let usernames=unames.find((data)=>data.id===parseInt(req.params.id));
if(!usernames){return res.status(404).send({message:"invalid course id"})};
res.send(usernames);
});

app.post("/createunames",(req,res)=>
{
    let un={
    id: unames.length+1,
    name: req.body.name
    };
    unames.push(un);
    res.send(unames);
});

app.listen(7200,()=>console.log("port connected to 7200"));