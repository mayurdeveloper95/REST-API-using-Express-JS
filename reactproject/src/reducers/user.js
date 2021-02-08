import { ERROR, USER_LOGIN, USER_REGISTER,LOGGEDIN_USER,GET_USER} from "../actions/usertype"

export const userRegisterReducer=(state={},action)=>
{
    switch(action.type)
    {
        case USER_REGISTER:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const userLoginReducer=(state={},action)=>
{
    switch(action.type)
    {
        case USER_LOGIN:
            return {login:action.payload};
        case LOGGEDIN_USER:
            return {currentuser:action.payload};
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const getUserReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case GET_USER:
            return action.payload
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

