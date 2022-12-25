const express = require("express");
const router = express.Router();
const CheckID = require("../middleware/checkID.middleware");
const Upload = require("../middleware/uploadImages.middleware");
const {
  GetParentCategoryProducts,
  GetSubCategoryProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controller/prdouct.controller");

router.route("/:parent").get(GetParentCategoryProducts);
router.route("/:parent/:sub").get(GetSubCategoryProducts);
router.route("/").post(Upload.single("productImage"), CreateProduct);
router.use("/:id", CheckID);
router.route("/:id").get(GetProductById).put(Upload.single("productImage"), UpdateProduct).delete(DeleteProduct);

module.exports = router;
