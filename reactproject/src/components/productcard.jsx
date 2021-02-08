import React from "react";
import "./css/products-card.css";
const Productcard =(props)=>{
    const formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value);
    }
    const formatDescription=(value)=>{
        if(!value){return null;}
        return value.substring(0,60)+"...";
    }
let {data}=props;
    return(

        <div className="ui cards">
                <div className="product card" onClick={()=>props.history.push(`/productdetails/${data._id}`)}>
                <div className="image">
                    {
                        data.price === data.offerPrice ? ""
                        :<div className="ui red right ribbon label">SALE</div>
                    }
                    <img className="product image" src={data.image.image} alt={data.name}/>
                </div>
            <div className="content">
                <div className="header">{data.name}
                </div>
                <div className="description">
                    {formatDescription(data.description)}
                </div>
            </div>
            <div className="extra content">
                <span className="left floated">
                    <p style={{fontWeight:"bold"}}>{data.category.categoryName.charAt(0).toUpperCase() + data.category.categoryName.slice(1)}</p>
                </span>
                <span className="right floated" style={{marginLeft:"auto"}}>
                <div className="ui violet tag label">{formatCurrency(data.price)}</div>
                </span>
            </div>
        </div>
    </div>
    )
}
export default Productcard;