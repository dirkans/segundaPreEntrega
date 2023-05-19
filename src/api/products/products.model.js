import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'products';

const schema = new mongoose.Schema({
    internalCode: String,
    description: { type: String, required: true },
    price: Number,
    stock: Number
});

schema.plugin(mongoosePaginate);



const productModel = mongoose.model(collection, schema);

export default productModel;