import React, { Component } from "react";
import "./css/navigation.css";
import {Link} from "react-router-dom";
import logo from "./images/logo.png"
import { Menu, Icon} from 'semantic-ui-react';
import {connect} from "react-redux";
import {logedinUserAction,logoutUserAction} from "../actions/user";
//import {googleGetData,googleSignOut} from "../actions/firebaseauth";

class Navigation extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            activeItem:"home"
        }
    }

    componentDidMount()
    {
       //this.props.googleGetData();
       let username=JSON.parse(localStorage.getItem('currentuser'));
       if(username)
       {
            this.props.logedinUserAction();
       }
    }
  handleItemClick = (e, {name}) => this.setState({activeItem:name})
    render()
    {
        const { activeItem } = this.state
        return(
            <>
                <div className="ui violet inverted menu">
                    <div className="ui container">
                        <div className="item">
                            <Link className="logo" to="/">
                                <img src={logo} alt="main logo" style={{width:"70px",marginRight:"20px"}}/>
                            </Link>
                        </div>
                        <Menu.Item name='home' as={Link} to="/home" active={activeItem === 'home'}
                        onClick={this.handleItemClick}> <Icon name='home'/>Home
                        </Menu.Item>
                        <Menu.Item name='product' as={Link} to="/product" active={activeItem === 'product'}
                        onClick={this.handleItemClick}> <Icon name='shopping bag'/>Product
                        </Menu.Item>
                        
                        <div className="right menu">
                            { 
                            !this.props.user ? <><Menu.Item name='register' as={Link} to="/register" active={activeItem === 'register'}
                        onClick={this.handleItemClick}> <Icon name='edit'/>Register
                        </Menu.Item>
                        <Menu.Item name='login' as={Link} to="/login" active={activeItem === 'login'}
                        onClick={this.handleItemClick}> <Icon name='key'/>Login
                        </Menu.Item></>:
                        <>
                        <Menu.Item name='cart' as={Link} to="/cart" active={activeItem === 'cart'}
                        onClick={this.handleItemClick}> <Icon name='cart plus'/>Cart <div class="ui circular labels">
                            <a class="ui label" style={{margin:"0 0 0 10px"}}>{
                            this.props.cartdata.length > 0 ? this.props.cartdata.length:0
                            }</a></div>
                        </Menu.Item>
                        <Menu.Item name='logout' as={Link} onClick={()=>this.props.logoutUserAction()}> <Icon name='sign-out'/>LogOut
                        </Menu.Item>
                        
                        <div className="ui violet inverted menu">
  <div className="ui simple dropdown item">
  {
                            this.props.user?<Menu.Item><Icon name='user circle'style={{fontSize:"20px"}}/>Welcome, {this.props.user.firstname.charAt(0).toUpperCase() + this.props.user.firstname.slice(1)} {this.props.user.lastname.charAt(0).toUpperCase()+ this.props.user.lastname.slice(1)}</Menu.Item>:""
                        }
   
    {
        this.props.user.isAdmin === true ?  
        <>
        <i className="dropdown icon"></i>
        <div className="menu" style={{border:"none"}}>
        <div className="item" id="dahboardcss"><Menu.Item name='dashboard' as={Link} to="/dashboard" active={activeItem === 'dashboard'}
                          onClick={this.handleItemClick}> <Icon name='tachometer alternate'/>Dashboard
                          </Menu.Item></div>
      </div>
      </>
      :null
    }
    
    </div>
  </div>         
                        </>
                            }
                        
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps=(state)=>{
//console.log(state);
return {user:state.login.currentuser,cartdata:state.Cart.cart};
}

export default connect(mapStateToProps,{logedinUserAction,logoutUserAction})(Navigation);