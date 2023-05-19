import { Router } from "express";
import Products from './products.dbclass.js';

const productsRouter = Router();
const manager = new Products();

productsRouter.get('/products_index', async (req, res) => {
    const products = await manager.getProducts();
    res.render('products_index', {
        products: products
    });
});

productsRouter.get('/products', async (req, res) => {
    try {
       

       
        const products = await manager.getProducts(req.query);
        res.status(200).send({ status: 'OK', data: products });
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});



export default productsRouter;