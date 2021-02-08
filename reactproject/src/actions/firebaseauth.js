import {googleprovider} from "../helper";
import firebase from "firebase/app";
import "firebase/auth";
import {FETCH_AUTH_DATA} from "../actions/authtype";
import {history} from "../shared/helper/history";

export const googleAuth=()=>
{
    return (dispatch)=>{
        firebase.auth().signInWithPopup(googleprovider).then(()=>{
            history.push("/dashboard");
            window.location.reload();
        });
    }
}

export const googleGetData=()=>{
    return (dispatch)=>{
        firebase.auth().onAuthStateChanged((user)=>{
            dispatch({type:FETCH_AUTH_DATA,payload:user})
        })
    }
}

export const googleSignOut=()=>{
    return (dispatch)=>{
        firebase.auth().signOut().then(()=>{
            history.push("/login");
            window.location.reload();
        })
    }
}