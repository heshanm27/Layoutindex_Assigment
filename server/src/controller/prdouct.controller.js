const Product = require("../model/product.model");
const Upload = require("../middleware/uploadImages.middleware");
const CustomError = require("../error/custom.error.js");

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
  console.log(req.body);
  console.log(req.files);
  res.status(201).json({ data: req.file.filename });
  //   Upload(req, res, async (err) => {
  //     if (err) {
  //       return res.status(400).json({ error: err.message });
  //     }
  //     if (!req.body) return res.status(400).json({ error: "Product data is required" });
  //     if (!req.file) return res.status(400).json({ error: "Image is required" });

  //     console.log(req.file.filename);
  //     res.status(201).json({ data: req.file.filename });

  //     // const product = await Product.create(req.body);
  //     // res.status(201).json({ product });
  //   });
  //   const product = await Product.create(req.body);
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
