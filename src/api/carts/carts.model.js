import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import productModel from '../products/products.model.js';

const collection = 'carts';

const schema = new mongoose.Schema({
    products: {
        type:[
            {product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },qty:Number
        }
        ],
        default:[]
    }
    
});

schema.plugin(mongoosePaginate);

schema.pre('find',function(){
    this.populate('products.product')
})

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;