import axios from "axios";
import {Header} from "../shared/helper/header";
let Product_api="http://localhost:4500/api/allproducts";
let Product_id_api="http://localhost:4500/api/findproductbyid";
let Category_api="http://localhost:4500/api/allcategory";
let TodayProduct_api="http://localhost:4500/api/findtodayoffer";
let LatestProduct_api="http://localhost:4500/api/findlatestproduct";
let Addtocart_api="http://localhost:4500/api/addtocart";
let Removecart_api="http://localhost:4500/api/removecartitem";
let getcart_api="http://localhost:4500/api/getallusercart";

let config={
    headers:
    {
        "Content-type":"application/json"
    }
}

export const getProducts=()=>
{
    return axios.get(Product_api,config);
}

export const getProductsid=(id)=>
{
    return axios.get(`${Product_id_api}/${id}`, config);
}

export const getCategory=()=>
{
    return axios.get(Category_api,config);
}

export const getTodayOffer=()=>
{
    return axios.get(TodayProduct_api,config);
}

export const getLatestProduct=()=>{
    return axios.get(LatestProduct_api,config);
}

export const getAddtocart=(id,userquantity)=>{
    return axios.post(`${Addtocart_api}/${id}`, { userquantity }, {headers:Header(),config});
}

export const getCart=()=>
{
    return axios.get(getcart_api,config);
}

export const getRemovecart=(id)=>
{
    return axios.delete(`${Removecart_api}/${id}`, config)
}