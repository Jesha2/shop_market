const { DataTypes } = require("sequelize");
const {sequelize} = require("../util/database");

module.exports= {
    Order :sequelize.define('order',{
        id:{
            type :  DataTypes.INTEGER,
            autoIncrement : true,
            allowNull:false,
            primaryKey: true
        },
        orderDate: DataTypes.DATE,
        status: DataTypes.STRING
    }

    )
}
//module.exports = Order;