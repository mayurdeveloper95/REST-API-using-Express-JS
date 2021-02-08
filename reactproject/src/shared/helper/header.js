export const Header=()=>{
    let user=JSON.parse(localStorage.getItem('currentuser'));
    //console.log(user);
    if(user)
    {
        return {"auth-key":user};
    }
    else{
        return{};
    }
}