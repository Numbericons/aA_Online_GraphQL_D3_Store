import React, { Component } from "react";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';

const { FETCH_PRODUCTS } = Queries;

const ProductIndex = () => {
    return (
        <Query query={FETCH_PRODUCTS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                    <ul>
                        {data.products.map(product => (
                            <li key={product._id}>{product.name}</li>
                        ))}
                    </ul>
                );
            }}
        </Query>
    );
};

export default ProductIndex;