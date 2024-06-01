
const jwt = require("jsonwebtoken")
require('dotenv').config()
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRATION = '15d';
const REFRESH_TOKEN_EXPIRATION = '7d';

const generateAccessToken =(userInfo)=> {
    return jwt.sign(userInfo, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRATION });
  }
  
const generateRefreshToken =(userInfo) => {
    return jwt.sign(userInfo, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
}

const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
}

const createResponse = async(res,statusCode,data,message =null) =>{

  return res.status(statusCode).json({
    status:statusCode,
    data:data,
    message:message
  })

}







module.exports= {
    generateAccessToken,
    generateRefreshToken,
    authenticateToken,
    createResponse
}