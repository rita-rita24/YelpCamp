import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String
});

export const Campground = mongoose.model('Campground', campgroundSchema);
