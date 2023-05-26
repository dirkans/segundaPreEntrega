import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import productModel from '../products/products.model.js';

const collection = 'carts';

const schema = new mongoose.Schema({

    products: [

        {
            product:{type: mongoose.Schema.Types.ObjectId,ref:'products'},
            qty:Number
        }
    ]
    
});




schema.plugin(mongoosePaginate);

schema.pre('find',function(){
    this.populate('products.product')
})

const cartsPopulateModel = mongoose.model(collection, schema);

export default cartsPopulateModel;