import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import {Grid,Header,Table,Icon,Tab} from "semantic-ui-react";
import "./css/App.css";
import {connect} from "react-redux";
import {getProductsAction} from "../actions/product";
import {getUserAction,deleteUserAction} from "../actions/user";

class Dashboard extends Component
{
    constructor(props)
    {
      super(props);
    }

    formatCurrency=(value)=>{
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value);
  }
  formatDescription=(value)=>{
      if(!value){return null;}
      return value.substring(0,40)+"...";
  }
    componentDidMount()
    {
      this.props.getProductsAction();
      this.props.getUserAction();
    }

    deleteuser=(id)=>
    {
      if(window.confirm("Are you Sure?"))
      {
        this.props.deleteUserAction(id);
      }
    }
    panes = [
      { menuItem: {key: 'products',icon: 'shopping basket', content: 'Products'}, render: () => <Tab.Pane>
        <Grid.Row>
                    <Header dividing size="huge" as="h1">
                      All Products
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Table singleLine striped selectable unstackable style={{marginTop:"20px"}}>
                      <Table.Header>
                        <Table.Row>
                        
                          <Table.HeaderCell>Product Image</Table.HeaderCell>
                          <Table.HeaderCell>Product Name</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Product Category</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Total Quantity</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Product Price</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {
                          this.props.productdata?this.props.productdata.map(data=>(
<Table.Row key={data._id}>
                          
                          <Table.Cell><div className="ui small image">
                                      <img src={data.image.image} width="80px" height="80px" alt={data.name}/>
                                      </div></Table.Cell>
                          <Table.Cell>{this.formatDescription(data.name)}</Table.Cell>
                          <Table.Cell textAlign='center'>{data.category.categoryName.charAt(0).toUpperCase() + data.category.categoryName.slice(1)}</Table.Cell>
                          <Table.Cell textAlign='center'>{data.quantity}</Table.Cell>
                          <Table.Cell textAlign='center'>{this.formatCurrency(data.price)}</Table.Cell>
                        </Table.Row>
                          )):null
                        
      }
                      </Table.Body>
                    </Table>
                  </Grid.Row>
      </Tab.Pane> },
      { menuItem: { icon: 'users',key: 'Users', content: 'Users'}, render: () => <Tab.Pane>
<Grid.Row>
                    <Header dividing size="huge" as="h1">
                      All Users
                    </Header>
                  </Grid.Row>
                  <Grid.Row>
                    <Table singleLine striped selectable unstackable style={{marginTop:"20px"}}>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>First Name</Table.HeaderCell>
                          <Table.HeaderCell>Last Name</Table.HeaderCell>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                          <Table.HeaderCell>Record Date</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {
                          this.props.userdata?this.props.userdata.map(data=>(
                            
<Table.Row key={data._id}>
                      
                          <Table.Cell >{data.firstname}</Table.Cell>
                          <Table.Cell>{data.lastname}</Table.Cell>
                          <Table.Cell>{data.UserLogin.userEmail}</Table.Cell>
                          <Table.Cell>{data.recordDate}</Table.Cell>
                          <Table.Cell textAlign='center'><Icon name='trash alternate' color="violet" size="large" onClick={()=>this.deleteuser(data._id)}/></Table.Cell>
                        </Table.Row>
                          )):null
                        
      }
                      </Table.Body>
                    </Table>
                  </Grid.Row>
      </Tab.Pane> },
      
    ]
      render() {
        return (
          <div className="App" style={{paddingBottom: "70px"}}>
            <Tab
    menu={{fluid: true, vertical: true }}
    menuPosition='left'
    grid={{paneWidth: 13, tabWidth: 3}}
    panes={this.panes}
  />
          </div>
        );
      }
    }

const mapStateToProps=(state)=>
{
  //console.log(state);
  return {productdata:state.product,userdata:state.Users};
}

export default connect(mapStateToProps,{getProductsAction,getUserAction,deleteUserAction})(Dashboard);