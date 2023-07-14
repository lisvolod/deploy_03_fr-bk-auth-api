import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    productVolume: {
        type:Number,
        required: true,
        trim: true
    },
    productMaterial: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        trim: true,
        required: true,
    },
    productImage: {
        type:String,
        required: true,

    },
    cloudinaryPublicId: {
        type:String,
        required: true
    } 
}, {
    timestamps: true //important
})

const Product = mongoose.model('Product', productSchema)

export default Product;