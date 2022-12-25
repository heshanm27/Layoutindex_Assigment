const Product = require("../model/product.model");
const CustomError = require("../error/custom.error.js");

const GetParentCategoryProducts = async (req, res) => {
  // if (req.query.min || req.query.max) {
  //   const products = await Product.find({
  //     productPrice: { $gte: req.query.min, $lte: req.query.max },
  //     productCategory: req.params.parent,
  //   });

  //   return res.status(200).json({
  //     status: "success",
  //     msg: "",
  //     data: products,
  //   });
  // }

  const products = await Product.find({
    // productCategory: req.params.parent,
  });

  return res.status(200).json({
    status: "success",
    msg: "",
    data: products,
  });
};

const GetSubCategoryProducts = async (req, res) => {
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
  console.log("parent", req.params.parent);
  console.log("sub", req.params.sub);
  const products = await Product.find({
    $and: [{ productCategory: req.params.parent }, { productSubCategory: req.params.sub }],
  });

  return res.status(200).json({
    status: "success",
    msg: "",
    data: products,
  });
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
  console.log(req.body.productCategory);
  // console.log(JSON.parse(req.body.productCategory));

  let subCategory = req.body.productSubCategory;

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

const UpdateProduct = async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "Product data is required" });

  try {
    let subCategory = req.body.productSubCategory;

    // if (req.body.productSubCategory.includes(",")) {
    //   // subCategory = req.body.productSubCategory.split(",");
    // }

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
