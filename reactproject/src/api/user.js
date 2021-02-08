import axios from "axios";
import {Header} from "../shared/helper/header";

let Register_api="http://localhost:4500/api/newuser";
let Login_api="http://localhost:4500/api/authUser";
let Loggedin_api="http://localhost:4500/api/UserIdentify";
let users_api="http://localhost:4500/api/alluser";
let deleteuser_api="http://localhost:4500/api/deleteuser"
let config={
    headers:
    {
        "Content-type":"application/json"
    }
}

export const userRegister=(data)=>
{
    return axios.post(Register_api, JSON.stringify(data), config);
}

export const userLogin=(data)=>
{
    return axios.post(Login_api, JSON.stringify(data), config);
}

export const userLoggedin=()=>
{
    return axios.get(Loggedin_api,{headers:Header(),config});
}

export const getUser=()=>
{
    return axios.get(users_api,config);
}

export const deleteUser=(id)=>
{
    return axios.delete(`${deleteuser_api}/${id}`, {headers:Header(),config});
}