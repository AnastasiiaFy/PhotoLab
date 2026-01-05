import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    images: {type: Array, required: true},
    photoUploader: {type: Boolean, required: true},
    options: {type: Array, required: true},
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema)

export default productModel;