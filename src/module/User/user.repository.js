const bycryt = require("bcrypt")

const userService = require("./user.service")
const {generateAccessToken,generateRefreshToken} = require("../../utils/utils")

const creatUser = async(userInfo)=>{
    const isExistUser = await userService.findUserByEmail(userInfo.email)

    if (isExistUser) return false

    const hashPassword = await bycryt.hash(userInfo.password,10)
    userInfo.password = hashPassword

    return await userService.createUser(userInfo)
}

const signIn = async(loginInfor)=>{
    const userInfor = await userService.findUserByEmail(loginInfor.email)
    if (!userInfor) return false
   
    const comparePassword = await bycryt.compare(loginInfor.password,userInfor.password)
    if(!comparePassword) return false

    delete userInfor.password
    const accessToken = generateAccessToken(userInfor)
    const refeshToken = generateRefreshToken(userInfor)
    return {accessToken,refeshToken}
}

module.exports = {
    creatUser,
    signIn
}