const mongoose = require("mongoose");

const orderProductSchema = new mongoose.Schema(
  {
    productDetails: {
      type: Array,
      default: [],
    },
    email: {
      type: String,
      default: "",
    },
    userId: {
      type: String,
      default: "",
    },
    paymentDetails: {
      paymentId: {
        type: String,
        default: "",
      },
      payment_method_type: {
        type: Array,
        default: [],
      },
      payment_status: {
        type: String,
        default: "",
      },
    },
    shipping_options: {
      type: Array,
      default: [],
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orderProduct", orderProductSchema);
module.exports = orderModel;
