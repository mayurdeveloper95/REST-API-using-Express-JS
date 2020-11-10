let express=require('express');
let ex=express();
ex.use(express.json());
let joi=require('joi');

let movieData=[{
    id:1,
    name:"Dil Bechara",
    releaseDate:"29 October 2020",
    director:"Mukesh Chhabra",
    actor:"Sushant Singh Rajput,Sanjana Sanghi",
    imdbrating:7.9
},
{
    id:2,
    name:"Gunjan Saxena: The Kargil Girl",
    releaseDate:"24 April 2020",
    director:"Sharan Sharma",
    actor:"Janhvi Kapoor,Angad Bedi",
    imdbrating:5.2
},
{
    id:3,
    name:"Shikara",
    releaseDate:"7 February 2020",
    director:"Vidhu Vinod Chopra",
    actor:"Sadia,Aadil Khan,Zain Khan Durrani",
    imdbrating:3.7
},
{
    id:4,
    name:"Panga",
    releaseDate:"24 January 2020",
    director:"Ashwiny Iyer Tiwari",
    actor:"Kangana Ranaut,Jassie Gill",
    imdbrating:6.8
},
{
    id:5,
    name:"Khuda Haafiz",
    releaseDate:"14 August 2020",
    director:"Faruk Kabir",
    actor:"Shivaleeka Oberoi,Vidyut Jammwal,Aahana Kumra,Shiv Panditt",
    imdbrating:7.2
}
]

//get all movieData
ex.get("/getmovies",(req,res)=>
{
res.send(movieData);
});


//get movieData by id
ex.get("/getmoviesid/:id",(req,res)=>
{
let gmi=movieData.find((data)=>data.id===parseInt(req.params.id));
if(!gmi){return res.status(400).send({message:"movie id not found"})};
res.send(gmi);
});

//get movieData using condition
ex.get("/getmoviescondition",(req,res)=>
{
       let con=movieData.filter((data)=>data.imdbrating > 7 );
        if(!con){return res.status(404).send({message:"rating data not found"})};
    res.send(con);
});


//create new movieData
ex.post("/createmovies",(req,res)=>
{
let re=errorValidate(req.body);
if(re.error){return res.status(400).send(re.error.details[0].message)};

let cm={
    id:movieData.length+1,
    name:req.body.name,
    releaseDate:req.body.releaseDate,
    director:req.body.director,
    actor:req.body.actor,
    imdbrating:req.body.imdbrating
};
movieData.push(cm);
res.send(movieData);
});

//update date by id
ex.put("/updatemovies/:id",(req,res)=>
{

    let re1=errorValidate(req.body);
    if(re1.error){return res.status(400).send(re1.error.details[0].message)};

    let um=movieData.find((data)=>data.id===parseInt(req.params.id));
    if(!um){return res.status(404).send({message:"id not found"})};
    um.name=req.body.name;
    um.actor=req.body.actor;
    um.imdbrating=req.body.imdbrating;
res.send(movieData);
});

//delete data by id
ex.delete("/deletemovies/:id",(req,res)=>
{
let dm=movieData.find((data)=>data.id===parseInt(req.params.id));
if(!dm){return res.status(400).send({message:"id not found"})};

let dm2=movieData.indexOf(dm);
movieData.splice(dm2,1);
res.send(movieData);
});

function errorValidate(error)
{
    let schema=joi.object({
        name:joi.string().min(6).max(30).required(),
        releaseDate:joi.date(),
        director:joi.string().min(6).max(20),
        actor:joi.string().min(10).max(50),
        imdbrating:joi.number()
    });
    return schema.validate(error);
}
ex.listen(4600,()=>console.log("4600 port listen"));