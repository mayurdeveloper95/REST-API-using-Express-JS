import React, { Component } from "react";
import {connect} from "react-redux";
import Productcard from "./productcard";
import {getTodayofferAction,getLatestProductAction} from "../actions/product";
class Home extends Component{

    componentDidMount()
    {
        this.props.getTodayofferAction();
        this.props.getLatestProductAction();
    }
    render()
    {
        if(!this.props.today){return null}
        return (
            <>
            <div className="ui container" style={{marginTop:"20px",paddingBottom:"100px"}}>
                <h1>Today's Offer</h1>
                <div className="ui four column grid">
                    <div className="row">
                        {
                        this.props.today?this.props.today.map((data)=>(
                                <div className="column" key={data._id}>
                                    <Productcard data={data} {...this.props} />
                                </div>
                            )):<>
                            <div className="ui active inverted dimmer">
                              <div className="ui text loader">Loading</div>
                            <p></p>
                          </div>
                          </>
                        }
                    </div>
                </div>
                <h1>Latest Products</h1>
                <div className="ui four column grid">
                    <div className="row">
                        { 
                        this.props.latest?this.props.latest.map((data)=>(
                              <div className="column" key={data._id}>
                                    <Productcard data={data} {...this.props} />
                                </div>
                            )):<>
                            <div className="ui active inverted dimmer">
                              <div className="ui text loader">Loading</div>
                            <p></p>
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
return {today:state.Todayoffer.t,latest:state.LatestProduct.a};
}

export default connect(mapStateToProps,{getTodayofferAction,getLatestProductAction})(Home);