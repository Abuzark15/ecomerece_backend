const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true,  
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,  
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user', 
        }
    });

    return User;
};
