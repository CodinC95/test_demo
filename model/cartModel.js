const db = require("../utility/database");


const getCartById = async(userId,limit,offset)=>{
    try {
        const data =  await db("cart").
        select("*")
        .where({user_id:userId})
        .limit(limit)
        .offset(offset)

        const total =  await db("cart")
        .count("*")
        .where({ user_id: userId });
       
        return {
            data: data,
            total:total[0]["count(*)"]
        }
    } catch (error) {
        console.log(error);
        return false
    }
};

const addCart = async(cartInfo)=>{
    try {
        return await db.transaction(async(trx)=>{
            return await trx("cart").insert({
                product_name:cartInfo.name,
                price:cartInfo.price,
                user_id:cartInfo.user_id
            })
        })
    } catch (error) {
        console.log(error);
    }
}

const updateCart = async(cartInfo)=>{
    try {
        return await db.transaction(async(trx)=>{
            return await trx("cart")
                        .update({ product_name:cartInfo.name,})
                        .where({id:cartInfo.id})
        })
    } catch (error) {
        console.log(error);
        return false
    }
}

const deleteCart = async(cartId)=>{
    try {
        return await db.transaction(async(trx)=>{
            return await trx("cart")
                        .where({id:cartId})
                        .del()
        })
    } catch (error) {
        console.log(error);
        return false
    }
}

module.exports = {
    getCartById,
    addCart,
    updateCart,
    deleteCart
}

