const express = require('express')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json');
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// home
app.get('/', (req, res) => {
    res.render('index', { restaurantList: restaurantList.results })
})
// search
app.get('/search', (req, res) => {
    const keywords = req.query.keyword
    const results = restaurantList.results.filter(item => item.name.toLowerCase().includes(keywords.toLowerCase()))
    let noResult
    results == false ? noResult = '沒有搜尋結果' : noResult = ''
    res.render('index', { restaurantList: results, keywords, noResult})
})
//詳細介紹
app.get('/restaurants/:id', (req, res) => {
    let restaurant
    restaurant = restaurantList.results.find(item => req.params.id === item.id.toString())
    res.render('show', { restaurant })
})
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})