const { createResponse } = require("../../utils/utils");
const express = require("express");
const router = express.Router();
const { validate } = require("../../middleware/validateHandle");
const { body } = require("express-validator");
const { Flag } = require("../../../common/constant");

const userRepository = require("./user.repository");


/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password 0 -10
 *             example:
 *               email: john@example.com
 *               firstName: John
 *               lastName: Doe
 *               password: password123
 *               
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: User sign-in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 description: password length 0-10
 *             example:
 *               email: john@example.com
 *               password: password length 0-10
 *              
 *     responses:
 *       200:
 *         description: User signed in successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Invalid login credentials
 *       500:
 *         description: Internal server error
 */

/**
 * Handles user sign-up request.
 * @name POST /auth/sign-up
 * @function
 * @memberof module:User
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>} - The promise that resolves when the user is created
 * @throws {Error} - If there is an error while creating the user
 */
router.post(
  "/sign-up",
  validate([
    body("email").isEmail(),
    body("firstName").notEmpty().isLength({ min: 0, max: 10 }),
    body("lastName").notEmpty().isLength({ min: 0, max: 10 }),
    body("password").notEmpty().isLength({ min: 0, max: 10 }),
  ]),
  async (req, res, next) => {
    try {
      const addUser = await userRepository.creatUser(req.body);

      if (!addUser) return await createResponse(res, 200, {}, "User is exist");

      return await createResponse(res, 200, {}, Flag.OK);
    } catch (error) {
      next(error.message);
    }
  }
);

/**
 * Handles user sign-in request.
 * @name POST /auth/sign-in
 * @function
 * @memberof module:User
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>} - The promise that resolves when the user is signed in
 * @throws {Error} - If there is an error while signing in the user
 */
router.post("/sign-in",
  validate([
    body("email").isEmail(),
    body("password").notEmpty().isLength({ min: 0, max: 10 }),
  ]),
  async(req,res,next)=>{
    try {
      const isLogin = await userRepository.signIn(req.body)
      
      if(!isLogin) throw new Error("Login invalid")

      createResponse(res,200,isLogin , Flag.OK)
    } catch (error) {
      const errInfor = {message:error.message , statusCode:300}
      next(errInfor)
    }
  }
);

module.exports = router;
