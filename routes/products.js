const express = require('express');
const router = express.Router();
const z = require('zod');
const { v4: uuidv4 } = require('uuid');

router.use(express.json());

const productSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
    description: z.string().min(10, { message: "Description must be at least 10 characters long" }),
    price: z.number().positive({ message: "Price must be a positive number" }),
});

const formatZodErrors = (error) => {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }));
};

const products = [
    {
        id: "absc-124-acgh",
        name: "iphone 16", 
        description: "256gb aluminium with airpods",
        price: 1200
    }
]

router.get('/', (req, res) => {
    res.send(products);
});

router.post('/', (req, res) => {
    const validation = productSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({ error: formatZodErrors(validation.error) });
    }

     const newProduct = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    }
    products.push(newProduct);

    res.status(201).send({ message: "Product created!", product: newProduct });
});

router.put('/:id', (req, res) => {
   const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).send({ error: "Product not found" });
    }

    const validation = productSchema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({ error: formatZodErrors(validation.error) });
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;

    res.send({ message: "Product updated!", product });
});

router.delete('/:id', (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
        return res.status(404).send({ error: "Product not found" });
    }

    const index = products.indexOf(product);
    products.splice(index, 1);

    res.send({ data: "Product deleted!", product });
});

router.get('/filter/by-price', (req, res) => {
    // console.log(req.url, req.method, req.headers)
    const minPrice = parseFloat(req.query.min);
    const maxPrice = parseFloat(req.query.max);
    
    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice < 0 || maxPrice < 0) {
        return res.status(400).json({ error: "Invalid min or max price. Prices must be positive numbers." });
    }
    const fileredProducts = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (fileredProducts.length === 0) {
        return res.status(404).json({ message: "No products found in this price range." });
    }

    res.json({ message: `Products filtered with min price ${minPrice} and max price ${maxPrice}`, products: fileredProducts });
})

module.exports = router; 