import mongoose from 'mongoose';
import { Product } from './models/product.js';

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('DB接続:OK');
  })
  .catch((err) => {
    console.log('DB接続:NG');
    console.log(err);
  });

const productSeedsData = [
  {
    name: 'りんご',
    price: 120,
    category: '果物'
  },
  {
    name: 'みかん',
    price: 80,
    category: '果物'
  },
  {
    name: 'バナナ',
    price: 150,
    category: '果物'
  },
  {
    name: 'にんじん',
    price: 100,
    category: '野菜'
  },
  {
    name: 'キャベツ',
    price: 200,
    category: '野菜'
  },
  {
    name: 'トマト',
    price: 120,
    category: '野菜'
  },
  {
    name: 'ポテトチップス',
    price: 150,
    category: 'お菓子'
  },
  {
    name: 'チョコレート',
    price: 100,
    category: 'お菓子'
  },
  {
    name: 'ビスケット',
    price: 120,
    category: 'お菓子'
  },
  {
    name: 'きゅうり',
    price: 90,
    category: '野菜'
  }
];

Product.insertMany(productSeedsData).
  then(() => {
    console.log('シーダー:OK');
  })
  .catch((err) => {
    console.log('シーダー:NG');
  })
