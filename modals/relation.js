const sequelize = require('../db-config/dbconfig');

const User = require('./userModals')(sequelize);
const Product = require('./productModal')(sequelize);
const Cart = require('./cartModal')(sequelize);
const Order = require('./orderModal')(sequelize);


User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync().then(() => {
    console.log("Database & tables created!");
});

module.exports = { User,Product,Cart,Order,sequelize };