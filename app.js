const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const authenticateToken = require("./src/middleware/authenticateHandle")
const {errorHandler} = require('./src/middleware/errorHandler');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express")

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TestDemo',
            version: '1.0.0',
            description: 'This is a test demo application.',
        },
        servers:[
            {url:"http://localhost:3000/"}
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Token',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis:["./src/module/Cart/cart.controller.js","./src/module/User/user.controller.js"]
};

const swaggerSpec = swaggerJsdoc(options);

const app = express()
app.use(cors())

const userRouter = require("./src/module/User/user.controller")
const cartRouter = require("./src/module/Cart/cart.controller")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/auth",userRouter)
app.use("/api",authenticateToken,cartRouter)

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

app.use(errorHandler)

module.exports = app