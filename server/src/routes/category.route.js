const express = require("express");

const router = express.Router();
const { GetAllCategories, GetCategoryById, CreateCategory, CreateSubCategory, UpdateCategory, DeleteCategory } = require("../controller/category.controller");
const CheckID = require("../middleware/checkID.middleware");

router.route("/").get(GetAllCategories).post(CreateCategory);
router.use("/:id", CheckID);
router.route("/:id").get(GetCategoryById).post(CreateSubCategory).patch(UpdateCategory).delete(DeleteCategory);

module.exports = router;
