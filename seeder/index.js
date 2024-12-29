import mongoose from 'mongoose';
import { mongooseConnect } from '../config/mongoose.js';
import { cities } from './cities.js';
import { descriptors, places } from './seedHelpers.js';
import { Campground } from '../models/campGround.js';

mongooseConnect();

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});
