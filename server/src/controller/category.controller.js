const Category = require("../model/category.model");
const CustomError = require("../error/custom.error.js");

//get all parent  categories
const GetAllCategories = async (req, res) => {
  try {
    //find categories that parent is null and return id and category name
    const categories = await Category.find({
      parent: null,
    })
      .populate("sub", { _id: 1, categoryName: 1 })
      .exec();
    res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    throw new CustomError(error.message, 400);
  }
};

//get sub categories in one parent category
const GetSubCategories = async (req, res) => {
  try {
    //find sub categories and return id and category name
    const categories = await Category.findOne(
      {
        $or: [{ _id: req.params.id }, { categoryName: req.params.id }],
      },
      { _id: 1, productSubCategory: 1 }
    )
      .populate("sub", { _id: 1, categoryName: 1 })
      .exec();

    console.log(categories);
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
    throw new CustomError(error.message, 400);
  }
};

const GetAllSubCategories = async (req, res) => {
  try {
    //find sub categories filtering that aprent is null
    const categories = await Category.find({
      parent: { $ne: null },
    }).exec();
    res.status(200).json({
      status: "success",
      msg: "",
      data: categories,
    });
  } catch (error) {
    throw new CustomError(error.message, 400);
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
    console.log(error.code);
    if (error.name === "ValidationError") {
      throw new CustomError(error.message, 400);
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

    console.log("Create sub categorey");
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
      throw new CustomError(error.message, 400);
    }
    if (error.code === 11000) {
      throw new CustomError("Sub Category already exists", 400);
    }
    throw new CustomError(error.message, 400);
  }
};

//update parent category
const UpdateCategory = async (req, res) => {
  try {
    const category = await Category.find({ _id: req.params.id }).exec();

    if (!category) throw new CustomError("Category not found", 404);

    //find and update category
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        categoryName: req.body.categoryName,
        $addToSet: { sub: req.body.subOptionCategorey },
      },
      { new: true, runValidators: true }
    ).exec();

    res.status(200).json({
      status: "success",
      msg: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new CustomError(error.message, 400);
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
    throw new CustomError("Error occured while deleting", 400);
  }
};

module.exports = {
  GetAllCategories,
  GetSubCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  CreateSubCategory,
  GetAllSubCategories,
};
