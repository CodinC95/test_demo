const cartResposibility = require("../responsibility/cartResponsibility")
const {messageError} = require("../common/constant")

const getCart = async(req,res,next)=>{
    try {
       const page =   req.query.page || 1
        const userId = req.user.id
        const limit = req.query.limit || 10

        const result  = await cartResposibility.getCart(userId,page,limit)

        if(!result) throw new Error(messageError.server_error)
        
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const addCart = async(req,res,next)=>{
    try {
        const userId = req.user.id
       
        const cartInfo = {...req.body,user_id:userId}
        const result = await cartResposibility.addNewCart(cartInfo)

        if(!result) throw new Error(messageError.server_error)

        res.status(200).json({message:"success"})
    
    } catch (error) {
        next(error)
    }
}

const updateCart = async(req,res,next)=>{
    try {
        
        const cartInfo = {...req.body}
        const result = await cartResposibility.updateCart(cartInfo)

        if(!result) throw new Error(messageError.server_error)

        res.status(200).json({message:"success"})
    
    } catch (error) {
        next(error)
    }
}

const deleteCart = async(req,res,next)=>{
    try {
        
        const cartId = req.body.id
        const result = await cartResposibility.deleteCart(cartId)

        if(!result) throw new Error(messageError.server_error)

        res.status(200).json({message:"success"})
    
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getCart,
    addCart,
    updateCart,
    deleteCart
}