import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

export const app = express();
export const initExpress = () => {
  const PORT = 3000;
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static('public'));
  app.use(methodOverride('_method'));
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.listen(PORT, () =>{
    console.log(`サーバーを起動しました。ポート番号：${PORT}`);
    console.log(`http://localhost:${PORT}/campgrounds`)
  });
}
