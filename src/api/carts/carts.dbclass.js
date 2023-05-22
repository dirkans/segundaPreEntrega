import mongoose from 'mongoose';
import cartsModel from './carts.model.js';
import productModel from '../products/products.model.js';


class Carts {
    constructor() {
        this.status = 0;
        this.statusMsg = "inicializado";
    }

    static requiredFields = ['description', 'price', 'stock'];

    static #verifyRequiredFields = (obj) => {
        return Products.requiredFields.every(field => Object.prototype.hasOwnProperty.call(obj, field) && obj[field] !== null);
    }

    static #objEmpty (obj) {
        return Object.keys(obj).length === 0;
    }

    checkStatus = () => {
        return this.status;
    }

    showStatusMsg = () => {
        return this.statusMsg;
    }

    addProduct = async (product) => {
        try {
            if (!Products.#objEmpty(product) && Products.#verifyRequiredFields(product)) {
                await productModel.create(product);
                this.status = 1;
                this.statusMsg = "Producto registrado en bbdd";
            } else {
                this.status = -1;
                this.statusMsg = `Faltan campos obligatorios (${Products.requiredFields.join(', ')})`;
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `AddProduct: ${err}`;
        }
    }

    getCarts = async () => {
        try {
            const carts = await cartsModel.find();
            this.status = 1;
            this.statusMsg = 'Productos recuperados';
            return carts;
        } catch (err) {
            this.status = -1;
            this.statusMsg = `getProducts: ${err}`;
        }
    }

    getProductById = async (id) => {
        try {
            const product = productModel.findById(id);
            this.status = 1;
            return product;
            } catch (err) {
            this.status = -1;
            this.statusMsg = `getProductById: ${err}`;
        }
    }

    updateProduct = async (id, data) => {
        try {
            if (data === undefined || Object.keys(data).length === 0) {
                this.status = -1;
                this.statusMsg = "Se requiere body con data";
            } else {
                // Con mongoose.Types.ObjectId realizamos el casting para que el motor reciba el id en el formato correcto
                const process = await productModel.updateOne({ '_id': new mongoose.Types.ObjectId(id) }, data);
                this.status = 1;
                process.modifiedCount === 0 ? this.statusMsg = "El ID no existe o no hay cambios por realizar": this.statusMsg = "Producto actualizado";
            }
        } catch (err) {
            this.status = -1;
            this.statusMsg = `updateProduct: ${err}`;
        }
    }

    deleteCartProduct = async (cid,pid) => {
        try {
            const ObjectId=mongoose.Types.ObjectId;
            //if(cartsModel.exists({_id:cid})) {
            const toDelete = {product:pid}
            const process = cartsModel.findByIdAndUpdate(
                { _id: cid },
                { $pull:{products:{$in:[toDelete]}}}
           )
            this.status = 1
            return process
        } catch (err) {
            this.status = -1;
            this.statusMsg = `emptyCart: ${err}`;
        }
    }
}

export default Carts;