import gql from "graphql-tag";

export default {
    IS_LOGGED_IN: gql`
        query IsUserLoggedIn {
            isLoggedIn @client
        }
    `,
    FETCH_PRODUCTS: gql`
        query FetchProducts {
            products {
                _id
                name
                description
            }
        }
    `,
    FETCH_PRODUCT: gql`
        query FetchProduct($id: ID!) {
            product(_id: $id) {
                _id
                name
                description
                weight
                cost
            }
        }
    `,
};


