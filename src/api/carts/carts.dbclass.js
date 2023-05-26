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
    




    
    updateCart = async (cid,data) => {
            const productId = data[0].product
            const newQty = data[0].qty;
            console.log(productId,newQty)
            
            const process = cartsModel.findOneAndUpdate
            (
            {_id: new mongoose.Types.ObjectId(cid)},
            { $set: {   "products.$[elem].qty":newQty               }},
            {returnNewDocument:true, arrayFilters: [{"elem.product":productId}]}
    )
return process
}

updateProductQty = async (cid,pid,data) => {
    
    
    const newQty = data[0].qty;
    mongoose.set('debug',true)
    const process = cartsModel.findOneAndUpdate
     (
     {_id: new mongoose.Types.ObjectId(cid)},
     { $set: {   "products.$[elem].qty":newQty               }},
     {new:true, arrayFilters: [{"elem.ref":pid}]}
 )
return process
}

getCarts = async () => {
    try {
        const carts = await cartsModel.find().populate('products.product');
        this.status = 1;
        this.statusMsg = 'Productos recuperados';
        return carts;
    } catch (err) {
        this.status = -1;
        this.statusMsg = `getProducts: ${err}`;
    }
}




getProductsFromCart = async (cid) => {
try{
return await cartsModel.findById(cid).populate('products.product')
} catch(err){
    return false
}
}


emptyCart = async (cid)=>{
    try{
        
        const process = cartsModel.findOneAndUpdate
        (
        {_id: new mongoose.Types.ObjectId(cid)},
        { $set: {products:[]}}
        
        )


        this.status = 1
    }catch (err){
        return false
    }
}


    
    //METODOS TERMINADOS Y FUNCIONANDO OK VAN QUEDANDO ACA ABAJO
    deleteCartProduct = async (cid,pid) => {
        try {
            const ObjectId=mongoose.Types.ObjectId;
            const cartId = new mongoose.Types.ObjectId(cid)
            const prodId = new mongoose.Types.ObjectId(pid)
            const toDelete = {ref:pid}
            const process = cartsModel.findByIdAndUpdate(
                { _id: cartId },
                { $pull:{products:{$in:[{product:pid}]}}}
                
           )
            this.status = 1
            return process
        } catch (err) {
            this.status = -1;
            this.statusMsg = `deletedProds: ${err}`;
        }
    }
    


}

export default Carts;