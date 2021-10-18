import mongoose, { Schema } from 'mongoose';

const itemStockSchema = new Schema({
  item_name: { type: String, required: true },
  item_part_number: { type: String, unique: true, required: true },
  max_retail_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  rack: { type: String, required: true },
});

const ItemStock = mongoose.model('item_stock', itemStockSchema);

export default ItemStock;
