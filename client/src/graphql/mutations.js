import gql from "graphql-tag";

export default {
  LOGIN_USER: gql`
    mutation LoginUser($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        loggedIn
      }
    }
  `,
  VERIFY_USER: gql`
    mutation VerifyUser($token: String!) {
      verifyUser(token: $token) {
        loggedIn
      }
    }
  `,
  REGISTER_USER: gql`
    mutation RegisterUser($email: String!, $name: String!, $password: String!) {
      register(email: $email, name: $name, password: $password) {
        token
        loggedIn
      }
    }
  `,
  CREATE_PRODUCT: gql`
    mutation CreateProduct( $name: String!, $description: String!, $weight: Float!) {
      newProduct(name: $name, description: $description, weight: $weight) {
          name
          description
          weight
      }
    }
  `,
  ADD_TO_CART: gql`
  
  `,
  REMOVE_FROM_CART: gql`
  
  `,
};

