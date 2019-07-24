import gql from "graphql-tag";

export default {
    FETCH_PRODUCTS: gql`{
        products {
            _id
            name
        }
    }`,
};

