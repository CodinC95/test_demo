
const {Sequelize, DataTypes} = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require("../config/config")[env];

const sequelize = new Sequelize( config);


sequelize.authenticate().then(async() => {
  console.log('Connection has been established successfully.');
 
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const db = {}

db.sequelize = sequelize 
db.Sequelize = Sequelize
db.user = require('../src/module/User/user.model')(sequelize,DataTypes)
db.cart = require("../src/module/Cart/cart.model")(sequelize,DataTypes)
module.exports = db