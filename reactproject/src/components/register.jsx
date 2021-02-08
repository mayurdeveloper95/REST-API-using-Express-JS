import React, { Component } from "react";
import "./css/style.css";
import {registerUserAction} from "../actions/user";
import SimpleReactValidator from "simple-react-validator";
import {connect} from "react-redux";
class Register extends Component{
    constructor()
    {
        super();
        this.state={
            firstname:"",
            lastname:"",
            userEmail:"",
            userPassword:"",
           termsAcceptCheck:false
        }
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.validator.allValid())
        {
            let data={
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                UserLogin:{
                    userEmail:this.state.userEmail,
                    userPassword:this.state.userPassword
                },
               termsAcceptCheck:this.state.termsAcceptCheck
            };
            this.props.registerUserAction(data);
            //alert("Form successfully submited");
            //this.props.history.push("/login");
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
        }
    handleInputData=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }
    handleInputDataCheck=(e)=>{
        let isChecked=e.target.checked;
        this.setState({termsAcceptCheck:isChecked});
    }
            
     loginbutton=()=>
        {
        this.props.history.push("/login");
        }
    render()
    {
        return (
            <>
            <div className="ui fluid container">
                <div className="main ui grid">
                    <div className="bg1 ui six wide column center aligned grid">
                        <div className="first ui container">
                            <div className="ui content">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info.</p>
                                <button className="ui labeled icon button" style={{background:"#ffffff none",color:"rgb(0 0 0)"}} onClick={this.loginbutton}>
                                    <i className="key icon"></i>Login
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg2 ui middle aligned ten wide column grid">
                        <div className="ui container">
                            <div className="ui center aligned header">
                                <h1>Create Account</h1>
                            </div>
                            <div className="ui center aligned header">
                                {
                                    this.props.registererror.error?
                                    <h5 className="ui error message">
                                        {this.props.registererror.error}
                                    </h5>
                                    :""
                                }
                            </div>
                            <div className="ui segment" style={{margin:"0% 20%"}}>
                                <form className="ui form" onSubmit={this.handleSubmit}>
                                <div className="two fields">
                                    <div className="required field">
                                        <label>First Name</label>
                                        <input type="text" name="firstname" placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputData}
                                        />
                                         {
                                 this.validator.message('firstname',this.state.firstname,'required|min:5|string')
                             }
                                    </div>
                                   
                                    <div className="required field">
                                        <label>Last Name</label>
                                        <input type="text" name="lastname" placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputData}
                                        />
                                        {
                                 this.validator.message('lastname',this.state.lastname,'required|min:5|string')
                             }
                                    </div>
                                </div>
                                <div className="two fields">
                                    <div className="required field">
                                        <label>E-mail</label>
                                        <input type="email" name="userEmail" placeholder="joe@schmoe.com"
                                        value={this.state.userEmail}
                                        onChange={this.handleInputData}
                                        />
                                        {
                                 this.validator.message('Email',this.state.userEmail,'required|email')
                             }
                                    </div>
                                    <div className="required field">
                                        <label>Password</label>
                                        <input type="password" name="userPassword" placeholder="Enter Password"
                                        value={this.state.userPassword}
                                        onChange={this.handleInputData}
                                        />
                                        {
                                this.validator.message('Password',this.state.userPassword,'required|min:8|max:25')
                            }
                                    </div>
                                </div>
                                <div className="required inline field">
                                    <div className="ui checkbox">
                                        <input type="checkbox" tabIndex="0" className=""
                                        onChange={this.handleInputDataCheck}/>
                                        <label>I agree to the Terms and Conditions</label>
                                    </div>
                                </div>
                                    <button className="fluid ui violet submit button" type="submit">Submit</button>
                                </form>
                            </div>
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
return {registererror:state.register};
}

export default connect(mapStateToProps,{registerUserAction})(Register);