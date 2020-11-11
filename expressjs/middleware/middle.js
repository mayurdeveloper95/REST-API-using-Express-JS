function middle(req,res,next)
{
console.log("hello");
next();
}

module.exports=middle;