const db = require("../utility/database");

const getUser = async (email)=>{
    try {
        return await db.select("*").from("user").where({email:email})
    } catch (error) {
        return false
    }
}

const addUser = async(userInfo)=>{
    try {
      return  await db.transaction(async(trx)=>{
        return await trx("user").insert({
            email:userInfo.email,
            password:userInfo.password
        })
      })
    
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    getUser,
    addUser
}