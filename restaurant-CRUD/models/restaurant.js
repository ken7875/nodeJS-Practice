const mongoose = require('mongoose');
const schema = mongoose.Schema
const restaurantSchema = new schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    name_en: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    phone: {
        type: String
    },
    google_map: {
        type: String
    },
    rating: {
        type: Number
    },
    description:{
        type: String
    }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)