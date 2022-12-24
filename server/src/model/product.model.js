const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImage: {
      type: [
        {
          type: Buffer,
          contentType: String,
        },
      ],
      default: [],
    },
    productCategory: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
