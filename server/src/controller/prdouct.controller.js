const Product = require("../model/product.model");
const Upload = require("../middleware/uploadImages.middleware");
const CustomError = require("../error/custom.error.js");
const { parse } = require("dotenv");

const GetAllProducts = async (req, res) => {
  const products = await Product.find({
    productCategory: req.params.category,
  });
  res.status(200).json({ products });
};

const GetProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({ product });
};

const CreateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });
  if (!req.files) return res.status(400).json({ error: "Image is required" });

  try {
    const product = new Product({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productCategory: req.body.productCategory,
    });

    req.files.forEach((file) => {
      product.productImage.push(file.filename);
    });

    await product.save();

    res.status(201).json({ product });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const UpdateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ product });
};

const DeleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ product });
};

module.exports = {
  GetAllProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
