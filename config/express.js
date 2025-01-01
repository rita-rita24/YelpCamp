import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';

const getTimeStamp = (req, res, next) => {
  const timestamp = new Date(Date.now());
  req.requestTime = `${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}-${String(timestamp.getDate()).padStart(2, '0')} ${String(timestamp.getHours()).padStart(2, '0')}:${String(timestamp.getMinutes()).padStart(2, '0')}:${String(timestamp.getSeconds()).padStart(2, '0')}`;
  next();
}

export const app = express();
export const initExpress = () => {
  const PORT = 3000;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(express.static('node_modules/bootstrap/dist/'));
  app.use(methodOverride('_method'));
  app.use(getTimeStamp);
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.engine('ejs', ejsMate);
  app.listen(PORT, () =>{
    console.log(`サーバーを起動しました。ポート番号：${PORT}`);
    console.log(`http://localhost:${PORT}`)
  });
}
export const notFound = () => {
  app.use((req, res) => {
    res.status(404).send('ページが見つかりません');
  });
}
