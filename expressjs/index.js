let express = require('express');
let app = express();
let middleware=require("./middleware/middle");
let morgan = require('morgan');
let config= require('config');
let courseapi=require("./routes/courseapi");
let port=process.env.port;

//in-built middleware
app.use(express.json());
app.use(express.static('public'));
//app.use(express.urlencoded({extended:true}));

//default environment mode
console.log(`mode:${app.get('env')}`);
//console.log(`mode:${process.env.NODE_ENV}`);

//custom middleware
app.use(middleware);
app.use(morgan('tiny'));

console.log(`configure:${config.get('name')}`);
console.log(`mode email:${config.get('email')}`);
console.log(`password${config.get('password')}`);

app.use('/apicourse',courseapi);

app.listen(port,()=>console.log(`port connected to ${port}`));