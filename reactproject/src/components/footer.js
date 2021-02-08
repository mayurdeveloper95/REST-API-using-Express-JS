import React from "react";
let d=new Date();
let y=d.getFullYear();
const Footer=()=>
{
    return(
        <>
        <div className="ui one column stackable center aligned page grid" style={{backgroundColor:"#6435C9",position:"fixed",width:"100%",bottom:"0"}}>
   <div className="column twelve wide" style={{padding:"30px 0px"}}>
   <p style={{color:"white"}}>Coyright © {y} Developed by Mayur | All Rights Reserved.</p>
   </div>
</div>
       
        </>
    )
}

export default Footer;