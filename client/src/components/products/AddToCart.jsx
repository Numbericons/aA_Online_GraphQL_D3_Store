import React, { Component } from "react";
import {Mutation, Query} from 'react-apollo';
import { IconContext } from "react-icons";
import { FaCartPlus } from "react-icons/fa";

import Queries from "../../graphql/queries";
const { FETCH_CART_ITEMS } = Queries;

class AddToCart extends Component{
    constructor(props){
        super(props);
        
        this.selectButton = this.selectButton.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleAdd(){
        
    }

    handleRemove(){

    }

    selectMutation(){
        return(
            <Query query={FETCH_CART_ITEMS}>
                {({data}) => {
                    let cart = data.cart;
                    // debugger
                    for(let product in cart) {
                        if(product._id === this.props._id){
                            return(
                                <button onClick={this.handleRemove}>Remove from Cart</button>
                            )
                        }
                    }
                    return(
                        <button onClick={this.handleAdd}><FaCartPlus /></button>
                    )
                }}
            </Query>
        )
    }

    render(){
        let button = this.selectMutation();
        return(
            <div>
                {button}
            </div>
        );
    }
};

export default AddToCart;