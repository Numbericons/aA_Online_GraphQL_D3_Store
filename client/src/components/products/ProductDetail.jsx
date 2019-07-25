import React from "react";
import { Query } from "react-apollo";

import queries from '../../graphql/queries';
import AddToCart from "./AddToCart";
const {FETCH_PRODUCT} = queries;

const ProductDetail = props => {
    return (
        // there we are getting the `id` for our query from React Router
        <Query query={FETCH_PRODUCT} variables={{ id: props.match.params.productId }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error</p>;
                return (
                    <div className="detail">
                        <h1>{data.product.name}</h1>
                        <p>id: {data.product._id}</p>
                        <p>description: {data.product.description}</p>
                        <p>weight: {data.product.weight}</p>
                        <p>cost: {data.product.cost}</p>
                        <AddToCart productId={data.product._id} cost={data.product.cost} />
                    </div>
                );
            }}
        </Query>
    );
}

export default ProductDetail;