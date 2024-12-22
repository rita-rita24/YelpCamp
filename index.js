import express from 'express';

const app = express();

app.get('/dogs', (req, res) => {
  res.send('わんわん');
});

app.get('/cats', (req, res) => {
  res.send('にゃー');
});

app.get('/', (req, res) => {
  res.send('ホームページにようこそ');
});

app.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send('検索する用語が指定されていません。')
  }
  res.send(`<h1>「${q}」の検索結果</h1>`);
});


app.listen(3000, () =>{
  console.log('サーバー起動！！');
})
