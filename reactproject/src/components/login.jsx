import React, { Component } from "react";
import {loginUserAction,logedinUserAction} from "../actions/user";
import login from "../components/images/login.jpg";
import SimpleReactValidator from "simple-react-validator";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
//import {googleAuth} from "../actions/firebaseauth";

class Login extends Component{
    
    constructor()
    {
        super();
        this.state={
            UserLogin:{
                userEmail:"",
                userPassword:""
            }
            }
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.validator.allValid())
        {
            let data={
                UserLogin:{
                    userEmail:this.state.UserLogin.userEmail,
                    userPassword:this.state.UserLogin.userPassword
                }
            };
            //console.log(data);
            this.props.loginUserAction(data);
            
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
       
        }

        handleEmail=(e)=>
        {
            let email=Object.assign({},this.state.UserLogin);
            email.userEmail=e.target.value;
            this.setState({UserLogin:email});
            }
            
            handlePassword=(e)=>{
            let pass=Object.assign({},this.state.UserLogin);
            pass.userPassword=e.target.value;
            this.setState({UserLogin:pass});
            }

    render()
    {
        return (
            <>
            <div className="ui container">
                <div className="ui grid">
                    <div className="ui middle aligned eight wide column center aligned grid">
                            <div className="ui content">
                                <img src={login} style={{width:"480px"}} alt="login"/>
                            </div>
                    </div>
                    <div className="ui middle aligned eight wide column grid">
                            <div className="ui center aligned header">
                                <h1>Login</h1>
                            </div>
                            <div className="ui center aligned header">
                                {
                                    this.props.loginerror.error?
                                    <h5 className="ui error message">
                                        {this.props.loginerror.error}
                                    </h5>
                                    :""
                                }
                            </div>
                                <form className="ui form" onSubmit={this.handleSubmit}>
                                    <div className="ui segment" style={{padding:"0px 120px",border:"none",boxShadow:"none"}}>
                                        <div className="ui labeled input" style={{marginBottom:"20px",minWidth:"84%"}}>
                                            <div className="ui violet label">
                                                <i className="user icon" style={{margin:"0px 5px"}}></i>
                                            </div>
                                            <input type="text" name="userEmail" placeholder="E-mail address"
                                            value={this.state.UserLogin.userEmail}
                                            onChange={this.handleEmail}
                                            />
                                        </div>
                                        {
                                 this.validator.message('userEmail',this.state.UserLogin.userEmail,'required|email')
                             }
                                        <div className="ui labeled input" style={{minWidth:"84%"}}>
                                            <div className="ui violet label">
                                                <i className="lock icon" style={{margin:"0px 5px"}}></i>
                                            </div>
                                            <input type="password" name="userPassword" placeholder="Password"
                                            value={this.state.UserLogin.userPassword}
                                            onChange={this.handlePassword}
                                            />
                                            </div>
                                            {
                                 this.validator.message('userPassword',this.state.UserLogin.userPassword,'required|min:8|max:25')
                             }
                             <div className="ui hidden divider"></div>
                                        <button className="fluid ui violet submit button" type="submit">Login</button>
                                    </div>
                                </form>

                            {/* <div className="ui center aligned grid">
                                <button class="ui google plus button" onClick={()=>this.props.googleAuth()} style={{marginTop:"20px"}}>
                                    <i class="google icon"></i>Log in with Google</button>
                            </div>*/}
                                <div className="ui center aligned header message" style={{margin:"20px 100px",padding:"10px"}}>
                                    New to us? <Link to="/register">Sign Up</Link>
                                </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
};

const mapStateToProps=(state)=>
{
   console.log(state);
return ({loginerror:state.login,logedinuser:state.login.currentuser});
}

export default connect(mapStateToProps,{loginUserAction,logedinUserAction})(Login);