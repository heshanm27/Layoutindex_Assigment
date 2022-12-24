const express = require("express");
const router = express.Router();

const { GetAllProducts, GetProductById, CreateProduct, UpdateProduct, DeleteProduct } = require("../controller/prdouct.controller");

router.route("/").get(GetAllProducts).post(CreateProduct);
router.route("/:id").get(GetAllProducts).patch(UpdateProduct).delete(DeleteProduct);

module.exports = router;
