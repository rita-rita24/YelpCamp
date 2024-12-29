import mongoose from 'mongoose';

export const mongooseConnect = () => {
  mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('DB接続:OK');
  })
  .catch((err) => {
    console.log('DB接続:NG');
    console.log(err);
  });
}
