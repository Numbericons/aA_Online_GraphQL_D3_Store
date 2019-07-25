const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");
const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const CategoryType = require("./types/category_type");
const ProductType = require("./types/product_type");

const Category = mongoose.model('categories');
const Product = mongoose.model('products');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
      newCategory:{
        type: CategoryType,
        args: {
            name: { type: GraphQLString }
        } ,
        resolve(_, { name }) {
            return new Category({ name}).save();
        } 
      },
      deleteCategory: {
        type: CategoryType,
        args: { _id: { type: GraphQLID } },
        resolve(_, { _id }) {
            return Category.deleteOne({ _id});
        }
      },
      newProduct:{
        type: ProductType,
        args: {
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            weight: {type: GraphQLFloat}
        },
        async resolve(_, { name, description, weight }, context) {
          const validUser = await AuthService.verifyUser({ token: context.token });

          // if our service returns true then our product is good to save!
          // anything else and we'll throw an error
          if (validUser.loggedIn) {
            return new Product({ name, description, weight }).save();
          } else {
            throw new Error('Sorry, you need to be logged in to create a product.');
          }
        }
      },
      deleteProduct:{
        type: ProductType,
        args: {
            _id: {type: GraphQLID},
        },
        resolve(_,{_id}){
            return Product.deleteOne({_id});
        }
      },
      updateProductCategory:{
        type: ProductType,
        args: {
            productId: {type: GraphQLID},
            categoryId: {type: GraphQLID}
        },
        resolve(_,{productId, categoryId}) {
            return Product.updateProductCategory(productId, categoryId);
        }
      },
      register: {
        type: UserType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve(_, args) {
            return AuthService.register(args);
        }
      },
      logout: {
        type: UserType,
        args: {
          // all we need to log the user our is an id
          _id: { type: GraphQLID }
        },
        resolve(_, args) {
          return AuthService.logout(args);
        }
      },
      login: {
        type: UserType,
        args: {
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve(_, args) {
            return AuthService.login(args);
        }
      },
      verifyUser: {
        type: UserType,
        args: {
            token: { type: GraphQLString }
        },
        resolve(_, args) {
            return AuthService.verifyUser(args);
        }
      },
  }
});

module.exports = mutation;