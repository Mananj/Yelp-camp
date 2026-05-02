const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp').then(() => {
    console.log('MONGO CONNECTION OPEN');
}).catch(err => {
    console.log('OH NO MONGO CONNECTION ERROR');
    console.log(err);
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '69f230748e79748f32ea88cc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, eaque.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dwmmo0mzr/image/upload/v1777568317/YelpCamp/oo4kj9jaygtoyr8ghhkg.jpg',
                    filename: 'YelpCamp/oo4kj9jaygtoyr8ghhkg'
                },
                {
                    url: 'https://res.cloudinary.com/dwmmo0mzr/image/upload/v1777550832/YelpCamp/pkqi96km44o32m3noeiq.jpg',
                    filename: 'YelpCamp/pkqi96km44o32m3noeiq'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})