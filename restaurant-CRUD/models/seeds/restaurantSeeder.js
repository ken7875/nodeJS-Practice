const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const restaurantRes = require('../../restaurant.json');
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 將連結賦予到這個變數

db.once('open', () => {
    console.log('mongodb connect')
    restaurantRes.results.forEach(restaurant => {
        Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            image: restaurant.image,
            category: restaurant.category,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description
        })
    })
    console.log('done')
});

db.on('error', () => {
    console.log('mongodb error!')
})