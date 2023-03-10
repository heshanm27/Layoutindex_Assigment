const Product = require("../model/product.model");
const CustomError = require("../error/custom.error.js");

//get all products from one parent category
const GetParentCategoryProducts = async (req, res) => {
  //if there is min or max query filter products by price
  if (req.query.min || req.query.max) {
    const products = await Product.find({
      productPrice: { $gte: req.query.min, $lte: req.query.max },
      productCategory: req.params.parent,
    });

    return res.status(200).json({
      status: "success",
      msg: "",
      data: products,
    });
  }

  const products = await Product.find({
    productCategory: req.params.parent,
  });

  return res.status(200).json({
    status: "success",
    msg: "",
    data: products,
  });
};

//get all products from one sub category
const GetSubCategoryProducts = async (req, res) => {
  //if there is min or max query filter products by price
  if (req.query.min || req.query.max) {
    const products = await Product.find({
      productPrice: { $gte: req.query.min, $lte: req.query.max },
      productCategory: [req.params.parent, req.params.sub],
    });

    return res.status(200).json({
      status: "success",
      msg: "",
      data: products,
    });
  }

  const products = await Product.find({
    $and: [{ productCategory: req.params.parent }, { productSubCategory: req.params.sub }],
  });

  return res.status(200).json({
    status: "success",
    msg: "",
    data: products,
  });
};

//get one product by id
const GetProductById = async (req, res) => {
  const reservedProduct = await Product.findById(req.params.id);

  return res.status(200).json({
    status: "success",
    msg: "",
    data: reservedProduct,
  });
};

//create new product
const CreateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });
  if (!req.file) return res.status(400).json({ error: "Image is required" });
  console.log(req.body.productCategory);

  let subCategory = req.body.productSubCategory;

  //if there is more than one sub category split it and save it as array
  if (req.body.productSubCategory.includes(",")) {
    subCategory = req.body.productSubCategory.split(",");
  }
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productDescription: req.body.productDescription,
      productCategory: req.body.productCategory,
      productSubCategory: subCategory,
      productImage: req.file.filename,
    });

    // newProduct.productImage = req.file.filename;

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

//update product details
const UpdateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });

  try {
    let subCategory = req.body.productSubCategory;

    //if there is more than one sub category split it and save it as array
    if (req.body.productSubCategory.includes(",")) {
      subCategory = req.body.productSubCategory.split(",");
    }

    const updateproduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productCategory: req.body.productCategory,
        productSubCategory: subCategory,
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

//delete product
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
  GetParentCategoryProducts,
  GetSubCategoryProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
