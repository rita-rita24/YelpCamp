import mongoose from 'mongoose';
import Joi from 'joi';
const Schema = mongoose.Schema;

export const Campground = mongoose.model('Campground', new Schema({
  title: String,
  price: String,
  description: String,
  location: String
}));


export const campgroundSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required().min(0),
  image: Joi.string().required(),
  location: Joi.string().required(),
  description: Joi.string().required()
});
