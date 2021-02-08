import React, { Component } from "react";
import {connect} from "react-redux";
import { Label, Icon, Table } from 'semantic-ui-react';
import {addQuantityAction,removeQuantityAction,removeCartAction,getCartAction} from "../actions/product";
import {Link} from "react-router-dom";

class Cart extends Component{
    constructor(props)
    {
        super(props);
        this.state={
          shipping:0,
        }
    }

    componentDidMount()
    {
      this.calculateGst();
      this.props.getCartAction();
    }
    calculateGst()
    {
      return this.props.total+(this.props.total * 0.03)-this.props.total;
    }
    formatCurrency=(value)=>{
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value);
  }
  formatDescription=(value)=>{
    if(!value){return null;}
    return value.substring(0,60)+"...";
}
    render()
    {
     return(
            <>
            {
              this.props.cartdata.length==0?
              <div className="ui container" style={{margin:"30px 0px",paddingBottom:"120px"}}>
              <h2>Empty Cart</h2>
              </div>
              
            :
            <div className="ui container" style={{margin:"30px 0px",paddingBottom:"120px"}}>
                <h2>Cart</h2>
            <Table celled compact definition>
    <Table.Header fullWidth>
      <Table.Row>
        <Table.HeaderCell>Product Image</Table.HeaderCell>
        <Table.HeaderCell>Product Name</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Product Quantity</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Product Price</Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {
                          this.props.cartdata?this.props.cartdata.map(data=>(
      <Table.Row key={data.c.products._id}>
        <Table.Cell>
        <div class="ui small image">
                                      <img src={data.c.products.image.image} width="80px" height="80px"/>
                                      </div>
        </Table.Cell>
        <Table.Cell>{this.formatDescription(data.c.products.name)}</Table.Cell>
        <Table.Cell textAlign='center'>
        <div className="quantity">
                                <span>
                                <i className="violet big plus circle icon" onClick={()=>this.props.addQuantityAction(data)}></i>
                                <div className="ui large label" style={{backgroundColor:"transparent"}}>{data.c.userquantity}</div>
                                <i className="violet big minus circle icon" onClick={()=>this.props.removeQuantityAction(data)}></i>
                                
                                </span>
                            </div>
        </Table.Cell>
        <Table.Cell textAlign='center'>{
          data.c.products.offerPrice===data.c.products?
          this.formatCurrency(data.c.products.price*data.c.userquantity):
          this.formatCurrency(data.c.products.offerPrice*data.c.userquantity)
        }</Table.Cell>
        <Table.Cell textAlign='center'><Icon name='trash alternate' color="violet" size="large" onClick={()=>this.props.removeCartAction(data.c._id)}/></Table.Cell>
      </Table.Row>
      )):null
                        
    }

<Table.Row>
<Table.Cell colSpan="2" rowSpan="5"></Table.Cell>
<Table.Cell textAlign='center' style={{fontWeight:"700"}}>SUBTOTAL</Table.Cell>
<Table.Cell textAlign='center'>{this.formatCurrency(this.props.total)}</Table.Cell>
<Table.Cell rowSpan="5"></Table.Cell>
  </Table.Row>

  <Table.Row>
<Table.Cell textAlign='center' style={{fontWeight:"700",borderLeft:"1px solid rgba(34,36,38,.15)",backgroundColor:"white"}}>SHIPPING (Flat Rate : FIXED)</Table.Cell>
<Table.Cell textAlign='center'>
  {
    this.props.total > 5000 ? this.formatCurrency(50) :this.formatCurrency(this.state.shipping)
  }
  </Table.Cell>
  </Table.Row>


  <Table.Row>

<Table.Cell textAlign='center' style={{fontWeight:"700",borderLeft:"1px solid rgba(34,36,38,.15)",backgroundColor:"white"}}>CGST (3%)</Table.Cell>
<Table.Cell textAlign='center'>{this.formatCurrency(this.calculateGst())}</Table.Cell>
  </Table.Row>


  <Table.Row>
  
<Table.Cell textAlign='center' style={{fontWeight:"700",borderLeft:"1px solid rgba(34,36,38,.15)",backgroundColor:"white"}}>SGST (3%)</Table.Cell>
<Table.Cell textAlign='center'>{this.formatCurrency(this.calculateGst())}</Table.Cell>
  </Table.Row>

  <Table.Row>
 
<Table.Cell textAlign='center' style={{fontWeight:"700",borderLeft:"1px solid rgba(34,36,38,.15)",backgroundColor:"white"}}>TOTAL</Table.Cell>
<Table.Cell textAlign='center' style={{fontWeight:"700"}}>
  {
  this.formatCurrency(Math.round(
    this.props.total > 5000 ? 
    50+this.props.total+this.calculateGst()+this.calculateGst():
    this.state.shipping+this.props.total+this.calculateGst()+this.calculateGst()
    ))
}</Table.Cell>
  </Table.Row>

    </Table.Body>

    <Table.Footer fullWidth>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell colSpan='4'>
        <Label as={Link} to="/product" size="large" color="violet" style={{padding:"12px 20px"}}>
      <Icon name='long arrow alternate left' style={{margin:"0 10px 0 10px"}} size='large'/>
      CONTINUE SHOPPING
    </Label>
    <Label as='a' size="large" color="violet" style={{padding:"12px 20px",float:"right"}}>
      PROCEED TO CHECKOUT   
        <Icon name='long arrow alternate right' style={{margin: "0 10px 0 10px"}} size='large'/>
    </Label>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  </Table>
            </div>
    }
            </>
        )
    }
}

const mapStateToProps=(state)=>
{
console.log(state);
    return {
      cartdata:state.Cart.cart,
      isRemoved: state.Cart.success,
      total:state.Cart.cart.reduce((acc,nextstate)=>
      nextstate.c.products.offerPrice===nextstate.c.products ?
      (acc + nextstate.c.products.price * nextstate.c.userquantity):
      (acc + nextstate.c.products.offerPrice * nextstate.c.userquantity)
,0)

    };
}

export default connect(mapStateToProps,{addQuantityAction,removeQuantityAction,removeCartAction,getCartAction})(Cart);