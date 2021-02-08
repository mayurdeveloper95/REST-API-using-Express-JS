import React from "react";
import {Route,Redirect} from"react-router-dom";

const PrivateRoute=(props)=>
{
    //console.log(props);
    let {component:Component, ...rest} = props;
    return(
        <Route {...rest} 
        render={
            props=>localStorage.getItem('currentuser') 
            ? 
            (<Component {...props}/>) 
            :
            (<Redirect to={{pathname:"/login", state:{from: props.location}}}/>)
        }
        />
    )
};

export default PrivateRoute;