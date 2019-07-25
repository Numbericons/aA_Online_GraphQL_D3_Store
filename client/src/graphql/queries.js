import gql from "graphql-tag";

export default {
    IS_LOGGED_IN: gql`
        query IsUserLoggedIn {
        isLoggedIn @client
        }
    `,
    FETCH_PRODUCTS: gql`{
        products {
            _id
            name
        }
    }`,
};

