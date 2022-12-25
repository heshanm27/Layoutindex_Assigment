const Product = require("../model/product.model");
const Upload = require("../middleware/uploadImages.middleware");
const CustomError = require("../error/custom.error.js");
const { parse } = require("dotenv");

const GetAllProducts = async (req, res) => {
  const products = await Product.find({
    productCategory: req.query.cat,
  });
  res.status(200).json({ products });
};

const GetProductById = async (req, res) => {
  const reservedProduct = await Product.findById(req.params.id);

  return res.status(200).json({
    status: "success",
    msg: "",
    data: reservedProduct,
  });
};

const CreateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });
  if (!req.file) return res.status(400).json({ error: "Image is required" });

  try {
    const newProduct = new Product({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productCategory: req.body.productCategory,
    });

    newProduct.productImage = req.file.filename;

    await newProduct.save();

    return res.status(200).json({
      status: "success",
      msg: "New product created successfully",
      data: newProduct,
    });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const UpdateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });

  try {
    const updateproduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        productImage: req.file?.filename,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      status: "success",
      msg: "Product updated successfully",
      data: updateproduct,
    });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      status: "success",
      msg: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    throw new CustomError("Error occured while deleting", 400);
  }
};

module.exports = {
  GetAllProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
