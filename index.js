import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', { title: 'タイトルを表示' })
});

app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send('検索する用語が指定されていません。')
  }
  res.send(`<h1>「${q}」の検索結果</h1>`);
});


app.listen(PORT, () =>{
  console.log(`サーバーを起動しました。ポート番号：${PORT}`);
})
