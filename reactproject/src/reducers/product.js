import {CART_DATA,ERROR, FETCH_ALL_PRODUCT,FETCH_ID_PRODUCT,CATEGORY,TODAY_OFFER,LATEST_PRODUCT, LOADING, ADD_CART, REMOVE_CART, ADD_QUANTITY, REMOVE_QUANTITY} from "../actions/producttype";
import {cartDetailsReducer,addQuantityReducer,removeQuantityReducer} from "../reducers/cartdetails";
export const getProductsReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case FETCH_ALL_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const getProductsIdReducer=(state={},action)=>
{
    switch(action.type)
    {
        case FETCH_ID_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const getCategoryReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case CATEGORY:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const getTodayofferReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case TODAY_OFFER:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const getLatestProductReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case LATEST_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}


const Initial_state={
    cart:[]
}

export const addtoCartReducer=(state=Initial_state,action)=>
{
    switch(action.type)
    {
        case LOADING:
            return {...state,loading:true};
        case ADD_CART:
            return {...state,cart:cartDetailsReducer(state.cart,action.payload),loading:false};
        case CART_DATA:
            return{...state,cartdata:action.payload}
        case REMOVE_CART:
            return{...state,success:true,loading:false};
        case ADD_QUANTITY:
            return {...state,addquantity:addQuantityReducer(state.cart,action.payload),loading:false};
        case REMOVE_QUANTITY:
            return {...state,removequantity:removeQuantityReducer(state.cart,action.payload),loading:false};
        default:
            return state;
    }
}

