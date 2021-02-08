import React, { Component } from "react";
import {connect} from "react-redux";
import {getProductsIdAction,addtoCartAction} from "../actions/product";
import {Link} from "react-router-dom";
import { Tab } from 'semantic-ui-react'
class Productdetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
           //value:1,
            userquantity:1
        }
    }
    panes = [
        { menuItem: 'Product Details', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Product Review', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Detail Information', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
      ]
/*
    decrease = () => {
        this.state.value <= 1 ? this.setState({value:this.state.value}):this.setState({value:this.state.value -1})
      }
    
      increase = () => {
        this.setState({value:this.state.value + 1});
      }
      */
    componentDidMount()
    {
        this.props.getProductsIdAction(this.props.match.params.id);
    }

    formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value);
    }

    addCart=(id)=>
    {
        this.props.addtoCartAction(id,this.state.userquantity);
        alert("Product added to cart");
        this.props.history.push('/cart');
    }
    render()
    {
        const {pdetails}=this.props;
        return (
        <>
            <div className="ui container" style={{paddingTop:"20px",paddingBottom:"80px"}}>
                <div className="ui grid">
                    <div className="ui breadcrumb">
                    <Link className="section" to="/product">Products</Link>
                    <div className="divider"> / </div>
                    <div className="active section">{pdetails.name}</div>
                    </div>
                    <div className="ui hidden divider"></div>
                    <div className="two column row " key={pdetails._id}>
                        <div className="center aligned column">
                            {
                                !pdetails.image?null:<img src={pdetails.image.image} alt={pdetails.name} style={{width:"70%"}}/>
                            }
                            
                        </div>
                        <div className="column">
                            <h1>{pdetails.name}</h1>
                            <div className="sub header"><p style={{lineHeight:"26px"}}>{pdetails.description}</p></div>
                            <div className="ui divider"></div>
                         <div className="price section" style={{display:"flex",alignItems:"center"}}>   
                            <div className="ui big violet tag label" style={{textDecoration:pdetails.offerPrice===pdetails.price ?"": "line-through",textDecorationColor: "black",textDecorationThickness:"3px"}}>
                                {this.formatCurrency(pdetails.price)}
                            </div>
                            {
                                pdetails.offerPrice===pdetails.price ?"":<h3 style={{fontWeight:"bold",color:"blue",marginTop:"0px",marginLeft:"20px",fontSize:"20px"}}>{this.formatCurrency(pdetails.offerPrice)}</h3>
                            }
                            </div>
                            {/*<div className="quantity" style={{marginTop:"20px"}}>
                                <span>
                                <i className="violet big plus circle icon" onClick={this.increase}></i>
                                <div className="ui large label" style={{backgroundColor:"transparent"}}>{this.state.value}</div>
                                <i className="violet big minus circle icon" onClick={this.decrease} ></i>
                                {
                                        this.state.value > pdetails.quantity?alert("You've reached the maximum units allowed for purchase of this item."):"" 
                                    }
                                </span>
                                </div>*/}
                            <div className="addtocart" style={{marginTop:"40px"}}>
                                {
                                    pdetails.quantity > 0?
                                
                            <button className="ui medium blue button" onClick={()=>this.addCart(pdetails._id,this.state.userquantity)}><i className="shopping cart icon"></i>Add to Cart</button>     
                            :
                            <h3 style={{color:"red"}}>Product out of stock</h3>       
                                }
                            </div>
                        </div>
                        </div>
                    </div>
                <div className="ui divider"></div>
                
                <Tab
    menu={{ fluid: true, vertical: true }}
    menuPosition='left'
    panes={this.panes}
  />
</div>
        </>
            )
    }
}

const mapStateToProps=(state)=>{
    //console.log(state);
    return {pdetails:state.productid};
}

export default connect (mapStateToProps,{getProductsIdAction,addtoCartAction})(Productdetails);