import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema(
  {
    item_name: { type: String, required: true },
    item_part_number: { type: String, required: true },
    max_retail_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discount: { type: Number, required: true },
    tax: {
      cgst: { type: Number, required: true },
      sgst: { type: Number, required: true },
    },
    final_price: { type: Number, required: true },
  },
  { _id: false }
);

const BillingSchema = new Schema({
  customer_name: { type: String, required: true },
  phone_number: { type: Number, required: true },
  order_date: { type: Date, required: true },
  products: [ProductSchema],
  order_total: { type: Number, required: true },
});

const Billing = mongoose.model('billing', BillingSchema);

export default Billing;
