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

cartsRouter.get('/carts/:cid',async (req,res)=>{
    try{
        const carts = await manager.getProductsFromCart(req.params.cid);
        res.status(200).send(carts)
    } catch (err){
        res.status(500).send({status:'err'})
    }

})



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



cartsRouter.put('/carts/:cid', async(req,res)=>{
    try{
        const updateCart = await manager.updateCart(req.params.cid,req.body)
        res.status(200).send(updateCart)


    } catch (err){
        res.status(500).send({status:'ERR',error:err})
    }
})


cartsRouter.put('/carts/:cid/products/:pid', async(req,res)=>{
    try{
        const updateProductQty = await manager.updateProductQty(req.params.cid,req.params.pid,req.body)
        res.status(200).send(updateProductQty)


    } catch (err){
        res.status(500).send({status:'ERR',error:err})
    }
})






////// RUTAS FUNCIONALES VAN QUEDANDO ACA ABAJO

cartsRouter.delete('/carts/:cid/products/:pid', async(req, res) => {
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