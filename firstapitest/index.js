let express= require('express');
let ec=express();
ec.use(express.json());

let musicApiData=[{
    id:1,
    name:"Tuze Kitna Chahane Lage",
    singer:"Atif Aslam, Alisha Chinai",
    releaseDate:"21 June 2019",
    price:120,
    actors:"Shahid Kapoor,Kiara Advani"
},
{   
    id:2,
    name:"Kaho Na Pyaar Hai",
    singer:"Udit Narayan, Alka Yagnik",
    releaseDate:"14 January 2000",
    price:100,
    actors:"Hrithik Roshan, Ameesha Patel"
},
{
    id:3,
    name:"Tere Jaisa Yaar Kahan",
    singer:"Kishore Kumar",
    releaseDate:"10 January 1981",
    price:120,
    actors:"Amitabh Bachchan, Amjad Khan"
},
{
    id:4,
    name:"Tum Hi Aana",
    singer:"Jubin Nautiyal",
    releaseDate:"3 October 2019",
    price:160,
    actors:" Sidharth Malhotra, Tara Sutaria, Riteish Deshmukh, Rakul Preet Singh"
},
{
    id:5,
    name:"Jaaga Hindustan",
    singer:"Sachin-Jigar, Divya Kumar",
    releaseDate:"15 August 2018",
    price:130,
    actors:"Akshay Kumar, Mouni Roy"
}]

//get all songs data 
ec.get("/musicdata",(req,res)=>
{
res.send(musicApiData);
});

//get data by id
ec.get("/musics/:id",(req,res)=>
{
let md=musicApiData.find((data)=>data.id=== parseInt(req.params.id));
if(!md){return res.status(404).send({message:"music id not found"})};
res.send(md);
});


//create song
ec.post("/createsong",(req,res)=>
{
let cs={
    id:musicApiData.length+1,
    name:req.body.name,
    singer:req.body.singer,
    releaseDate:req.body.releaseDate,
    price:req.body.price,
    actors:req.body.actors
}
musicApiData.push(cs);
res.send(musicApiData);
});


//update song by id
ec.put("/updatesong/:id",(req,res)=>
{
let us=musicApiData.find((data)=>data.id===parseInt(req.params.id));
if(!us){return res.status(400).send({message:"id not found"})};
us.name=req.body.name;
res.send(musicApiData);

});


//remove song by id
ec.delete("/deletesong/:id",(req,res)=>
{
let ds=musicApiData.find((data)=>data.id===parseInt(req.params.id));
if(!ds){return res.status(400).send({message:"id not found"})};
let fds=musicApiData.indexOf(ds);
musicApiData.splice(fds,1);
res.send(musicApiData);

});

ec.listen(8500,()=>console.log("8500 port listen"));

