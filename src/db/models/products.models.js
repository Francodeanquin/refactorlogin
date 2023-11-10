import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
    },
});

productsSchema.plugin(mongoosePaginate)

export const productsModel= mongoose.model('Products', productsSchema) 
