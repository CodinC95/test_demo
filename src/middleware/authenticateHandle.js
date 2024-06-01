const jwt = require("jsonwebtoken")
const {createResponse} = require("../utils/utils")
const authenticateToken =(req, res, next) =>{
    const authHeader = req.headers['authorization'];
  
    const token = authHeader && authHeader.split(' ')[2];

    if (!token) {
      return createResponse(res,401,null,"token is vaild")
    }
  
    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return createResponse(res,401,null,err.message)
      }

      req.user = user;
      next();
    });
}


module.exports = authenticateToken