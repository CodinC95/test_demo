const cartService = require("./cart.service")

const getAllCart = async(userId,page=1,size=10)=>{

    const data = await cartService.getCartItems(userId,page,size)
    return data
}

const createCart = async(cartInfo)=>{
    return await cartService.createNewCart(cartInfo)
}

const updateCart = async(cartInfo)=>{
    const isExist = await cartService.findOneById(cartInfo.id)

    if(!isExist) throw new Error("Cart is not exist!")

    return cartService.updateCart(cartInfo)
}

const deleteCart = async(cartId)=>{
    const isExist = await cartService.findOneById(cartId)

    if(!isExist) throw new Error("Cart is not exist!")
    
    return  await cartService.deleteCart(cartId)
}
 
module.exports = {
    getAllCart,
    createCart,
    updateCart,
    deleteCart
}
