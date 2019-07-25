import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import mutations from "./graphql/mutations"
const {VERIFY_USER} = mutations;

const cache = new InMemoryCache({
    dataIdFromObject: object => object._id || null
});

const httpLink = createHttpLink({
    uri: "http://localhost:5555/graphql",
    headers: {
        // pass our token into the header of each request
        authorization: localStorage.getItem("auth-token")
    }
});

// make sure we log any additional errors we receive
const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    /*
        Added the default resolvers configuration to resolve an Apollo warning regarding the use of @client to query our user auth:

        "If you want to use Apollo Client's @client support to query the cache without using local resolvers, you must pass an empty 
        object into the ApolloClient constructor resolvers option. Without this Apollo Client will not enable its integrated @client 
        support, which means your @client based queries will be passed to the Apollo Client link chain. You can find more details a
        bout why this is necessary here(https://github.com/apollographql/apollo-client/pull/4499)."
        
    */
    resolvers: {
        addToCart: (parent, {product}, {cache} ) => {  //assuming these local resolvers available on the client
            let products = cache.data;
            products.push(product);
            cache.writeData({
                data:  {
                    products
                }
            })
            return products; //null
        }
    },
    onError: ({ networkError, graphQLErrors }) => {
        console.log("graphQLErrors", graphQLErrors);
        console.log("networkError", networkError);
    }
});

// if we have a token we want to verify the user is actually logged in
const token = localStorage.getItem("auth-token");

// to avoid components async problems where
// a component would try to read the cache's value of isLoggedIn
// before our mutation goes through we can set it up here
cache.writeData({
    data: {
        isLoggedIn: Boolean(token)
    }
});

// then if we do have a token we'll go through with our mutation
if (token) {
    client
        // use the VERIFY_USER mutation directly use the returned data to know if the returned
        // user is loggedIn
        .mutate({ mutation: VERIFY_USER, variables: { token } })
        .then(({ data }) => {
            cache.writeData({
                data: {
                    isLoggedIn: data.verifyUser.loggedIn,
                    cart: []
                }
            });
        });
} else {
    // otherwise we can just set isLoggedIn to false
    cache.writeData({
        data: {
            isLoggedIn: false,
            cart: []
        }
    });
}

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <App />
            </HashRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
