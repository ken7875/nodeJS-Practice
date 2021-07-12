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

// home
app.get('/', (req, res) => {
    return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})

// create
app.get('/restaurants/new', (req, res) => res.render('new'))
app.post('/restaurants/new', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const phone = req.body.phone
    const location = req.body.location
    const image = req.body.image
    const rating = req.body.rating
    const google_map = req.body.google_map
    const description = req.body.description
    return Restaurant.create({
        name,
        name_en,
        category,
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

// read
app.get('/restaurants/:id/detail', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(err => console.log(err))
})

// update
app.get('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
        return res.render('edit', { restaurant })
    })
    .catch(err => console.log(err))
})
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const phone = req.body.phone
    const location = req.body.location
    const image = req.body.image
    const rating = req.body.rating
    const google_map = req.body.google_map
    const description = req.body.description
    return Restaurant.findById(id)
    .then((restaurant) => {
        restaurant.name = name
        restaurant.name_en = name_en
        restaurant.category = category
        restaurant.phone = phone
        restaurant.location = location
        restaurant.image = image
        restaurant.rating = rating
        restaurant.google_map = google_map
        restaurant.description = description
        return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(err => console.log(err))
})

// delete
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// search
app.get('/search', (req, res) => {
    const keywords = req.query.keyword.toLowerCase().trim()
    let noResult = ''
    Restaurant.find()
    .lean()
    .then(restaurants => {
        const result = restaurants.filter(item => 
            item.name.toLowerCase().includes(keywords) || item.category.toLowerCase().includes(keywords)
        )
        result.length === 0 ? noResult = '無搜尋結果' : res.render('index', { restaurants: result, noResult, keywords })
    })
    .catch(err => console.log(err))
})
app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})