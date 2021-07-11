const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');
const bodyParser = require('body-parser')

const app = express()
const port = 3000
const db = mongoose.connection

app.use(bodyParser.urlencoded({extended: true}))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true , useUnifiedTopology: true })
// mongodb連線
db.once('open', () => {
    console.log('mongodb connect')
})
db.on('error', () => {
    console.log('connect error!')
})

app.get('/', (req, res) => {
    return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
app.get('/restaurants/new', (req, res) => res.render('new'))
app.post('/restaurants/new', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const catrgory = req.body.catrgory
    const phone = req.body.phone
    const location = req.body.location
    const image = req.body.image
    const rating = req.body.rating
    const google_map = req.body.google_map
    const description = req.body.description
    return Restaurant.create({
        name,
        name_en,
        catrgory,
        phone,
        location,
        image,
        rating,
        google_map,
        description
     })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err)) 
})
app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})