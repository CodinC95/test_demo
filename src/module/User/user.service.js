const db = require("../../../model/database")
const UserModel = db.user

const createUser = async(userInfo)=>{
    const result = await UserModel.create(userInfo)
    return result
}

const findUserByEmail = async(email)=>{
    const userInfo = await UserModel.findOne({
        where: { email: email }
    })
    return userInfo?.dataValues
}

module.exports = {createUser,findUserByEmail}