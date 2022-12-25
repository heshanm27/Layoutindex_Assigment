const express = require("express");
const router = express.Router();
const CheckID = require("../middleware/checkID.middleware");
const Upload = require("../middleware/uploadImages.middleware");
const { GetAllProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct } = require("../controller/prdouct.controller");

router.route("/").get(GetAllProducts).post(Upload.single("productImage"), CreateProduct);
router.use("/:id", CheckID);
router.route("/:id").get(GetProductById).patch(Upload.single("productImage"), UpdateProduct).delete(DeleteProduct);

module.exports = router;
