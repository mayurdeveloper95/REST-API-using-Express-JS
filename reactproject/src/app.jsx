import React, { Component,Suspense,lazy } from "react";
import Navigation from "./components/navigation";
import {Route,Switch,Redirect} from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
//import Products from "./components/products";
import Footer from "./components/footer";
import productdetails from "./components/productdetails";
import Dashboard from "./components/dashboard";
import Cart from "./components/cart";
import PrivateRoute from "./shared/helper/privateroute";
import Notfound from "./components/notfound";
class App extends Component{

 Products = lazy(()=> import("./components/products"));
    render()
    {
        return(
        <>
         <Navigation/>
         <Suspense fallback={<h1>Loading...</h1>}>
                <Route path="/product" exact component={this.Products}/>
                </Suspense>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" exact component={Home}/>
                <PrivateRoute path="/productdetails/:id" exact component={productdetails}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/cart" exact component={Cart}/>
                
            </Switch>
            {/*<Route path="/notfound" exact component={Notfound}/>
                <Redirect to="/notfound"/>*/}
        <Footer/>
        </>
        )
    }
}

export default App;