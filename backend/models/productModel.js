import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        price: {type: Number, required: true},
        category: {type: String, required: true},
        description: {type: String},
        imageUrls: [{ type: String }],                      // масив фото
        photoUploader: {type: Boolean, required: false},    // Чи матиме продукт фото для завантаження фото
        options: {type: Array, required: true},             // опції, додаткові деталі продукту (тип паперу, вибір типу поверхні і тд.)
    }, { timestamps: true }
)

export default mongoose.model('Product', productSchema)