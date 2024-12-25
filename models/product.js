import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    enum: ['果物', '野菜', 'お菓子']
  }
});

export const Product = mongoose.model('Product', productSchema);
