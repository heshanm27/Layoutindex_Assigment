const Category = require("../model/category.model");

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("").exec();
    res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const GetCategoryById = async (req, res) => {};

const CreateCategory = async (req, res) => {};

const UpdateCategory = async (req, res) => {};

const DeleteCategory = async (req, res) => {};

module.exports = {
  GetAllCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
