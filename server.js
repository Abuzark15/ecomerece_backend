const express = require('express');
const sequelize = require('./db-config/dbconfig');

const userroutes = require('./routes/userRoutes');
const productroutes = require('./routes/productsRoutes');
const cartroutes = require('./routes/cartRoutes');
const orderroutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());


app.use('/api/user', userroutes);
app.use('/api/product', productroutes);
app.use('/api/cart', cartroutes);
app.use('/api/order', orderroutes);


app.listen(3030, ()=>{
    console.log("server is up and runing");
    
});