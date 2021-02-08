import React, { Component } from "react";
import {connect} from "react-redux";
import {getProductsAction,getCategoryAction} from "../actions/product";
import Productcard from "./productcard";
import Filter from "./filter";
class Products extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            search:"",
            sort:""
        };
    }
    sortCategory=(event,data)=>
    {
        const cat=data.value;
        //console.log(data.value);
        this.setState({
            category:cat,
            /*products:this.props.pr.sort((a,b)=>
                (
                    cat === "clothes"
                    ?
                    a.category.categoryName === b.category.categoryName
            ? 1
            : -1
            : sort === "electronics" 
            ?
            a.category.categoryName === b.category.categoryName
            ? 1
            : -1
            : a._id > b._id 
            ? 1
            :-1
                ))*/

        })
    }
    sortProducts=(event,data)=>
    {
        const sort=data.value;
    //console.log(data.value);
    this.setState({
        sort:sort,
        products:this.props.pr.sort((a,b)=>
        (
            sort === "lowest" 
            ?
            a.price > b.price
            ? 1
            : -1
            : sort === "highest" 
            ?
            a.price < b.price
            ? 1
            : -1
            : sort === "asc"
            ?
            a.name > b.name
            ? 1
            : -1
            : sort === "des"
            ? 
            a.name < b.name
            ? 1
            : -1
            : a._id > b._id 
            ? 1
            :-1
        ))
    })
    }
    componentDidMount()
    {
        this.props.getProductsAction();
        this.props.getCategoryAction();
    }
    searchSpace=(e)=>{
        this.setState({search:e.target.value})
      }
    render()
    {
        if(!this.props.pr){return <>
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            <p></p>
          </div>
          </>
    }
        return(
        <>
        <div className="ui container" style={{paddingBottom:"80px"}}>
            <div className="ui two column internally celled grid">
                    <div className="three wide column" style={{paddingTop:"20px"}}>
                    <Filter sort={this.state.sort}
                        sortProducts={this.sortProducts}
                        category={this.state.category}
                        sortCategory={this.sortCategory}/>    
                    </div>
                    <div className="thirteen wide column">
                        
                        <div className="ui search" style={{margin:"10px 10px 15px 10px"}}>
                            <div className="ui icon input" style={{width:"100%"}}>
                                <input className="prompt" type="text" placeholder="Search Product..."
                                onChange={(e)=>this.searchSpace(e)}
                                />
                                <i className="search icon"></i>
                            </div>

                        </div>
                   {/*<h3> {this.props.pr.length} products available</h3>*/}
                    <div className="ui three column grid">
                    {
                        this.props.pr.filter((data)=>{
                            if(this.state.search === "") 
                            return data
                            else if (data.name.toLowerCase().includes(this.state.search.toLowerCase()))
                            return data
                        }).map((item)=>(
                            <div className="column" key={item._id}>
                                <Productcard data={item} {...this.props} handleChange={this.handleChange}/>
                            </div>
                        ))
                    }
                </div>
                </div>
            </div>
        </div>
        </>
        )
    }
}
const mapStateToProps=(state)=>{
//console.log(state);
return {pr:state.product,cat:state.category};
}

export default connect(mapStateToProps,{getProductsAction,getCategoryAction})(Products);