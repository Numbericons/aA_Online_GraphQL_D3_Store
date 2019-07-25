import React from "react";
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';

import { Link } from "react-router-dom";

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
                            <li key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <h4>{product.name}</h4>
                                </Link>
                                <p className="description">Description: {product.description}</p>
                            </li>
                        ))}
                    </ul>
                );
            }}
        </Query>
    );
};

export default ProductIndex;