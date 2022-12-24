const express = require("express");

const router = express.Router();
const { GetAllCategories, GetCategoryById, CreateCategory, UpdateCategory, DeleteCategory } = require("../controller/category.controller");

router.route("/").get(GetAllCategories).post(CreateCategory);
router.route("/:id").get(GetCategoryById).patch(UpdateCategory).delete(DeleteCategory);

module.exports = router;
