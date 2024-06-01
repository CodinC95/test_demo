const {Sequelize, DataTypes} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require("../../../config/config")[env];

const sequelize = new Sequelize( config);

const User = require("../User/user.model")(sequelize, DataTypes); // Import the user model

module.exports= (sequelize,DataTypes)=>{
  const Cart = sequelize.define(
    'Cart',
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User', // Name of the referenced model
          key: 'id', // Name of the referenced column
        },
      },
      country: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE(),
      },
      updatedAt: {
        type: DataTypes.DATE(),
      },
    },
    { timestamps: true }
  );
  Cart.belongsTo(User, { foreignKey: 'user_id' }); 
  
  return Cart
}

