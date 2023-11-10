import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartsSchema = new mongoose.Schema({
    productsCart: {
        type: [
            {
                idProduct:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products"
                },
                qty: {
                    type: Number,
                },
            },
        ],
        _id: false,
    },
});

cartsSchema.plugin(mongoosePaginate)
export const cartsModel = mongoose.model("Carts", cartsSchema);
