import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBhS7tjm29bYJaef_WijIxfQlVMTTiQpgo",
    authDomain: "mayur-eb51c.firebaseapp.com",
    databaseURL: "https://mayur-eb51c.firebaseio.com",
    projectId: "mayur-eb51c",
    storageBucket: "mayur-eb51c.appspot.com",
    messagingSenderId: "345932232964",
    appId: "1:345932232964:web:5ef45c6c3ace2a040d3851"
  };

  firebase.initializeApp(firebaseConfig);
  export const db=firebase.database().ref('/Login');
  export const googleprovider=new firebase.auth.GoogleAuthProvider();