const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express()
const port = 3000

app.listen(port, () => {
    console.log('App is running on http://localhost:3000')
})