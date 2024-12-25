import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Product } from './models/product.js';
import methodOverride from 'method-override';

mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('DB接続:OK');
  })
  .catch((err) => {
    console.log('DB接続:NG');
    console.log(err);
  });


const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const categories = ['果物', '野菜', 'お菓子'];

// 一覧
app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products/index', { products })
});

// 新規作成
app.get('/products/create', async (req, res) => {
  res.render('products/create');
});

// 詳細
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/show', { product });
});

// 登録
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect('/products');
});

// 編集
app.get('/products/edit/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories });
});

// 更新
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  product.save();
  res.redirect('/products');
});

// 削除
app.delete('/products/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

app.listen(PORT, () =>{
  console.log(`サーバーを起動しました。ポート番号：${PORT}`);
  console.log(`http://localhost:${PORT}`)
});
