const app = require("./app")
const db = require("./model/database")

const PORT = process.env.PORT || 3001

db.sequelize.sync().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`app is running on ${PORT}`)
    })
})