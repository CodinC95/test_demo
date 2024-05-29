const userResponsibilty = require("../responsibility/userResponsibility")
const {messageError} = require("../common/constant")

var validator = require('validator')


const signUp = async(req,res,next) =>{
    try { 
       
        
        const userInfo = req.body

        const {email, password} = req.body

        if (!validator.isEmail(email)) throw new Error (messageError.error_email)
        
        if(!validator.isLength(password, {min:0,max:10})) throw new Error (messageError.error_password)

        const result = await userResponsibilty.signUp(userInfo) 

        if(!result)  throw new Error(messageError.user_exist)

        res.send("SignIn success")

    } catch (error) {
        next(error.message)
    }
}

const signIn = async(req,res,next)=>{
    try {
        const userInfo = req.body

        const {email, password} = req.body

        if (!validator.isEmail(email)) throw new Error (messageError.error_email)
        
        if(!validator.isLength(password, {min:0,max:10})) throw new Error (messageError.error_password)

        const isResultLogin = await userResponsibilty.signIn(userInfo)

        if (!isResultLogin) throw new Error (messageError.login_error)

        res.json({ accessToken:isResultLogin.accessToken, refreshToken:isResultLogin.refreshToken });
  
    } catch (error) {
        next(error.message)
    }
}

module.exports= {
    signUp,
    signIn
}