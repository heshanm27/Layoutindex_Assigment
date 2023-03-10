const express = require("express");

const router = express.Router();
const {
  GetAllCategories,
  GetAllSubCategories,
  GetSubCategories,
  CreateCategory,
  CreateSubCategory,
  UpdateCategory,
  DeleteCategory,
} = require("../controller/category.controller");
const CheckID = require("../middleware/checkID.middleware");

router.route("/").get(GetAllCategories).post(CreateCategory);
router.route("/sub").get(GetAllSubCategories);
router.use("/:id", CheckID);
router.route("/:id/sub").get(GetSubCategories);
router.route("/:id").post(CreateSubCategory).patch(UpdateCategory).delete(DeleteCategory);

module.exports = router;
