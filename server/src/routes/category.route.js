const express = require("express");

const router = express.Router();
const { GetAllCategories, GetCategoryById, CreateCategory, CreateSubCategory, UpdateCategory, DeleteCategory } = require("../controller/category.controller");

router.route("/").get(GetAllCategories).post(CreateCategory);
router.route("/:id").get(GetCategoryById).post(CreateSubCategory).patch(UpdateCategory).delete(DeleteCategory);

module.exports = router;
