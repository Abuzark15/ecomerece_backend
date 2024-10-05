const { Cart } = require('../modals/relation');
const { Product } = require('../modals/relation');

exports.addItemToCart = async(req, res) =>{
    const { productId, quantity } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const existingCartItem = await Cart.findOne({ where: { userId, productId } });
        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        }
        const cartItem = await Cart.create({ userId, productId, quantity });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error("the  error is : ", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
};

exports.viewcart = async(req, res) =>{
    const userId = req.user.id;
    try {
        const cartItems = await Cart.findAll({ where: { userId }, include: Product });
        
        const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * item.Product.price), 0);
        
        res.status(200).json({ cartItems, totalPrice });
    } catch (error) {
        console.error("the error is : ", error);
        res.status(500).json({ error: "Internal server error " });
        
    }
};

exports.updateitemquantity = async(req, res) => {
    const { productId } = req.params; 
    const { quantity } = req.body; 
    try {
        const cartItem = await Cart.findOne({ 
            where: { 
                productId, 
                userId: req.user.id 
            }
        });
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        console.error("the error is : ", error);
        res.status(500).json({error : "Internal server error"});
        
    }
};

exports.removeitem= async(req, res) =>{
    const { productId } = req.params; 
    const userId = req.user.id; 
    try {
        const deletedCount = await Cart.destroy({ 
            where: { 
                productId, 
                userId 
            } 
        });

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: `Cart item with productId:${productId} removed ` });
    } catch (error) {
        console.error("the error is : ",error);
        res.status(500).json({error : "internal server error"});
        
    }
}