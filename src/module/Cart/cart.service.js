const db = require("../../../model/database")
const CartModel = db.cart// Assuming you have a Cart model defined

// Function to fetch paginated cart items by userId
async function getCartItems(userId, pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    const { count, rows } = await CartModel.findAndCountAll({
        where: { user_id:userId }, // Filter by userId
        offset,
        limit,
    });

    return {
        totalItems: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: pageNumber,
        cartItems: rows,
    };
}

const createNewCart =async (cartInfo)=>{
    const result = await CartModel.create(cartInfo)
    return result
}

const updateCart = async(cartInfo)=>{
  return  await CartModel.update(
        cartInfo,
        {
          where: {
            id: cartInfo.id,
          },
        },
      );
}

const findOneById =  async(cartId)=>{
    return await CartModel.findOne({ where: { id: cartId } })
}


const deleteCart = async(cartId)=>{
    return await CartModel.destroy({
        where: {
          id: cartId,
        },
      });
}

module.exports = {
  getCartItems,
  createNewCart,
  updateCart,
  deleteCart,
  findOneById
};
