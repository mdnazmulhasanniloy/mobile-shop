const express = require("express");
const productController = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get().post();
router.route(`/:id`).put().delete();

module.exports = router;
