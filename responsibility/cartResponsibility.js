const cartModel = require("../model/cartModel")

const getCart = async(userId,page,limit)=>{
   try {
    
    const offset = (page - 1) * limit || 0; 
    const result = await cartModel.getCartById(userId,limit,offset)

    if(!result) return false
        return {
            page:page,
            total_pages: Math.ceil(result.total / limit),
            total_items: result.total,
            cart_data: result.data,
        }
   } catch (error) {
    console.log(error);
    return false
   }
}

const addNewCart = async(cartInfo)=>{
    try {
      return  await cartModel.addCart(cartInfo)
    } catch (error) {
        console.log(error);
        return false 
    }
}

const updateCart = async(cartInfo)=>{
    try {
      return  await cartModel.updateCart(cartInfo)
    } catch (error) {
        console.log(error);
        return false 
    }
}

const deleteCart = async(cartId)=>{
    try {
      return  await cartModel.deleteCart(cartId)
    } catch (error) {
        console.log(error);
        return false 
    }
}

module.exports= {
    getCart,
    addNewCart,
    updateCart,
    deleteCart
}