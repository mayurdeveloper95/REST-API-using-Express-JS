import {combineReducers} from "redux";
import {getUserReducer, userLoginReducer, userRegisterReducer} from "../reducers/user";
import {getProductsReducer,getProductsIdReducer,getCategoryReducer,getTodayofferReducer,getLatestProductReducer,addtoCartReducer} from "../reducers/product";
//import {googleGetDataReducer} from "../reducers/auth";
import storage from 'redux-persist/lib/storage';

const reducers=combineReducers({register:userRegisterReducer,login:userLoginReducer,
    product:getProductsReducer,productid:getProductsIdReducer,Todayoffer:getTodayofferReducer,
LatestProduct:getLatestProductReducer,Cart:addtoCartReducer, Users:getUserReducer,category:getCategoryReducer});

export const persistConfig = {
    key: 'root',
    storage,
    whitelist:['Cart'],
  }

export default reducers;