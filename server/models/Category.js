const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
})

CategorySchema.statics.categoryProducts = function(id){
    return this.findById(id).populate("products").then(category => category.products);
};

module.exports = mongoose.model("categories", CategorySchema);
