import React, { Component } from "react";
import { Dropdown,Divider,Form, Checkbox } from 'semantic-ui-react';
import "./css/filter.css";
class Filter extends Component
{
    constructor(props)
    {
        super(props);
    }
    Options = [
        { key: 'select', value: 'select', text: 'Select' },
        { icon:"arrow down", key: 'lowest', value: 'lowest', text: 'Lowest to Highest'},
        { icon:"arrow up",key: 'highest', value: 'highest', text: 'Highest to Lowest' },
        { key: 'asc', value: 'asc', text: 'Ascending'},
        { key: 'des', value: 'des', text: 'Descending'}
      ]
    render()
    {
        return(
            <>
            <div classname="filter1">Order By</div>
            <Divider/>
            <Dropdown placeholder='Select' fluid selection options={this.Options} value={this.props.sort} onChange={this.props.sortProducts}/>
            <div classname="filter2" style={{marginTop:"30px"}}>Categories</div>
            <Divider/>
        
          <Checkbox
            label='Clothes'
            name='checkboxRadioGroup'
            value='clothes'
            onClick={this.props.sortCategory}
          />
          <Checkbox
            label='Electronics'
            name='checkboxRadioGroup'
            value='electronics'
            onClick={this.props.sortCategory}
          style={{marginTop:"15px"}}/>
            </>
        )
    }
}

export default Filter;