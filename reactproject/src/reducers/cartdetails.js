export const cartDetailsReducer=(oldcart,newcart)=>
{
    //console.log(oldcart,newcart);
    //return(oldcart,nextcart);
const existingcart=oldcart.find((data)=>data.c.products._id === newcart.c.products._id);
if(existingcart)
{
    return oldcart.map(cartdata=>{
        return cartdata.c.products._id  === newcart.c.products._id ? 
        {...cartdata,userquantity:cartdata.c.userquantity+=1} : cartdata;
    })
}
else{
    return [...oldcart,{...newcart}];
}
}

export const addQuantityReducer=(oldcart,addcart)=>
{
    //console.log(oldcart,addcart);
    const existingcart=oldcart.find((data)=>data.c.products._id === addcart.c.products._id);
    if(existingcart)
        {
            return existingcart.c.userquantity +=1;
        }
        else{
            return [...oldcart];
        }
}

export const removeQuantityReducer=(oldcart,removecart)=>
{
    const existingcart=oldcart.find((data)=>data.c.products._id === removecart.c.products._id);
    if (existingcart.c.userquantity === 1)
    {
        return oldcart.filter(data=>data.c.products._id !== removecart.c.products._id)
    }
    else{
        existingcart.c.userquantity -=1;
        return [...oldcart];
    }
}