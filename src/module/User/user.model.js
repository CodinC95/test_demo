

module.exports= (sequelize,DataTypes)=>{
  const User = sequelize.define(
    'User',
    {
      
      email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
          isEmail: {
            msg: 'Invalid email format',
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE(),
      },
      updatedAt: {
        type: DataTypes.DATE(), 
        
      },
      
    },
    {
      timestamps:true,
      tableName: 'user'
    }
    
  );

  return User
}

