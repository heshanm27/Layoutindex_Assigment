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

const CreateCategory = async (req, res) => {
  try {
    if (!req.body) throw new CustomError(400, "Category data is required");

    const category = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      msg: "Category created successfully",
      data: category,
    });
  } catch (error) {
    throw new CustomError(400, error.message);
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.find({ _id: req.params.id }).exec();

    if (!category) throw new CustomError(404, "Category not found");

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();

    res.status(200).json({
      status: "success",
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new CustomError(400, error.message);
    }
  }
};

const DeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id).exec();

    if (!category) throw new CustomError(404, "Category not found");
  } catch (error) {
    throw new CustomError(400, error.message);
  }
};

module.exports = {
  GetAllCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
};
