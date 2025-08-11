const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true
  },
    items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true } // Store price at the time of purchase
}
  ],
  totalAmount: { type: Number, required: true }, // Total cost of the order
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending"
  },
  paymentMethod: {
    type: String,
    enum: ["card", "paypal", "cash"],
    required: true
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    country: String,
    zipCode: String,
    phone: Number, 
    coords: Object,
    email: String,
    zipCode2: String,

  },
  trackingNumber: { type: String, default: null },
},{timestamps:true,collection:"Orders"});
orderSchema.pre("save", function (next) {
  this.totalAmount = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

module.exports = mongoose.model("Order", orderSchema);
