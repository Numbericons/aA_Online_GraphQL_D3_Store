const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;

const Product = mongoose.model("products");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category:{
        type: require("./category_type"),
        resolver(parentValue){
            return Product.findById(parentValue._id)
                .populate("category")
                .then(prod => {
                    return prod.category;
                });
        }
    },
    description: { type: GraphQLString },
    weight: { type: GraphQLFloat }
  })
});

module.exports = ProductType;