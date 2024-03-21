import { Schema, models, model } from "mongoose";


const productSchema = new Schema({
    tile: String,
    image: String,
});


const Product = models.Product || model('Product', productSchema);

export default Product;