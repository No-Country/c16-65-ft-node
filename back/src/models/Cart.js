import mongoose from "mongoose";

const CartCollection = "carts"

const CartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                _id: {
                    type: mongoose.Types.ObjectId,
                    ref: 'comics'
                }
            }
        ],
        default: []
    }
})

export const cartModel = mongoose.model(CartCollection, CartSchema)