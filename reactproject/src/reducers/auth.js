import {FETCH_AUTH_DATA} from "../actions/authtype";
export const googleGetDataReducer=(state={},action)=>{
    switch(action.type)
    {
        case FETCH_AUTH_DATA:
            return {...state,user:action.payload};
        default:
            return state;
    }       
}
