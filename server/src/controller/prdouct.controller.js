const Product = require("../model/product.model");

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
  const product = await Product.create(req.body);
  res.status(201).json({ product });
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
