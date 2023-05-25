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


    

  /*
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
    */
    

    emptyCart = async (cid)=>{
        try{
            const process = cartsModel.updateOne(
                { _id: cid },
                { $pullAll:{products:[]}}
           )
            this.
            this.status = 1
        }catch (err){
            return false
        }
    }



    
    updateCart = async (cid,data) => {
        try {
            const process = cartsModel.updateMany(
                {},
                {$set:{'qty.$[elem].qty':100}},
                {arrayFilters:[{"elem.product":{$match:'0290012410000003943611'}}]}

            )
        
        } catch (err) {
            console.log("Se ejecuto 3")
            this.status = -1;
            this.statusMsg = `deletedProds: ${err}`;
        }
    }
    


    
    //METODOS TERMINADOS Y FUNCIONANDO OK VAN QUEDANDO ACA ABAJO
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
            this.statusMsg = `deletedProds: ${err}`;
        }
    }



getProductsFromCart = async (cid) => {
    try{
    return await cartsModel.findById(cid).populate('products.product')
    } catch(err){
        return false
    }
}





}

export default Carts;