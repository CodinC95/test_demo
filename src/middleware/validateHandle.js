const {createResponse} = require("../utils/utils")


module.exports.validate = validations => {
  return async (req, res, next) => {
    
    for (const validation of validations) {
     
      const result = await validation.run(req);
      if (!result.isEmpty()) {

        return  createResponse(res,400,null, result.array()[0] )
      }
    }

    next();
  };
};




