const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const utility = require("../utility/utility")

let refreshTokens = [];

const signUp = async (userInfo)=>{
    try {
        const isExistUser = await userModel.getUser(userInfo.email)
        if(isExistUser[0]) {
            throw new Error("user is Exist")
        }
        const saltRounds = 10

        const hashPassword = await bcrypt.hash(userInfo.password,saltRounds)
        userInfo.password=hashPassword

        const result =  await userModel.addUser(userInfo)
        if(!result[0]) {
            return false
        }
        return  true
    } catch (error) {
        return false
    }
}

const signIn = async(userInfo)=>{
    try {
        const isExistUser = await userModel.getUser(userInfo.email)
        if(!isExistUser[0]) {
            throw new Error("User is not exist")
        }

        const isMatch = await bcrypt.compare(userInfo.password,isExistUser[0].password)
        if(!isMatch) {
            return false
        }
        const accessToken = utility.generateAccessToken({id:isExistUser[0].id} );
        const refreshToken = utility.generateRefreshToken({id: isExistUser[0].id});
        refreshTokens.push(refreshToken);
       return {accessToken,refreshToken}
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    signUp,
    signIn
}