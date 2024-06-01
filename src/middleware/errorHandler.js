// errorHandler.js
const {createResponse} = require("../utils/utils")

const errorHandler =(err, req, res, next) =>{
    const statusCode = err?.statusCode || 500;
    const message = err?.message || err || 'Internal Server Error';
    
  return createResponse(res,statusCode,null,message)
}

module.exports = {errorHandler};
