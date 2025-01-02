import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default {
  entry: [ // 対象ファイル
    './public/js/common.js',
    './public/js/validation.js',
  ],
  output: {
    filename: 'bundle.js', // 出力されるファイル名
    path: path.resolve(__dirname, 'public/dist'), // 出力先ディレクト
    // リ
    // environment: {
    //   arrowFunction: false, // アロー関数を禁止（ES5互換）
    //   const: false, // `const`を禁止（ES5互換）
    //   destructuring: false, // 分割代入を禁止
    // },
  },
  mode: 'development', // 開発モード
};
