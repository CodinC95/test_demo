const express = require('express');
const router = express.Router();
const authenticateToken = require("../middleware/authenticateHandle")

const cart = require("../controller/cartController")
router.use(authenticateToken)

router.get("/cart",cart.getCart)

router.post("/add-cart",cart.addCart)

router.put("/add-cart",cart.updateCart)

router.delete("/delete-cart",cart.deleteCart)

module.exports = router