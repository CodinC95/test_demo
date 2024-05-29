const express = require("express")
const bodyParser = require('body-parser')
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
require('dotenv').config()
const app = express()

const authRouter = require("./router/user_router")
const cartRouter = require("./router/cart")

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(errorHandler)

app.use("/auth",authRouter)
app.use("/api",cartRouter)


const PORT = process.env.PORT || 3001

app.listen(PORT , ()=>{
    console.log(`app is running on ${PORT}`)
})