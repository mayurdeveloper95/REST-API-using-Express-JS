import { userLogin, userRegister,userLoggedin,getUser,deleteUser} from "../api/user"
import { ERROR, USER_LOGIN, USER_REGISTER,LOGGEDIN_USER,USER_LOGOUT,GET_USER,DELETE_USER} from "./usertype";
import {history} from "../shared/helper/history";

export const registerUserAction=(data)=>{
return async(dispatch)=>{
    try{
        let res=await userRegister(data);
        dispatch({type:USER_REGISTER,payload:res.data.u});
        alert("Thank you for Registration");
       history.push("/login");
       window.location.reload();
    }
    catch(error)
    {
        //console.log(error.response.data.message);
        dispatch({type:ERROR,payload:error.response.data.message});
    }
}
};

export const loginUserAction=(data)=>{
    return async(dispatch)=>{
        try{
            let res=await userLogin(data);
           // console.log(res.data);
            localStorage.setItem('currentuser',JSON.stringify(res.data.t));
            //localStorage.setItem("username",JSON.stringify(res.data.data.firstname));
            //console.log(res.data);
            dispatch({type:USER_LOGIN,payload:res.data});
            alert("User Login Successful");
            history.push("/product");
        window.location.reload();
        }
        catch(error)
        {
            //console.log(error.response.data.message);
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};

export const logedinUserAction=()=>
{
    return async (dispatch)=>
    {
        try{
            let res=await userLoggedin();
            //console.log(res.data.userdata);
            //localStorage.setItem('isadmin',res.data.userdata.isAdmin);
            dispatch({type:LOGGEDIN_USER,payload:res.data.userdata});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}


export const logoutUserAction=()=>
{
    return async (dispatch)=>
    {
        localStorage.removeItem('currentuser');
        dispatch({type:USER_LOGOUT});
        history.push("/login");
        window.location.reload();
    }
}

export const getUserAction=()=>
{
    return async (dispatch)=>
    {
        try{
            let res=await getUser();
            //console.log(res.data);
            dispatch({type:GET_USER,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const deleteUserAction=(id)=>{
    return async(dispatch)=>
    {
            let res=await deleteUser(id);
            //console.log(res.data);
            setTimeout(()=>{
            dispatch({type:DELETE_USER});
            },1000)
            
    }
}