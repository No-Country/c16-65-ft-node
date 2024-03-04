import mongoose from "mongoose";

const PurchaseCollection = "purchases"

const PurchaseSchema = new mongoose.Schema({
    purchase_datetime: Date,
    purchaser: {
        type: String,
        required: true
    },
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

export const purchaseModel = mongoose.model(PurchaseCollection, PurchaseSchema)