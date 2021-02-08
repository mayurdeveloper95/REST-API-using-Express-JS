import {getProducts,getProductsid,getCategory,getTodayOffer,getLatestProduct,getAddtocart, getRemovecart,getCart} from "../api/product";
import {CART_DATA,ERROR,FETCH_ALL_PRODUCT,FETCH_ID_PRODUCT,CATEGORY,TODAY_OFFER,LATEST_PRODUCT,SHOW_ERROR, ADD_CART, LOADING, REMOVE_CART, ADD_QUANTITY, REMOVE_QUANTITY} from "./producttype";
import {history} from "../shared/helper/history";

export const getProductsAction =()=>{
    return async(dispatch)=>
    {
        try{
            let res=await getProducts();
            dispatch({type:FETCH_ALL_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const getProductsIdAction=(id)=>{
    return async(dispatch)=>
    {
        try{
            let res=await getProductsid(id);
            //console.log(res.data);
            dispatch({type:FETCH_ID_PRODUCT,payload:res.data})
        }  
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const getCategoryAction=()=>{
    return async(dispatch)=>
    {
        try{
            let res=await getCategory();
            dispatch({type:CATEGORY,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}


export const getTodayofferAction=()=>{
    return async(dispatch)=>
    {
        try{
            let res=await getTodayOffer();
            dispatch({type:TODAY_OFFER,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}


export const getLatestProductAction=()=>{
    return async(dispatch)=>{
        try{
            let res=await getLatestProduct();
            dispatch({type:LATEST_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const addtoCartAction=(id,userquantity)=>
{
    return async(dispatch)=>
    {
        try{
            dispatch({type:LOADING});
            let res=await getAddtocart(id,userquantity);
            //console.log(res.data);
            setTimeout(()=>{
            dispatch({type:ADD_CART,payload:res.data});
            },1000);
        }
        catch(error)
        {
            dispatch({type:SHOW_ERROR,payload:error.response});
        }
    }
}

export const getCartAction=()=>{
    return async(dispatch)=>
    {
        try{
            let res=await getCart();
            dispatch({type:CART_DATA,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const removeCartAction=(id)=>
{
    return async(dispatch)=>
    {
        try{
            dispatch({type:LOADING});
            let res=await getRemovecart(id);
            //console.log(res.data);
            dispatch({type:REMOVE_CART});
            dispatch(getCartAction())
        }
        catch(error)
        {
            dispatch({type:SHOW_ERROR,payload:error.response});
        }
    }
}


export const addQuantityAction=(data)=>
{
    return async(dispatch)=>
    {
        try{
            dispatch({type:LOADING});
            dispatch({type:ADD_QUANTITY,payload:data});
        }
        catch(error)
        {
            dispatch({type:SHOW_ERROR,payload:error});
        }
    }
}

export const removeQuantityAction=(data)=>
{
    return async(dispatch)=>
    {
        try{
            dispatch({type:LOADING});
            dispatch({type:REMOVE_QUANTITY,payload:data});
        }
        catch(error)
        {
            dispatch({type:SHOW_ERROR,payload:error});
        }
    }
}

