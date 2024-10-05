const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        orderId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        totalPrice: {
            type: DataTypes.DECIMAL(7, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'confirmed', 'shipped'),
            allowNull: false,
            defaultValue: 'pending',
        },
        products: {
            type: DataTypes.JSON, 
            allowNull: false,
        },
    });

    return Order;
};