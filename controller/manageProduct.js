const {Product} = require('../modals/relation');
const fs = require('fs');
const path = require('path');
const multer  = require('multer')

const UPLOADS_DIR = 'my-uploads';

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_DIR)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname)
    }
  });

exports.upload = multer({ storage: storage });

exports.createproduct = async(req, res) => {
    try {
        const role = req.user?.role;
        console.log("the role is :",role);

        if (role === 'admin'){
            const { name, price, description, quantity,  category } = req.body;
            const imageFile = req.file;

            if (!imageFile) {
                return res.status(400).json({ message: "Image file is required" });
            }
    
            const imageUrl = imageFile.path;
            const product = await Product.create({ name, price, description, quantity, category, imageUrl});
            res.status(201).json(product);
        }
    } catch (error) {
        console.error('the error is: ',error);
        res.status(500).json({ error: "Internal server error" });
        
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const role = req.user?.role;
        console.log("The role is:", role);

        if (role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const productId = req.params.id; 
        const { name, price, description, quantity, category } = req.body;
        const imageFile = req.file;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }


        if (imageFile) {
            if (product.imageUrl) {
                const previousImagePath = path.join(__dirname, '..', product.imageUrl);
                fs.unlink(previousImagePath, (err) => {
                    if (err) {
                        console.error('Error deleting previous image:', err);
                    }
                });
            }
            product.imageUrl = imageFile.path; 
        }


        product.name = name !== undefined ? name : product.name;
        product.price = price !== undefined ? price : product.price;
        product.description = description !== undefined ? description : product.description;
        product.quantity = quantity !== undefined ? quantity : product.quantity;
        product.category = category !== undefined ? category : product.category;

        await product.save();
        res.status(200).json(product);
    } catch (error) {
        console.error('The error is:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const role = req.user?.role;
        console.log("The role is:", role);

        if (role !== 'admin') {
            return res.status(403).json({ message: "Access denied" });
        }

        const productId = req.params.id; 
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

      
        const imagePath = product.imageUrl;
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath); 
        }

        
        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error('The error is:', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

