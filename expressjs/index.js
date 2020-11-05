let Express = require('express');
let app=new Express();


app.get((req,res)=>
{
    res.write("welcome");
})
app.listen(4000);
