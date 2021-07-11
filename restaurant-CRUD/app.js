const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true , useUnifiedTopology: true })
const app = express()
const port = 3000
const db = mongoose.connection
// mongodb連線
db.once('open', () => {
    console.log('mongodb connect')
})
db.on('error', () => {
    console.log('connect error!')
})

app.get('/', (req, res) => {
    res.send('hello wrold')
})
app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})