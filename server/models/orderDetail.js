const { DataTypes } = require("sequelize");
const {sequelize} = require("../util/database");

module.exports= {
    OrderDetail :sequelize.define('orderDetail',{
        id:{
            type :  DataTypes.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER,
        subtotal: DataTypes.DECIMAL(10, 2)
    }

    )
}