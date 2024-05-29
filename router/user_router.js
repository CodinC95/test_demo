const express = require('express');
const router = express.Router();

const auth = require("../controller/authController")


router.post("/sign-up",auth.signUp)

router.post("/sign-in",auth.signIn)

module.exports = router