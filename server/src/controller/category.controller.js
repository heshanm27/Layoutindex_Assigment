const Category = require("../model/category.model");

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("sub").exec();
    res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    throw new CustomError(400, error.message);
  }
};

const GetCategoryById = async (req, res) => {
  try {
    const categories = await Category.find({
      _id: req.params.id,
    })
      .populate("sub")
      .exec();

    if (!categories) {
      return res.status(404).json({
        status: "fail",
        msg: "Category not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    throw new CustomError(400, error.message);
  }
};

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
