import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    cartItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        title: String,
        price: Number,
        quantity: Number,
        photoCount: Number, // зберігаємо тільки кількість фото
        selectedOptions: Object,
      },
    ],
    customer: {
      firstName: String,
      lastName: String,
      phone: String,
      city: String,
    },
    delivery: {
      service: String,
      branch: String,
    },
    paymentMethod: String,
    cartTotal: Number,
    delivery_fee: Number,
    total: Number,
    status: { type: String, default: "Обробка" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
