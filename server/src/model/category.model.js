const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,

      index: {
        unique: true,
        collation: { locale: "en", strength: 2 },
      },
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    sub: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
