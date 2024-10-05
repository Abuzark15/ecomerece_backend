const { Order, Cart, Product } = require('../modals/relation'); 

exports.placeOrder = async(req, res) =>{
    const userId = req.user.id;
    console.log("the userid is :" ,userId);
    
    try {
        const cartItems = await Cart.findAll({ where: { userId } });
        if (!cartItems.length) {
            return res.status(404).json({ error: 'Cart is empty' });
        }   

        const products = [];
        let totalPrice = 0;

        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                products.push({
                    productId: item.productId,
                    name: product.name,
                    price: product.price,
                    quantity: item.quantity,
                });
                totalPrice += product.price * item.quantity; 
            }
        }
        const order = await Order.create({ 
            userId, 
            products,
            totalPrice 
        });

        await Cart.destroy({ where: { userId } });

        res.status(201).json(order);
    } catch (error) {
        console.error("the error is : ", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.viewsorderbyid = async(req, res) =>{
    const {id }= req.params;
    const userId = req.user.id;
    try {
        const order = await Order.findOne({ where: { orderId: id, userId } });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error("the error is : " , error);
        res.status(500).json({error : "Internal Server errror"});
        
    }
};

exports.viewallorder = async(req, res) => {
    try {
        const role = req.user?.role;
        console.log("the role is :",role);

        if (role === 'admin'){
            const orders = await Order.findAll();
            res.status(200).json(orders);
        }
    } catch (error) {
        console.error("the error is : ",error);
        res.status(500).json({error : "Internal server error"});
        
    }
} ;