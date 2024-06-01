const { createResponse } = require("../../utils/utils");
const express = require("express");
const router = express.Router();
const { validate } = require("../../middleware/validateHandle");
const { body ,param,query} = require("express-validator");
const { Flag } = require("../../../common/constant");

const cartRepository = require("./cart.repository");

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all carts
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: Successful response with cart data
 *       500:
 *         description: Server error
 */

router.get("/cart", async (req, res, next) => {
  try {
    const data = await cartRepository.getAllCart(
      req.user.id,
      (page = 1),
      (size = 10)
    );
    if (!data) throw new Error("Server Error");

    createResponse(res, 200, data, Flag.OK);
  } catch (error) {
    console.log(error);

    next(error?.message);
  }
});

/**
 * @swagger
 * /api/add-cart:
 *   post:
 *     summary: Add a cart
 *     tags: [Cart]  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response with created cart data
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 
 */

router.post(
    "/add-cart",
   validate(
    [ body("name").notEmpty(),
    body("price").notEmpty().isInt(),
    body("country").notEmpty().isString()]),
    async (req, res, next) => {
        try {
           
            const isInsertCart = await cartRepository.createCart({user_id:req.user.id , ...req.body})

            if(!isInsertCart) throw new Error(isInsertCart?.message)

            createResponse(res, 200, isInsertCart, Flag.OK);  
        } catch (error) {
        console.log(error);
        next(error?.message);
        }
    }
);

/**
 * @swagger
 * /api/update-cart:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         required: false
 *         description: Price of the cart item
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: false
 *         description: Country of the cart item
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the cart item
 *       
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product Name"
 *               id:
 *                 type: number
 *                 example: 7
 *     responses:
 *       200:
 *         description: Successful response with updated cart data
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 
 */

router.put("/update-cart",
        validate([query("price").optional().isInt(),
                query("country").optional().isString(),
                query("id").isInt()]),
                async(req,res,next)=>{
                    try {
 
                        const isUpdate = await cartRepository.updateCart(req.query)
                      
                        if(!isUpdate[0]) throw new Error("server error")

                        createResponse(res, 200, isUpdate, Flag.OK);
                    } catch (error) {
                        console.log(error);
                        next(error?.message || error)
                    }
                }
)

/**
 * @swagger
 * /api/delete-cart:
 *   delete:
 *     summary: Delete a cart item
 *     tags: [Cart]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the cart item to delete
 *     responses:
 *       200:
 *         description: Successful response with deleted cart data
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */

router.delete("/delete-cart",validate([query("id").isInt()]),
    async(req,res,next)=>{
        try {

            const isDeleted = await cartRepository.deleteCart(req.query.id)
        
            if(!isDeleted) throw new Error("server error")

            createResponse(res, 200, null , Flag.OK);
        } catch (error) {
            console.log(error);
            next(error?.message || error)
        }
}
)

module.exports = router;
