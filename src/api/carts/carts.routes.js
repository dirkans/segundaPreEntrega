import { Router } from "express";
import Carts from './carts.dbclass.js';

const cartsRouter = Router();
const manager = new Carts();

/*
cartsRouter.get('/products_index', async (req, res) => {
    const products = await manager.getCarts();
    res.render('products_index', {
        products: carts
    });
});
*/

cartsRouter.get('/carts', async (req, res) => {
    try {
        const carts = await manager.getCarts();
        res.status(200).send({ status: 'OK', data: carts });
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});




/*
cartsRouter.post('/carts', async (req, res) => {
    try {
        await manager.addProduct(req.body);

        if (manager.checkStatus() === 1) {
            res.status(200).send({ status: 'OK', msg: manager.showStatusMsg() });
        } else {
            res.status(400).send({ status: 'ERR', error: manager.showStatusMsg() });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});
*/

cartsRouter.put('/carts/:id', async (req, res) => {
    try {
        await manager.updateProduct(req.params.id, req.body);
    
        if (manager.checkStatus() === 1) {
            res.status(200).send({ status: 'OK', msg: manager.showStatusMsg() });
        } else {
            res.status(400).send({ status: 'ERR', error: manager.showStatusMsg() });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});

cartsRouter.delete('/carts/:cid', async(req, res) => {
    try {
        await manager.emptyCart(req.params.cid);
    
        if (manager.checkStatus() === 1) {
            res.status(200).send({ status: 'OK', msg: 'Carrito Vaciado' });
        } else {
            res.status(400).send({ status: 'ERR', error: 'No se pudo vaciar el carrito. Compruebe que el CID sea correcto' });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});

cartsRouter.delete('/carts/:cid/:pid', async(req, res) => {
    try {
        const deleteProd = await manager.deleteCartProduct(req.params.cid,req.params.pid);
        if (manager.checkStatus() === 1) {
            res.status(200).send({ status: 'OK', msg: 'Producto borrado del carrito' });
        } else {
            res.status(400).send({ status: 'ERR', error: 'No se pudo encontrar el producto en el carrito. Compruebe que el CID y el PID sean correcto' });
        }
    } catch (err) {
        res.status(500).send({ status: 'ERR', error: err });
    }
});

export default cartsRouter;