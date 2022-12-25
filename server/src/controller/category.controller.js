const Category = require("../model/category.model");
const CustomError = require("../error/custom.error.js");

const GetAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate("sub", { _id: 1, categoryName: 1 }).exec();
    res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    throw new CustomError(error._message, 400);
  }
};

const GetCategoryById = async (req, res) => {
  try {
    const categories = await Category.find({
      _id: req.params.id,
    })
      .populate("sub", { _id: 1, categoryName: 1 })
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
    throw new CustomError(error._message, 400);
  }
};

const CreateCategory = async (req, res) => {
  try {
    if (!req.body) throw new CustomError("Category data is required", 400);

    //create category
    const category = await Category.create(req.body);

    return res.status(201).json({
      status: "success",
      msg: "Category created successfully",
      data: category,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new CustomError(error._message, 400);
    }
    if (error.code === 11000) {
      throw new CustomError("Category already exists", 400);
    }
    throw new CustomError(error.message, 400);
  }
};

const CreateSubCategory = async (req, res) => {
  try {
    if (!req.body) throw new CustomError("Category data is required", 400);
    if (!req.params.id) throw new CustomError("Category id is required", 400);

    //check if parent category exists
    const parentCategory = await Category.findById(req.params.id).exec();

    if (!parentCategory) throw new CustomError("Category not found", 404);

    //create sub category
    const subCategory = new Category({
      categoryName: req.body.categoryName,
      parent: parentCategory._id,
    });
    const newSubCategory = await subCategory.save();

    //update parent sub categories
    parentCategory.sub.push(newSubCategory._id);

    await parentCategory.save();

    return res.status(200).json({
      status: "success",
      msg: "Sub category created successfully",
      data: newSubCategory,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new CustomError(error._message, 400);
    }
    if (error.code === 11000) {
      throw new CustomError("Category already exists", 400);
    }
    throw new CustomError(error.message, 400);
  }
};

const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.find({ _id: req.params.id }).exec();

    if (!category) throw new CustomError("Category not found", 404);

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).exec();

    res.status(200).json({
      status: "success",
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new CustomError(error._message, 400);
    }
    throw new CustomError(error.message, 400);
  }
};

const DeleteCategory = async (req, res) => {
  try {
    //check if category exists
    const category = await Category.findById(req.params.id).exec();

    if (!category) throw new CustomError("Category not found", 404);

    await Category.deleteOne(category._id).exec();

    return res.status(200).json({
      status: "success",
      msg: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

module.exports = {
  GetAllCategories,
  GetCategoryById,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  CreateSubCategory,
};
